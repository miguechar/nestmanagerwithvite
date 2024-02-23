import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ListBox from "./ListBox";
import { TextField } from "@mui/material";
import { ReadCSV } from "../Processing/ReadCsv";
import SnackBarComponent from "./Snackbar";

export const PartsListCreate = ({ partsList, updatePartsList, formatType }) => {
  const [partsListData, setPartsListData] = useState({
    partsList: partsList,
    tempName: "",
    tempQty: "1",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: ""
  })

  function updateParent(value) {
    updatePartsList(value);
  }

  function handleSnackbarClose() {
    setSnackbar({...snackbar, open: false})
  }

  function addPart(e) {
    e.preventDefault();

    const capitalizedTempName = partsListData.tempName.toUpperCase();

    if (partsListData.partsList.length == 0) {
      var partsList = [];
      partsList.push({
        name: capitalizedTempName,
        qty: partsListData.tempQty,
      });
      updatePartsList(partsList);
      setPartsListData({ partsList: partsList, tempName: "", tempQty: "1" });
    }

    if (partsListData.tempName !== "" && partsListData.partsList.length > 0) {
      const partsList = partsListData.partsList;
      partsList.push({
        name: partsListData.tempName,
        qty: partsListData.tempQty,
      });
      updatePartsList(partsList);
      setPartsListData({ partsList: partsList, tempName: "", tempQty: "1" });
    }
  }

  function deletePart(part) {
    const filtered = partsListData.partsList.filter(
      (value) => value.name !== part
    );
    setPartsListData({ ...partsListData, partsList: filtered });
    updatePartsList(filtered);
    setSnackbar({open: true, message: part + " deleted", severity: "error"})
  }

  useEffect(() => {
    setPartsListData({ ...partsListData, partsList: partsList });
  }, [partsList]);

  return (
    <div>
      <div>
        <form onSubmit={addPart}>
          <div className="input-container-2column">
            <div className="input-container-1column">
              <Input
                label="Name"
                value={partsListData.tempName}
                onChange={(e) =>
                  setPartsListData({
                    ...partsListData,
                    tempName: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-container-3column">
              <Input
                label="Qty"
                value={partsListData.tempQty}
                type="number"
                onChange={(e) =>
                  setPartsListData({
                    ...partsListData,
                    tempQty: e.target.value,
                  })
                }
              />
              <ReadCSV
                updateParentState={updateParent}
                formatType={formatType}
              />
              <Button color="primary" type="submit">
                Enter Part
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {formatType === "BOM" || formatType === "partsList" ? (
          partsListData.partsList ? (
            partsListData.partsList.map((value) => (
              <div
                className="input-container-1column"
                key={formatType === "BOM" ? value.BOMKey : value.name}
              >
                <ListBox
                  title={formatType === "BOM" ? value.NAME + ", " +  value.WEIGHT + " kg, Material: " + value.MATERIAL + ", Descr: " + value.DESCR + ", Qty: " + value.QTY: value.name}
                  subtitle={formatType === "BOM" ? "" : value.qty}
                  icon="trash"
                  clickEvent={() =>
                    deletePart(formatType === "BOM" ? value.NAME : value.name)
                  }
                />
              </div>
            ))
          ) : (
            <div>No parts available.</div>
          )
        ) : null}
      </div>
      <div>
        <SnackBarComponent 
          open={snackbar.open}
          onClose={handleSnackbarClose}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </div>
    </div>
  );
};
