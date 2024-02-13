import { useEffect, useState } from "react";
import DataTable from "../../Components/Common/DataTable/Index";
import { getFB } from "../../Components/Global/functions/firebase";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { SearchIcon } from "../../Components/icons/SearchIcon";

export const NestsDataTable = () => {
  const [nestsdb, setNestsdb] = useState({ loading: false, nests: [] });
  const [filtered, setfiltered] = useState([]);
  const [hullFilter, setHullFilter] = useState("");
  const [viewPdfstatus, setViewPdfstatus] = useState(true);
  const [selected, setSelected] = useState([]);

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "Nest Name", uid: "nestName", sortable: true },
    { name: "Hull", uid: "hull", sortable: true },
    { name: "PO", uid: "po", sortable: true },
    { name: "Added On", uid: "addedon", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Stock", uid: "stock", sortable: true },
    { name: "Material", uid: "material", sortable: true },
    { name: "Cut By", uid: "cutBy", sortable: true },
    { name: "Serial Number", uid: "serialNumber", sortable: true },
    { name: "Heat Number", uid: "heatNumber", sortable: true },
    { name: "Added By", uid: "addedBy", sortable: true },
    { name: "Plate Size", uid: "plateSize", sortable: true },
    { name: "Path", uid: "path", sortable: true },
    { name: "Ship To", uid: "shipTo", sortable: true },
  ];

  const initialColumns = [
    "nestName",
    "hull",
    "po",
    "uid",
    "addedon",
    "status",
    "stock",
    "Serial Number",
  ];

  function handleSelection(value) {
    setSelected(value);
  }

  function handlePartSearch(part) {
    const partLowercased = part.toLowerCase(); // Convert the search term to lowercase outside the loop for efficiency
    const filteredNests = nestsdb.nests.filter(
      (value) =>
        Array.isArray(value.parts) && // Check if partsList exists and is an array
        value.parts.some(
          (subvalue) => subvalue.name.toLowerCase().includes(partLowercased) // Ensure case-insensitive comparison
        )
    );
    if (part !== "") {
      setfiltered(filteredNests);
    } else {
      setfiltered([]);
    }
  }

  function handleHullSearch(hull) {
    setHullFilter(hull);
    if (filtered.length > 0) {
      const filtered = filtered.filter((value) => value.hull === hull);
      setfiltered(filtered);
    } else {
      const filtered = nestsdb.nests.filter((value) => value.hull === hull);
      setfiltered(filtered);
    }
  }

  function createArrayOfNestPath() {
    var arrayNestPath = [];
    for (let i = 0; i < selected.length; i++) {
      const filtered = nestsdb.nests.filter(
        (value) => value.uid === selected[i]
      );
      arrayNestPath.push(filtered[0].path + "/" + filtered[0].nestName);
    }
    handleViewPdfClick(arrayNestPath);
  }

  const handleViewPdfClick = async (pdfPath) => {
    const response = await fetch("http://10.102.30.12:8080/merge-pdfs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paths: pdfPath }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const mergedPdfUrl = URL.createObjectURL(blob);
      window.open(mergedPdfUrl, "_blank");
    } else {
      console.error("Failed to merge PDFs");
    }
  };

  useEffect(() => {
    setNestsdb({ ...nestsdb, loading: true });
    const fetchData = async () => {
      const nests = await getFB("/nests");

      if (Array.isArray(nests)) {
        // Sort the nests array by the 'addedon' date in ascending order
        const sortedNests = nests.sort((a, b) => {
          const dateA = new Date(a.addedon);
          const dateB = new Date(b.addedon);
          return dateB - dateA; // Ascending order
        });

        // Now set the sorted array into your state
        setNestsdb({ ...nestsdb, loading: false, nests: sortedNests });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      if (selected.length > 0) {
        setViewPdfstatus(false);
      } else if (selected.length === 0) {
        setViewPdfstatus(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, [selected]);

  return (
    <div>
      {nestsdb.nests ? (
        <div>
          <div
            className="input-container-2column"
            style={{ marginBottom: "10px" }}>
            <div className="input-container-2column">
              <Input
                placeholder="Search by Part..."
                startContent={<SearchIcon />}
                onChange={(e) => handlePartSearch(e.target.value)}
              />

              <Select
                label="Filter by Hull"
                value={hullFilter}
                onChange={(e) => handleHullSearch(e.target.value)}>
                <SelectItem value={"0831"} key={"0831"} textValue="0831">
                  0831
                </SelectItem>
                <SelectItem value={"0833"} key={"0833"} textValue="0833">
                  0833
                </SelectItem>
                <SelectItem value={"0835"} key={"0835"} textValue="0835">
                  0835
                </SelectItem>
                <SelectItem value={"0837"} key={"0837"} textValue="0837">
                  0837
                </SelectItem>
                <SelectItem value={"0521"} key={"0521"} textValue="0521">
                  0521
                </SelectItem>
              </Select>
            </div>
            <div className="input-container-2column">
              <div></div>
              <div>
                <Button
                  color="secondary"
                  isDisabled={viewPdfstatus}
                  onClick={() => createArrayOfNestPath()}>
                  View PDF
                </Button>
              </div>
            </div>
          </div>
          <DataTable
            rows={filtered.length > 0 ? filtered : nestsdb.nests}
            columns={columns}
            initialColumns={initialColumns}
            updateParent={handleSelection}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
