import { useState } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import { useEffect } from "react";
import DataTable from "../../../Components/Common/DataTable/Index";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { downloadObjectAsCsv } from "../../../Components/Processing/ObjToCsv";

export const CBom = ({ selectedModule, projectUID, updateParentTab }) => {
  const [cbom, setcbom] = useState([]);

  async function fetchCBom() {
    const ebom = await getFB("Projects/" + projectUID + "/Assemblies/");
    const moduleAssys = ebom.filter((value) => value.module === selectedModule);
    var cbom = [];
    for (let i = 0; i < moduleAssys.length; i++) {
      if (moduleAssys[i].partsList) {
        const updatedPartsList = moduleAssys[i].partsList.map(part => {
          if (part.BOMKEY) {
            part.uid = part.BOMKEY; // Change BOMKEY to uid
            delete part.BOMKEY;
          }
          const parent = moduleAssys.filter((value) => value.uid === moduleAssys[i].assyParent)
          part.assyParent =  parent[0].assyName
          part.assyName = moduleAssys[i].assyName;
          return part;
        });
        // Now, each part in updatedPartsList has an assyParent at the same level
        cbom = cbom.concat(updatedPartsList); // Concatenate to flatten into cbom
      }
    }
    setcbom(cbom); // Set the entire flattened array
  }
  
  

  const columns = [
    { name: "Name", uid: "NAME", sortable: true },
    { name: "Qty", uid: "QTY", sortable: true },
    { name: "Description", uid: "DESCR", sortable: true },
    { name: "Material", uid: "MATERIAL", sortable: true },
    { name: "Weight(kg)", uid: "WEIGHT", sortable: true },
    { name: "Assy", uid: "assyName", sortable: true },
    { name: "Parent", uid: "assyParent", sortable: true },
  ];

  const initialColumns = [
    "NAME",
    "QTY",
    "DESCR",
    "MATERIAL",
    "WEIGHT",
    "assyName",
    "assyParent",
  ];

  function handleSelected(value) {}

  function downloadCsv() {
    downloadObjectAsCsv(cbom, selectedModule + " - CBom")
  }

  useEffect(() => {
    fetchCBom();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>CBOM</CardHeader>
        <CardBody>
          <div style={{marginBottom: "10px"}}>
            <Button color="secondary" onClick={() => downloadCsv()}>Download As CSV</Button>
          </div>
          <div>
            <DataTable
              initialColumns={initialColumns}
              rows={cbom}
              columns={columns}
              updateParent={handleSelected}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
