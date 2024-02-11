import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import CustomizedTreeView from "../../../Components/Common/TreeView";
import { CreateAssembly } from "./CreateAssembly";
import { CreateStructure } from "./CreateStructure";
import { getFB } from "../../../Components/Global/functions/firebase";

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
  const [newStructure, setNewStructure] = useState(false);
  const [treeData, setTreeData] = useState();
  const [selectedAssembly, setSelectedAssembly] = useState("");

  function getValueClickedTree(value) {
    setSelectedAssembly(value);
    console.log(value);
  }

  function handleEditAssembly() {}

  function createTreeview() {
    // Initialize the data structure for the tree view
    const dataForTreeView = {
      [project.module]: {
        Assembly: {},
        Structure: {
          Frame: {},
        },
      },
    };

    // Function to recursively process assemblies and their children
    function processAssemblies(assemblyObj, parentObj) {
      Object.entries(assemblyObj).forEach(([uid, assemblyData]) => {
        const assemblyName = assemblyData.assemblyName;
        // Initialize the assembly node
        const node = { weight: assemblyData.weight };

        // Check for children assemblies
        if (
          assemblyData.Assembly &&
          typeof assemblyData.Assembly === "object"
        ) {
          node.Children = {}; // Initialize children container
          processAssemblies(assemblyData.Assembly, node.Children); // Recursively process children
        }

        // Add the node to the parent object
        parentObj[assemblyName] = node;
      });
    }

    function processFrameData(structureObj, parentObj) {
      Object.entries(structureObj).forEach(([uid, structureData]) => {
        const structure = structureData.description;
        const node = { Description: structureData.description };

        if (
          structureData.assemblies &&
          typeof structureData.assemblies === "object"
        ) {
          node.Assemblies = {};
          processFrameData(structureData.assemblies, node.Assemblies);
        }
        parentObj[structure] = node;
      });
    }

    // Assuming your data structure contains the necessary module data
    const moduleAssemblies =
      project.full.full.Modules[project.moduleUid]["0"].Assembly; // Adjust based on actual data structure

    const FrameList =
      project.full.full.Modules[project.moduleUid]["0"].Structure.Frame;

    if (moduleAssemblies && typeof moduleAssemblies === "object") {
      processAssemblies(
        moduleAssemblies,
        dataForTreeView[project.module].Assembly
      );
    }

    if (FrameList && typeof FrameList === "object") {
      processFrameData(
        FrameList,
        dataForTreeView[project.module].Structure.Frame
      );
    }

    setTreeData(dataForTreeView); // Uncomment and use if you're setting state in a framework like React
    return dataForTreeView;
  }

  async function fetchProject() {
    const projectUid = data.data.full.uid;
    const moduleUid = data.moduleUid;
    const path = "Projects/" + projectUid;
    console.log(project.full);
    const project = await getFB(path);
    setProject({ ...project, full: project });
  }

  function handleStructureCreated(value) {
    fetchProject();
    setNewStructure(false);
  }

  function handleAssemblyCreated(value) {
    fetchProject();
    setNewAssembly(false);
  }

  useEffect(() => {
    createTreeview();
    fetchProject();
  }, []);

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>{data.module}</CardHeader>
          <CardBody>
            <div className="input-container-2column">
              <div style={{ gap: "10px", display: "flex" }}>
                <Button color="primary" onClick={() => setNewAssembly(true)}>
                  Create Assembly
                </Button>
                <Button color="primary" onClick={() => setNewStructure(true)}>
                  {"Create Structure DWG"}
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
          updateParent={handleAssemblyCreated}
        />
      ) : (
        <div></div>
      )}
      {newStructure ? (
        <CreateStructure
          module={project.module}
          project={data.data}
          moduleUid={data.moduleUid}
          updateParent={handleStructureCreated}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};
