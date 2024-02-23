import { useEffect, useState } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import DataTable from "../../../Components/Common/DataTable/Index";

export const ViewStandardParts = ({ projectUID }) => {
  const [standardParts, setStandardParts] = useState([]);
  const initialColumns = ["name", "stock", "std", "lappedTee", "lap"];

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "PN", uid: "name", sortable: true },
    { name: "Stock", uid: "stock", sortable: true },
    { name: "STD", uid: "std", sortable: true },
    { name: "Pen", uid: "lappedTee", sortable: true },
    { name: "Lap", uid: "lap", sortable: true },
  ];

  async function fetchStandardParts() {
    const standardParts = await getFB(
      "Projects/" + projectUID + "/StandardParts"
    );
    setStandardParts(standardParts);
  }

  function handleSelected(value) {}

  useEffect(() => {
    fetchStandardParts();
  }, []);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>All Standard Parts</CardHeader>
          <CardBody>
            <div>
              <DataTable
                updateParent={handleSelected}
                rows={standardParts}
                columns={columns}
                initialColumns={initialColumns}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
