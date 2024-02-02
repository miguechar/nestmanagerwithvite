import { useEffect, useState } from "react";
import DataTable from "../../Components/Common/DataTable/Index";
import { getFB } from "../../Components/Global/functions/firebase";
import ShittyTable from "../../Components/Common/DataTable/ShittyTable";

export const NestsDataTable = () => {
  const [nestsdb, setNestsdb] = useState({ loading: false, nests: [] });

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "Nest Name", uid: "nestName", sortable: true },
    { name: "Hull", uid: "hull", sortable: true },
    { name: "PO", uid: "po", sortable: true },
    { name: "Added On", uid: "addedon", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Stock", uid: "stock", sortable: true },
    { name: "Material", uid: "material", sortable: true },
    { name: "Cut By", uid: "cutBy", sortable: true },
    { name: "Serial Number", uid: "serialNumber", sortable: true },
    { name: "Heat Number", uid: "heatNumber", sortable: true },
    { name: "Added By", uid: "addedBy", sortable: true },
    { name: "Plate Size", uid: "plateSize", sortable: true },
    { name: "Path", uid: "path", sortable: true },
    { name: "Ship To", uid: "shipTo", sortable: true },
  ];

  useEffect(() => {
    setNestsdb({ ...nestsdb, loading: true });
    const fetchData = async () => {
      const nests = await getFB("/nests");
    
      if (Array.isArray(nests)) {
        // Sort the nests array by the 'addedon' date in ascending order
        const sortedNests = nests.sort((a, b) => {
          const dateA = new Date(a.addedon);
          const dateB = new Date(b.addedon);
          return dateB - dateA; // Ascending order
        });
    
        // Now set the sorted array into your state
        setNestsdb({ ...nestsdb, loading: false, nests: sortedNests });
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
