import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import CustomizedTreeView from "../../../Components/Common/TreeView";
import { CreateAssembly } from "./CreateAssembly";

export const ViewModule = () => {
  // use location to get data from Project Manager Index.jsx
  const location = useLocation();
  const data = location.state;
  const [project, setProject] = useState({
    module: data.module,
    full: data.data,
    moduleUid: data.moduleUid,
  });
  const [newAssembly, setNewAssembly] = useState(false);
  const [treeData, setTreeData] = useState();

  function getValueClickedTree(value) {
    console.log(value);
  }

  function createTreeview() {
    // Initialize the data structure for the tree view
    const dataForTreeView = {
      [project.module]: {
        Assembly: {},
      },
    };
  
    // Function to recursively process assemblies and their children
    function processAssemblies(assemblyObj, parentObj) {
      Object.entries(assemblyObj).forEach(([uid, assemblyData]) => {
        const assemblyName = assemblyData.assemblyName;
        // Initialize the assembly node
        const node = { weight: assemblyData.weight };
  
        // Check for children assemblies
        if (assemblyData.Assembly && typeof assemblyData.Assembly === "object") {
          node.Children = {}; // Initialize children container
          processAssemblies(assemblyData.Assembly, node.Children); // Recursively process children
        }
  
        // Add the node to the parent object
        parentObj[assemblyName] = node;
      });
    }
  
    // Assuming your data structure contains the necessary module data
    const moduleAssemblies =
      project.full.full.Modules[project.moduleUid]["0"].Assembly; // Adjust based on actual data structure
  
    if (moduleAssemblies && typeof moduleAssemblies === "object") {
      processAssemblies(moduleAssemblies, dataForTreeView[project.module].Assembly);
    }
  
    console.log(dataForTreeView);
    setTreeData(dataForTreeView); // Uncomment and use if you're setting state in a framework like React
    return dataForTreeView;
  }

  useEffect(() => {
    createTreeview();
  }, []);

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>{data.module}</CardHeader>
          <CardBody>
            <div className="input-container-2column">
              <div>
                <Button color="primary" onClick={() => setNewAssembly(true)}>
                  Create Assembly
                </Button>
              </div>
              <div>
                {treeData ? (
                  <div>
                    <CustomizedTreeView
                      data={treeData}
                      moduleName={project.module}
                      updateParent={getValueClickedTree}
                    />
                  </div>
                ) : (
                  <p>loading...</p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {newAssembly ? (
        <CreateAssembly
          module={project.module}
          project={data.data}
          moduleUid={data.moduleUid}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};
