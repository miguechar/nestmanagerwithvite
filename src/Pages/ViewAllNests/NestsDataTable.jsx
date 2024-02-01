import { useEffect, useState } from "react";
import DataTable from "../../Components/Common/DataTable/Index";
import { getFB } from "../../Components/Global/functions/firebase";
import ShittyTable from "../../Components/Common/DataTable/ShittyTable";

export const NestsDataTable = () => {
  const [nestsdb, setNestsdb] = useState({ loading: false, nests: [] });

  const columns = [
    { name: "Nest Name", uid: "nestName", sortable: true },
    { name: "Hull", uid: "hull", sortable: true },
    { name: "PO", uid: "po", sortable: true },
    { name: "Added On", uid: "addedon", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Stock", uid: "stock", sortable: true },
    { name: "Serial Number", uid: "serialNumber", sortable: true },
  ];

  useEffect(() => {
    setNestsdb({ ...nestsdb, loading: true });
    const fetchData = async () => {
      const nests = await getFB("/nests");

      if (Array.isArray(nests)) {
        setNestsdb({ ...nestsdb, loading: false, nests: nests });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {nestsdb.nests ? (
        <div>
          <DataTable users={nestsdb.nests} columns={columns} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
