import { useState } from "react";
import DataTable from "../../../Components/Common/DataTable/Index";
import { getFB } from "../../../Components/Global/functions/firebase";
import { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export const PlateChart = ({ projectUID }) => {
  const [plates, setPlates] = useState([]);

  const initialColumns = [
    "stock",
    "heatNumber",
    "serialNumber",
    "size",
    "utilization",
    "plateNumber",
  ];

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "Stock", uid: "stock", sortable: true },
    { name: "Heat Number", uid: "heatNumber", sortable: true },
    { name: "Serial Number", uid: "serialNumber", sortable: true },
    { name: "Size", uid: "size", sortable: true },
    { name: "Utilization", uid: "utilization", sortable: true },
    { name: "Plate Number", uid: "plateNumber", sortable: true },
  ];

  function handleSelect(value) {}

  async function getPlates() {
    const plates = await getFB("Projects/" + projectUID + "/PlateInventory");
    setPlates(plates);
  }

  useEffect(() => {
    getPlates();
  }, []);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Plate Inventory</CardHeader>
          <CardBody>
            <div>
              <DataTable
                rows={plates}
                initialColumns={initialColumns}
                columns={columns}
                updateParent={handleSelect}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
