import { useState, useEffect } from "react";
import DataTable from "../../Components/Common/DataTable/Index";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import ShittyTable from "../../Components/Common/DataTable/ShittyTable";
import { ffgModules } from "../../Components/Global/MenuItems";
import axios from "axios";
import Dialog from "../../Components/Common/Dialog";
import {
  getFB,
  getTodayDate,
} from "../../Components/Global/functions/firebase";
import RightDrawer from "../../Components/Common/Drawer";
import PCPartsList from "../../Components/Common/PCPartsList";

export const PCPage = () => {
  const [folders, setFolders] = useState([]);
  const [filteredPC, setFilteredPC] = useState([]);
  const [selectedPCs, setSelectedPCs] = useState([]);
  const [openstatus, setopenstatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nests, setNests] = useState([]);

  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  });

  const [drawer, setDrawer] = useState({
    open: false,
    title: "",
    component: "",
  });

  const columns = [
    { name: "PC", uid: "name", sortable: true },
    { name: "Module", uid: "module", sortable: true },
    { name: "Hull", uid: "hull", sortable: true },
  ];

  const initialColumns = ["name", "module", "hull"];

  function handleDialogCLose() {
    setDialog({ ...dialog, open: false });
  }

  function handleDrawerClose() {
    setDrawer({ ...drawer, open: false });
  }

  function handleSelect(value) {
    if (value.length > 0) {
      setopenstatus(false);
    } else {
      setopenstatus(true);
    }
    var paths = [];
    for (let i = 0; i < value.length; i++) {
      paths.push(
        "\\\\fmmfs001\\File Transfer Folder\\CBOM TEAM - WORK FROM ENGINEERING\\COMPLETE\\" +
          value[i]
      );
    }
    setSelectedPCs(paths);
  }

  function handlePCSearch(pc) {
    const filter = folders.filter(
      (value) =>
        value.name && value.name.toLowerCase().includes(pc.toLowerCase())
    );
    if (filter.length > 0) {
      setFilteredPC(filter);
    } else {
      setFilteredPC([]);
    }
  }

  function handleHullSearch(hull) {
    const filter = folders.filter(
      (value) =>
        value.hull && value.hull.toLowerCase().includes(hull.toLowerCase())
    );
    if (filter.length > 0) {
      setFilteredPC(filter);
    } else {
      setFilteredPC([]);
    }
  }

  function handleModuleSearch(module) {
    console.log(module);
    if (filteredPC.length > 0) {
      const filter = filteredPC.filter((value) => value.module === module);
      if (filter.length > 0) {
        setFilteredPC(filter);
      }
    } else {
      const filter = folders.filter((value) => value.module === module);
      if (filter.length > 0) {
        setFilteredPC(filter);
      }
    }
  }

  function handleOpenDirectories() {
    axios
      .post("http://10.102.30.12:8080/open-directories", { selectedPCs })
      .then((response) => {
        alert("Directories should now be open in File Explorer.");
      })
      .catch((error) => {
        console.error("Error opening directories:", error);
        alert(
          "Failed to open directories. Check the console for more information."
        );
      });
  }

  function handlePartSearch() {
    var part = "";

    const body = (
      <div>
        <Input
          label="Enter Part To Search"
          onChange={(e) => (part = e.target.value)}
        />
      </div>
    );
    const footer = (
      <div>
        <Button color="primary" onClick={() => handlePartSearchFlask(part)}>
          Search
        </Button>
      </div>
    );
    setDialog({
      open: true,
      title: "Search parts under: ",
      body: body,
      footer: footer,
    });
  }

  function handlePartSearchFlask(searchTerm) {
    handleDialogCLose();
    setDialog({
      open: true,
      title: "Searching...",
      body: <CircularProgress aria-label="Loading..." />,
    });
    setLoading(true);
    axios
      .post("http://10.102.30.12:8080/search-part", {
        selectedPCs: selectedPCs, // Make sure this state contains the paths of selected directories
        part: searchTerm,
      })
      .then((response) => {
        handleDialogCLose();
        setLoading(false);
        const body = (
          <div>
            {response.data.map((value) => (
              <p>
                Page: {value.page}, {value.pdf}
              </p>
            ))}
          </div>
        );
        

        setDrawer({
          open: true,
          component: body
        })
        // Update the search results state with the response data
        // setSearchResults(response.data);
        // // Open the dialog/modal to show the results
        // setIsDialogOpen(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error searching for part:", error);
        alert(
          "Failed to search for the part. Check the console for more information."
        );
      });
  }

  function handlePartsListSearch() {
    axios
      .post("http://10.102.30.12:8080/search-parts-list", {
        selectedPCs: selectedPCs,
      })
      .then((response) => {
        const partsList = createPartsListFromNCFab(response.data[0].data);
        const date = getTodayDate();

        setDrawer({
          open: true,
          title: "Found " + partsList.length + " parts",
          component: <PCPartsList data={partsList} date={date} />,
        });
      })
      .catch((error) => {
        console.error("Error searching for parts list:", error);
        alert(
          "Failed to search for the parts list. Check the console for more information."
        );
      });
  }

  function createPartsListFromNCFab(partsList) {
    var createdPartsList = [];
    for (let i = 0; i < partsList.length; i++) {
      const partNumber = partsList[i]["Part Number"];
      const qty = partsList[i]["QTY"];

      const filtered = nests.filter(
        (value) =>
          Array.isArray(value.parts) && // Check if partsList exists and is an array
          value.parts.some(
            (subvalue) =>
              subvalue.name.toLowerCase().includes(partsList[i]["Part Number"]) // Ensure case-insensitive comparison
          )
      );

      if (filtered.length > 0) {
        createdPartsList.push({
          partName: partsList[i]["Part Number"],
          QTY: partsList[i]["QTY"],
          Description: partsList[i]["Descr"],
          hull: partsList[i]["Project"],
          weNest: filtered[0].nestName,
          status: filtered[0].status
        });
      } else {
        createdPartsList.push({
          partName: partsList[i]["Part Number"],
          QTY: partsList[i]["QTY"],
          Description: partsList[i]["Descr"],
          hull: partsList[i]["Project"],
        });
      }
    }
    return createdPartsList;
  }

  async function fetchNests() {
    const nests = await getFB("nests");
    setNests(nests);
  }

  useEffect(() => {
    fetch("http://10.102.30.12:8080/get-folders")
      .then((response) => response.json())
      .then((data) => setFolders(data))
      .catch((error) => console.error("Error fetching folders:", error));
    fetchNests();
  }, []);

  return (
    <div>
      <div>
        {/* {folders.map((folder, index) => (
          <p key={index}>
            {folder.name + " " + folder.module + " " + folder.hull}
          </p>
        ))} */}
      </div>
      <div>
        <Card>
          <CardHeader>Current PC</CardHeader>
          <CardBody>
            <div className="input-container-1column">
              <div className="input-container-6column">
                <Input
                  label="Search by PC"
                  onChange={(e) => handlePCSearch(e.target.value)}
                />
                <Input
                  label="Search by Hull"
                  onChange={(e) => handleHullSearch(e.target.value)}
                />
                <Select
                  label="Module"
                  onChange={(e) => handleModuleSearch(e.target.value)}>
                  {ffgModules.map((value) => (
                    <SelectItem
                      value={value.name}
                      key={value.name}
                      textValue={value.name}>
                      {value.name}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  color="secondary"
                  isDisabled={openstatus}
                  onClick={handlePartSearch}>
                  Search Part
                </Button>
                <Button
                  color="secondary"
                  isDisabled={openstatus}
                  onClick={handleOpenDirectories}>
                  Open PC Directory
                </Button>
                <Button
                  color="secondary"
                  isDisabled={openstatus}
                  onClick={handlePartsListSearch}>
                  Compare Nest Manager db
                </Button>
              </div>
              <div>
                <DataTable
                  rows={filteredPC.length > 0 ? filteredPC : folders}
                  columns={columns}
                  initialColumns={initialColumns}
                  updateParent={handleSelect}
                  searchField={false}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Dialog
        open={dialog.open}
        onClose={handleDialogCLose}
        title={dialog.title}
        body={dialog.body}
        footer={dialog.footer}
      />
      <RightDrawer
        open={drawer.open}
        onClose={handleDrawerClose}
        component={drawer.component}
        title={drawer.title}
        width={"900px"}
      />
    </div>
  );
};
