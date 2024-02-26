import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { setFB } from "../../../Components/Global/functions/firebase";

export const PMAddPlate = ({projectUID}) => {
  const [newPlate, setNewPlate] = useState({
    stock: "",
    heatNumber: "",
    size: "",
    serialNumber: "",
    utilization: "",
    plateNumber: "",
  });

  function handlePlateSubmit() {
    setFB("Projects/" + projectUID + "/PlateInventory", newPlate);
  }

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Add Plate</CardHeader>
          <CardBody>
            <div>
              <div className="input-container-6column">
                <Input
                  label="Stock"
                  value={newPlate.stock}
                  onChange={(e) =>
                    setNewPlate({ ...newPlate, stock: e.target.value })
                  }
                />
                <Input
                  label="Size"
                  value={newPlate.size}
                  onChange={(e) =>
                    setNewPlate({ ...newPlate, size: e.target.value })
                  }
                />
                <Input
                  label="Serial Number"
                  value={newPlate.serialNumber}
                  onChange={(e) =>
                    setNewPlate({ ...newPlate, serialNumber: e.target.value })
                  }
                />
                <Input
                  label="Heat Number"
                  value={newPlate.heatNumber}
                  onChange={(e) =>
                    setNewPlate({ ...newPlate, heatNumber: e.target.value })
                  }
                />
                <Input
                  label="Utilization"
                  value={newPlate.utilization}
                  onChange={(e) =>
                    setNewPlate({ ...newPlate, utilization: e.target.value })
                  }
                />
                <Input
                  label="Plate Number"
                  value={newPlate.plateNumber}
                  onChange={(e) =>
                    setNewPlate({ ...newPlate, plateNumber: e.target.value })
                  }
                />
              </div>
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                <Button color="secondary" onClick={() => handlePlateSubmit()}>
                  Add Plate
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
