import { useEffect, useState } from "react";
import { getFB } from "../../Components/Global/functions/firebase";
import DataTable from "../../Components/Common/DataTable/Index";

export const FFGTee = () => {
  const [tee, setTee] = useState([]);

  async function getTeeInfo() {
    const teeInfo = await getFB("FFGTee");
    setTee(teeInfo);
  }

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "Flange W", uid: "flangew", sortable: true },
    { name: "Flange Th", uid: "flangeth", sortable: true },
    { name: "Web W", uid: "webw", sortable: true },
    { name: "Web Th", uid: "webth", sortable: true },
  ];

  const initialColumns = [
    "beam",
    "flangew",
    "flangeth",
    "webw",
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
