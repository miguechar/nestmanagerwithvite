import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import { getFB, setFB } from "../../Components/Global/functions/firebase";
import DataTable from "../../Components/Common/DataTable/Index";
import PDFParse from "../../Components/Processing/PDFParse";
import { PartsListCreate } from "../../Components/Common/PartsListCreate";
import { deleteFB } from "../../Components/Global/functions/firebase";
import Dialog from "../../Components/Common/Dialog";
import { ip, port } from "../../Config";  

export const Subassemblies = () => {
  const [subs, setSubs] = useState([]);
  const [newSub, setNewSub] = useState({
    parent: "",
    hull: "",
    po: "",
    partsList: [],
  });
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  })

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "Parent", uid: "parent", sortable: true },
    { name: "Hull", uid: "hull", sortable: true },
    { name: "PO", uid: "po", sortable: true },
  ];

  const initialColumns = ["uid", "hull", "parent", "po"];

  const fetchSubs = async () => {
    const subs = await getFB("subs/");

    if (Array.isArray(subs)) {
      setSubs(subs);
    }
  };

  function getSelected(value) {
    setSelectedSubs(value);
  }

  function handlePDFParse(value) {
    setNewSub(value);
  }

  function handlePartsListChange(value) {
    setNewSub({ ...newSub, partsList: value });
  }

  function handleDeleteParents() {
    for (let i = 0; i < selectedSubs.length; i++) {
      deleteFB("subs/" + selectedSubs[i]);
    }
    fetchSubs();
    setSelectedSubs([]);
  }

  async function handleAutoBClient() {
    var selectedSubassy = []

    for( let i = 0; i < selectedSubs.length; i++) {
      const selected = subs.filter((value) => value.uid === selectedSubs[i])
      selectedSubassy.push(selected)
    }
    const partsList = (selectedSubassy[0][0].partsList)

    const body = (
      <div>
        <p>You now have 5 seconds to switch to BClient</p>
        {partsList.map((value) => (
          <p>{value.name}</p>
        ))}
      </div>
    )
    const footer = (
      <div>
        <Button color="danger" onClick={() => handleDialogClose()}>Close Message</Button>
      </div>
    )

    setDialog({
      open: true,
      title: "Parts on " + selectedSubassy[0][0].parent + " / " + selectedSubassy[0][0].po,
      body: body,
      footer: footer
    })


    fetch("http://" + ip + ":" + port +"/receive_array", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedSubassy[0]),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleDialogClose() {
    setDialog({
      ...dialog,
      open: false
    })
  };

  function handleSubSubmit() {
    setFB("subs/", newSub)
    console.log(newSub)
    fetchSubs()
  }

  useEffect(() => {
    fetchSubs();
  }, [newSub]);

  return (
    <div className="input-container-1column">
      <div>
        <Card>
          <CardHeader>View all</CardHeader>
          <CardBody>
            <div>
              <div>
                <DataTable
                  rows={subs}
                  columns={columns}
                  initialColumns={initialColumns}
                  updateParent={getSelected}
                />
              </div>
              {selectedSubs.length > 0 ? (
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    marginRight: "13px",
                    marginLeft: "13px",
                    marginBottom: "5px",
                  }}>
                  <Button color="secondary" onClick={() => handleAutoBClient()}>
                    Auto BClient
                  </Button>
                  <Button color="danger" onClick={() => handleDeleteParents()}>
                    {"Delete (" + selectedSubs.length + ")"}
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>Add</CardHeader>
          <CardBody>
            <div className="input-container-1column">
              <div>
                <p>You can either upload PDF or manually enter</p>
              </div>
              <div>
                <PDFParse
                  formatType={"subassy"}
                  updateParentState={handlePDFParse}
                />
              </div>
              <div>{"Hull: " + newSub.hull}</div>
              <div>
                <PartsListCreate
                  partsList={newSub.partsList}
                  formatType={"partsList"}
                  updatePartsList={handlePartsListChange}
                />
              </div>
              <div>
                <Button onClick={handleSubSubmit} color="primary" >Submit</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div>
        <Dialog 
          open={dialog.open}
          title={dialog.title}
          body={dialog.body}
          footer={dialog.footer}
        />
      </div>
    </div>
  );
};
