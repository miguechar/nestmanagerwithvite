import { useState, useEffect } from "react";
import { getFB, updateFB } from "../../../Components/Global/functions/firebase";
import { RadioInbox } from "./RadioInbox";
import { EditFormEngineering } from "./EditForm";
import { CheckPartsEng } from "./CheckPartsEng";
import { Button, Input } from "@nextui-org/react";
import SnackBarComponent from "../../../Components/Common/Snackbar";
import Dialog from "../../../Components/Common/Dialog";

export const EngineeringInbox = () => {
  const [allFabReq, setAllFabReq] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [fabreq, setFabreq] = useState([]);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  });
  const [rejectionMessage, setRejectionMessage] = useState("");

  function handleSnackBarClose() {
    setSnackBar({ ...snackBar, open: false });
  }

  function handleDialogClose() {
    setDialog({ ...dialog, open: false });
  }

  function handleCheckedfr(selectedValue) {
    setSelectedValue(selectedValue.fullValue[0]);
    setFabreq(selectedValue.fullValue[0]);
  }

  function updateEditForm(newState) {
    setFabreq((prevState) => ({ ...prevState, ...newState }));
  }

  function updatedPartsList(newPartsList) {
    setFabreq({ ...fabreq, partsList: newPartsList });
  }

  function submitCheck() {
    if (fabreq.partsList) {
      // CHECKS TO SEE IF THERE ARE ANY "PATHS" THAT ARE BLANK
      var blank = false;
      for (let i = 0; i < fabreq.partsList.length; i++) {
        const current = fabreq.partsList[i].path;
        if (current === "" || current === null) {
          blank = true;
          break;
        }
      }

      // IF NO PATHS ARE LEFT BLANK
      if (!blank) {
        const updatedFabreq = {
          ...fabreq,
          engineeredChecked: "yes",
          rejected: "no",
        };
        updateFB(
          "/fabricationRequests/fabricationRequests/" + fabreq.uid,
          updatedFabreq
        );

        setSnackBar({
          open: true,
          message: "All paths are entered",
          severity: "success",
        });
      }
    }
  }

  function rejectFabDialog() {
    var message = "";
    const footer = (
      <div
        style={{
          justifyContent: "space-between",
          width: "100%",
          display: "flex",
        }}>
        <Button color="primary" onClick={() => handleDialogClose()}>
          Close
        </Button>
        <Button color="danger" onClick={() => rejectFab(message)}>
          Submit Rejection
        </Button>
      </div>
    );

    const body = (
      <div>
        <Input
          label="Reason Why?"
          onChange={(e) => {
            message = e.target.value;
          }}
        />
      </div>
    );

    setDialog({
      ...dialog,
      open: true,
      title: "Rejection",
      body: body,
      footer: footer,
    });
  }

  function rejectFab(message) {
    const rejectedFab = {
      ...fabreq,
      engineeredChecked: "yes",
      rejected: "yes",
      rejectionMessage: message,
    };

    updateFB(
      "/fabricationRequests/fabricationRequests/" + fabreq.uid,
      rejectedFab
    );
    handleDialogClose();
    fetchData();
    setSelectedValue({})
  }

  const fetchData = async () => {
    const fabreq = await getFB("/fabricationRequests/fabricationRequests");

    if (Array.isArray(fabreq)) {
      const engineering = fabreq.filter(
        (value) => value.engineeredChecked === "no"
      );
      setAllFabReq(engineering);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="input-container-2column">
        {allFabReq ? (
          <RadioInbox fabreq={allFabReq} updateParentState={handleCheckedfr} />
        ) : (
          <div></div>
        )}

        {selectedValue ? (
          <EditFormEngineering
            selectedFabReq={selectedValue}
            updateParentState={updateEditForm}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {selectedValue ? (
          <div>
            <div>
              <CheckPartsEng
                selectedFabReq={selectedValue}
                updateParentState={updatedPartsList}
              />
            </div>

            <div
              style={{
                justifyContent: "space-between",
                width: "100%",
                display: "flex",
              }}>
              <Button color="danger" onClick={rejectFabDialog}>
                Reject Fab
              </Button>
              <Button color="primary" onClick={submitCheck}>
                Submit Check
              </Button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        <SnackBarComponent
          onClose={handleSnackBarClose}
          open={snackBar.open}
          message={snackBar.message}
          severity={snackBar.severity}
        />
        <Dialog
          open={dialog.open}
          onClose={handleDialogClose}
          title={dialog.title}
          body={dialog.body}
          footer={dialog.footer}
        />
      </div>
    </div>
  );
};
