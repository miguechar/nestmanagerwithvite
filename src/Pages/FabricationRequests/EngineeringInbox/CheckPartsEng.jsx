import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import { PartsListCreate } from "../../../Components/Common/PartsListCreate";
import SnackBarComponent from "../../../Components/Common/Snackbar";

export const CheckPartsEng = ({ selectedFabReq, updateParentState}) => {
  const [fabreq, setFabreq] = useState({
    dateRequiered: "",
    requestedBy: "",
    project: "",
    module: "",
    po: "",
    poName: "",
    shipTo: "",
    comp: "",
    materialProvided: "",
    materialLocation: "",
    dwg: "",
    sheetZone: "",
    ecnfcn: "",
    briefDescription: "",
    detailedInstructions: "",
    shopAssigned: "",
    dateCompleted: "",
    shopNotes: "",
    frNo: "",
    engineeredChecked: "no",
    engineeringNotes: "",
    partsList: [],
    personWorked: "",
    personWorked1: "",
    personWorked2: "",
    hoursWorked: "",
    currentCount: "",
    select: true,
  });
  const [editPartsList, setEditPartsList] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: ""
  })

  const [nests, setNests] = useState([]);

  const handlePathChange = (e, index) => {
    const updatedPartsList = [...fabreq.partsList];
    updatedPartsList[index] = {
      ...updatedPartsList[index],
      path: e.target.value,
    };
    setFabreq({
      ...fabreq,
      partsList: updatedPartsList,
    });
    updateParentState(updatedPartsList)
  };

  function updatePartsList(newPartsList) {
    setFabreq({ ...fabreq, partsList: newPartsList });
    updateParentState(newPartsList)
  }

  async function FetchNests(currentfab, newPartsList) {
    const nests = await getFB("nests");

    if (Array.isArray(nests)) {
      // setNests(nests);

      // const partsList = currentfab.partsList ;
      const partsList = newPartsList ? newPartsList : currentfab.partsList
      if (partsList.length > 0) {
        var newPartsList = [];

        // look for each part of fab in nests
        for (let i = 0; i < partsList.length; i++) {
          const paths = nests.filter((value) =>
            value.parts.some((subvalue) => subvalue.name === partsList[i].name)
          );
          // adding these found values to array and if no path is found to leave blank
          newPartsList.push({
            "name": partsList[i].name,
            "qty": partsList[i].qty,
            "path": paths[0].path ? paths[0].path : ""
          })
        }
        updateParentState(newPartsList)
        setFabreq({...fabreq, partsList: newPartsList});
        setSnackBar({
          open: true,
          message: "Parts found in Nest Manager!",
          severity: "success"
        })
        setNests(nests)
      }
    }
  };

  function handleSnackBarClose() {
    setSnackBar({...snackBar, open: false})
  }

  useEffect(() => {
    setFabreq(selectedFabReq)

    FetchNests(selectedFabReq);
  }, [selectedFabReq]);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Add WE Nest or Path</CardHeader>
          <CardBody>
            <div>
              <div style={{ textAlign: "right" }}>
                {/* this button will trigger partsListCreate */}
                <Button color={editPartsList ? "danger" : "primary"} onClick={() => setEditPartsList(editPartsList ? false : true)}>
                  {editPartsList ? "Close Edit PartsList" : "Edit / Add Parts"}
                </Button>
              </div>
              <div>
                {fabreq.partsList.length > 0 ? (
                  <div>
                    {fabreq.partsList.map((value, index) => (
                      <div key={index}>
                        <p variant="h5">{value.name + ", qty: " + value.qty}</p>
                        <Input
                          variant="filled"
                          label="Path"
                          style={{ width: 650 }}
                          value={value.path ? value.path : ""}
                          onChange={(e) => handlePathChange(e, index)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>Add Path</p>
                    <Input
                      label="Path"
                      variant="filled"
                      style={{ width: 650 }}
                      onChange={(e) =>
                        setFabreq({ ...fabreq, path: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        <div style={{ marginTop: "10px" }}>
          {editPartsList ? (
            <Card>
              <CardHeader>Edit / Add Parts</CardHeader>
              <CardBody>
                <PartsListCreate
                  partsList={fabreq.partsList}
                  updatePartsList={updatePartsList}
                />
              </CardBody>
            </Card>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div>
        <SnackBarComponent 
          onClose={handleSnackBarClose}
          open={snackBar.open}
          message={snackBar.message}
          severity={snackBar.severity}
        />
      </div>

    </div>
  );
};
