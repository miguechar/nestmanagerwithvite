import { useEffect, useState } from "react";
import { getFB } from "../../Components/Global/functions/firebase";
import DataTable from "../../Components/Common/DataTable/Index";

export const MMSCTee = () => {
  const [tee, setTee] = useState([]);

  async function getTeeInfo() {
    const teeInfo = await getFB("MMSCTee");
    setTee(teeInfo);
  }

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "Beam", uid: "beam", sortable: true },
    { name: "Flange", uid: "flange", sortable: true },
    { name: "Flange Th", uid: "flangeth", sortable: true },
    { name: "Depth", uid: "depth", sortable: true },
    { name: "Shape", uid: "shape", sortable: true },
    { name: "Tee", uid: "tee", sortable: true },
    { name: "Web Th", uid: "webth", sortable: true },
  ];

  const initialColumns = [
    "uid",
    "beam",
    "flange",
    "flangeth",
    "depth",
    "shape",
    "tee",
    "webth",
  ];

  function handleParentChange(value) {}

  useEffect(() => {
    getTeeInfo();
  }, []);

  return (
    <div>
      <div>
        <DataTable
          rows={tee}
          initialColumns={initialColumns}
          columns={columns}
          updateParent={handleParentChange}
        />
      </div>
    </div>
  );
};
