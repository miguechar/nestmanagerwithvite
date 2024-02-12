import { useEffect, useState } from "react";
import DataTable from "../../Components/Common/DataTable/Index";
import { getFB } from "../../Components/Global/functions/firebase";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../Components/icons/SearchIcon";

export const NestsDataTable = () => {
  const [nestsdb, setNestsdb] = useState({ loading: false, nests: [] });
  const [filtered, setfiltered] = useState([])

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

  }

  function handlePartSearch(part) {
    const partLowercased = part.toLowerCase(); // Convert the search term to lowercase outside the loop for efficiency
    const filteredNests = nestsdb.nests.filter((value) =>
      Array.isArray(value.parts) && // Check if partsList exists and is an array
      value.parts.some((subvalue) =>
        subvalue.name.toLowerCase().includes(partLowercased) // Ensure case-insensitive comparison
      )
    );
    if (part !== "") {
      setfiltered(filteredNests)
    } else {
      setfiltered([])
    }
  }

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

  return (
    <div>
      {nestsdb.nests ? (
        <div>
          <div
              className="input-container-4column"
              style={{ marginBottom: "10px" }}>
              <Input
                placeholder="Search by Part..."
                startContent={<SearchIcon />}
                onChange={(e) => handlePartSearch(e.target.value)}
              />
            </div>
          <DataTable
            rows={ filtered.length > 0 ? filtered : nestsdb.nests}
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
