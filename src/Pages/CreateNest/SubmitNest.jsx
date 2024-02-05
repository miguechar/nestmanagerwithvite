import { Button } from "@nextui-org/react";
import { setFB, getTodayDate } from "../../Components/Global/functions/firebase";
import Dialog from "../../Components/Common/Dialog";
import { useState } from "react";
import { auth } from "../../Config";

export const SubmitNest = ({ nestData, registerSuccess }) => {
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
  });

  function submitNest() {
    const handleUidGenerated = (uuid) => {
      registerSuccess(uuid);
    };

    // Example of calling setFB
    const someFunctionToCallSetFB = () => {
      const todaysDate = getTodayDate();
      const currentUser = auth?.currentUser?.email;
      const data = ({
        addedBy: currentUser,
        material: nestData.material,
        hull: nestData.hull,
        nestName: nestData.nestName,
        thickness: nestData.thickness,
        stock: nestData.stock,
        po: nestData.po,
        notes: nestData.notes,
        plateSize: nestData.plateSize,
        parts: nestData.partsList,
        path: nestData.path,
        shipTo: nestData.shipTo,
        addedon: todaysDate,
        // to add data
        status: "Not Cut",
        uploadMethod: "",
        serialNumber: "-",
        heatNumber: "-",
        micthkns: "-",
        cutBy: "-",
        date: "-",
        notesByOperator: "-",
      })
      setFB("/nests/", data, handleUidGenerated);
      setDialog({
        open: true,
        title: nestData.nestName + " has been entered!",
      });
    };

    someFunctionToCallSetFB();
  };

  function handleDialogClose() {
    setDialog({...dialog, open: false})
  }

  return (
    <div>
      <div className="input-container-1column">
        <Button color="primary" onClick={() => submitNest()}>
          Submit Nest
        </Button>
      </div>
      <div>
        <Dialog open={dialog.open} title={dialog.title} body={dialog.body} onClose={handleDialogClose} />
      </div>
    </div>
  );
};
