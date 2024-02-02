import { useState, useEffect } from "react";
import { getFB, updateFB, setFB } from "../../../Components/Global/functions/firebase";
import { RadioInbox } from "./RadioInbox";
import { EditFormEngineering } from "./EditForm";
import { Button, Input } from "@nextui-org/react";
import SnackBarComponent from "../../../Components/Common/Snackbar";
import Dialog from "../../../Components/Common/Dialog";
import { PlateShopDetails } from "./PlateshopDetails";

export const PlateshopInbox = () => {
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

  function updatePlateShopDetails(plateShopDetails) {
    setFabreq({ ...fabreq, ...plateShopDetails });
  }

  function submitCheck() {
    if (
      fabreq.shopAssigned !== "" &&
      fabreq.dateCompleted !== "" &&
      fabreq.personWorked1 !== "" &&
      fabreq.hoursWorked !== ""
    ) {
      // IF NO PATHS ARE LEFT BLANK
      // if there is only one person working this
      if (fabreq.personWorked2 === "" || fabreq.personWorked2 === null) {
        const currentOperatorUid = operators.filter(
          (value) => value.clock === fabreq.personWorked1
        );

        const operatorJson = {
          date: fabreq.dateCompleted,
          hoursWorked: fabreq.hoursWorked,
        };

        setFB(
          "/fabricationRequests/Operators/" +
            currentOperatorUid[0].uid +
            "/work/",
          operatorJson
        );
        
      }

      // If there are two people working on this, divide time in half and split

      if (fabreq.personWorked2 !== "" && fabreq.personWorked2 !== null) {
        const dividedHours = Math.floor(parseFloat(fabreq.hoursWorked / 2));

        const firstOperator = operators.filter(
          (value) => value.clock === fabreq.personWorked1
        );

        const firstOperatorJson = {
          date: fabreq.dateCompleted,
          hoursWorked: dividedHours,
        };

        setFB(
          "/fabricationRequests/Operators/" + firstOperator[0].uid + "/work/",
          firstOperatorJson
        );

        const secondOperator = operators.filter(
          (value) => value.clock === fabreq.personWorked2
        );

        const secondOperatorJson = {
          date: fabreq.dateCompleted,
          hoursWorked: dividedHours,
        };

        setFB(
          "/fabricationRequests/Operators/" + secondOperator[0].uid + "/work/",
          secondOperatorJson
        );
      }

      updateFB(
        "/fabricationRequests/fabricationRequests/" + fabreq.uid,
        fabreq
      );

      setSnackBar({
        open: true,
        message: fabreq.frNo + " completed!",
        severity: "success",
      });

      fetchData();
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
    setSelectedValue({});
  }

  const fetchData = async () => {
    const fabreq = await getFB("/fabricationRequests/fabricationRequests");

    if (Array.isArray(fabreq)) {
      const plateshop = fabreq.filter(
        (value) =>
          value.engineeredChecked === "yes" &&
          value.dateCompleted === "" &&
          value.rejected !== "yes"
      );
      setAllFabReq(plateshop);
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
              {/* <CheckPartsEng
                selectedFabReq={selectedValue}
                updateParentState={updatedPartsList}
              /> */}
              <PlateShopDetails
                selectedFabReq={selectedValue}
                updateParentState={updatePlateShopDetails}
              />
            </div>

            <div
              style={{
                justifyContent: "space-between",
                width: "100%",
                display: "flex",
                alignItems: "right",
              }}>
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
