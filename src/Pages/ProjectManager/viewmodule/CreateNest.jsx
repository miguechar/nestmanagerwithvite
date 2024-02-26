import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { PartsListCreate } from "../../../Components/Common/PartsListCreate";
import { useEffect, useState } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";

export const CreateNest = ({ selectedModule, projectUID }) => {
  const [newNest, setNewNest] = useState({
    name: "",
    module: selectedModule,
    plate: "",
    partsList: [],
    stock: "",
  });

  const [plateInv, setPlateInv] = useState([]);

  async function fetchPlates() {
    const plates = await getFB("Projects/" + projectUID + "/PlateInventory");
    setPlateInv(plates);
  }

  function getDataFromPlate(selectedPlate) {
    if (selectedPlate !== "") {
      const plate = plateInv.filter(
        (value) => value.plateNumber === selectedPlate
      );

      // autofill fields on plate selection
      if (plate.length > 0) {
        fetchCBom(plate[0].stock, plate[0].utilization);
      }
    } else {
        setNewNest([])
    }
  }

  async function fetchCBom(stock, utilization) {
    const ebom = await getFB("Projects/" + projectUID + "/Assemblies/");
    const moduleAssys = ebom.filter((value) => value.module === selectedModule);
    var cbom = [];
    for (let i = 0; i < moduleAssys.length; i++) {
      if (moduleAssys[i].partsList) {
        const updatedPartsList = moduleAssys[i].partsList.map((part) => {
          if (part.BOMKEY) {
            part.uid = part.BOMKEY; // Change BOMKEY to uid
            delete part.BOMKEY;
          }
          part.assyParent = moduleAssys[i].assyParent;
          part.assyName = moduleAssys[i].assyName;
          return part;
        });
        cbom = cbom.concat(updatedPartsList);
      }
    }

    const applicableParts = cbom.filter((value) => value.DESCR === stock);
    if (applicableParts.length > 0) {
      setNewNest({
        ...newNest,
        partsList: applicableParts,
        stock: stock,
        utilization: utilization,
      });
    }
  }

  function handlePartsListChange(value) {
    setNewNest({ ...newNest, partsList: value });
  }

  useEffect(() => {
    fetchPlates();
  }, []);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Create Nest</CardHeader>
          <CardBody>
            <div>
              <div className="input-container-6column">
                <Select
                  label="Plate"
                  key={"plate"}
                  onChange={(e) => getDataFromPlate(e.target.value)}>
                  {plateInv.map((value) => (
                    <SelectItem
                      value={value.plateNumber}
                      key={value.plateNumber}>
                      {value.plateNumber}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Stock"
                  value={newNest.stock}
                  onChange={(e) =>
                    setNewNest({ ...newNest, stock: e.target.value })
                  }
                />
                <Input
                  label="Utilization"
                  value={newNest.utilization}
                  onChange={(e) =>
                    setNewNest({ ...newNest, utilization: e.target.value })
                  }
                />
              </div>
              <div style={{ margin: "10px" }}>
                <Divider />
              </div>
              <div>
                <PartsListCreate
                  partsList={newNest.partsList}
                  formatType={"BOM"}
                  updatePartsList={handlePartsListChange}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
