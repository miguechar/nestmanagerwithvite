import { Button } from "@nextui-org/react";
import { setFB } from "../../../Components/Global/functions/firebase";
import Dialog from "../../../Components/Common/Dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SubmitRequest = ({ fabreq }) => {
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
  });

  const navitgateTo = useNavigate();

  function handleSubmit() {
    const someFunctionToCallSetFB = () => {
      setFB("testing/", fabreq);

      const body = (
        <div>
          <Button
            color="primary"
            onClick={() => navitgateTo("/fabricationrequests/allfabs")}>
            Go To All Fabs
          </Button>
        </div>
      );
      setDialog({
        open: true,
        title: fabreq.frNo + " has been entered!",
        body: body,
      });
    };
    someFunctionToCallSetFB();
  }

  function handleDialogClose() {
    setDialog({ ...dialog, open: false });
  }

  return (
    <div className="input-container-1column">
      <Button color="primary" onClick={() => handleSubmit()}>
        {"Submit " + fabreq.frNo}
      </Button>
      <div>
        <Dialog
          open={dialog.open}
          title={dialog.title}
          body={dialog.body}
          onClose={handleDialogClose}
        />
      </div>
    </div>
  );
};
