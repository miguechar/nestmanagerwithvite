import { useEffect } from "react";
import LCSTreeComponent from "./TreeComponent";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export const LCSTreeView = ({ data, updateParentTab }) => {
  const [tree, setTree] = useState(null);

  function transformDataForTreeView() {
    // Check if data is undefined or null
    if (!data) {
      console.error("Data is undefined or not yet available.");
      return; // Exit the function if data is not available
    }
  
    const compartments = {};
  
    data.forEach((vessel) => {
      vessel.data.forEach((item) => {
        if (!compartments[item.COMPARTMENT]) {
          compartments[item.COMPARTMENT] = {
            name: item.COMPARTMENT,
            vessels: [],
          };
        }
        // Assuming 'Narrative' is a field within each item
        const narrative = item.Narrative || "No narrative available"; // Fallback text if Narrative is missing
        compartments[item.COMPARTMENT].vessels.push({
          vessel: vessel.vessel,
          uid: item.uid,
          narrative: narrative,
          ...item,
        });
      });
    });
  
    const treeData = Object.keys(compartments).map((key) => {
      const comp = compartments[key];
      return {
        id: `comp-${key}`,
        name: comp.name,
        children: comp.vessels.map((v) => ({
          id: `vessel-${v.uid}`,
          name: `${v.vessel}: ${v.COMPARTMENT}`,
          children: [
            {
              id: `narrative-${v.uid}`,
              name: `Narrative: ${v.narrative}`,
            },
          ], // Adding a grandchild for Narrative
        })),
      };
    });
  
    setTree(treeData);
  }
  

  useEffect(() => {
    console.log(data);
    if(data !== null) {
        transformDataForTreeView()
    } else {
        updateParentTab({ tab: "viewAllTC" })
    }
    
    
  }, []); 
  
  return (<div>
    <div>
        <Card>
            <CardHeader>By Compartment</CardHeader>
            <CardBody>
                <div className="input-container-1column">
                    {tree ? <LCSTreeComponent data={tree} /> : ""}
                </div>
            </CardBody>
        </Card>
    </div>
  </div>);
};
