import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ListBox from "./ListBox";

export const PartsListCreate = ({ partsList, updatePartsList }) => {
  const [partsListData, setPartsListData] = useState({
    partsList: partsList,
    tempName: "",
    tempQty: "1",
  });

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
  };

  useEffect(() => {
    setPartsListData({...partsListData, partsList: partsList})
  }, [partsList])

  return (
    <div>
      <div>
        <form onSubmit={addPart}>
          <div style={{ display: "flex" }} className=" mb-6 md:mb-0 gap-4">
            <Input
              label="Name"
              value={partsListData.tempName}
              onChange={(e) =>
                setPartsListData({ ...partsListData, tempName: e.target.value })
              }
            />
            <Input
              label="Qty"
              value={partsListData.tempQty}
              type="number"
              onChange={(e) =>
                setPartsListData({ ...partsListData, tempQty: e.target.value })
              }
            />
            <Button color="primary" type="submit">
              Enter Part
            </Button>
          </div>
        </form>
      </div>
      <div>
        {partsListData.partsList ? (
          partsListData.partsList.map((value) => (
            <div className="input-container-1column">
              <ListBox
                title={value.name}
                clickEvent={() => deletePart(value.name)}
              />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
