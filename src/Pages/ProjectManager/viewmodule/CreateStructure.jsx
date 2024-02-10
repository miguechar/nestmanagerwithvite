import {
  Card,
  CardHeader,
  CardBody,
  Select,
  SelectItem,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { structureType } from "../pmmenuitems";
import { useEffect } from "react";
import RadioGroupComponent from "../../../Components/Common/RadioGroup";
import CheckBoxList from "../../../Components/Common/CheckBoxList";
import { setFB } from "../../../Components/Global/functions/firebase";

export const CreateStructure = ({
  updateParent,
  module,
  project,
  moduleUid,
}) => {
  const [structure, setStructure] = useState({
    type: "",
    description: "",
    assemblies: [],
  });
  const [allAssemblies, setAllAssemblies] = useState([]);
  const [selectedAssembly, setSelectedAssembly] = useState([]);

  function fetchParents() {
    const moduleAssemblies = project.full.Modules[moduleUid]["0"].Assembly;

    var allModuleAssemblies = [];

    function processAssemblies(assemblyObj, currentPath = "") {
      Object.entries(assemblyObj).forEach(([uid, assemblyData]) => {
        const newPath = currentPath + uid + "/Assembly/"; // Update the path with the current UID

        // Add the current assembly to the array with its path
        allModuleAssemblies.push({
          name: assemblyData.assemblyName,
          uid: assemblyData.uid,
          path: newPath,
          progress: assemblyData.progress,
          buildStage: assemblyData.buildStage,
        });

        // Check for children assemblies and process them recursively, passing the updated path
        if (
          assemblyData.Assembly &&
          typeof assemblyData.Assembly === "object"
        ) {
          processAssemblies(assemblyData.Assembly, newPath);
        }
      });
    }

    if (moduleAssemblies && typeof moduleAssemblies === "object") {
      processAssemblies(moduleAssemblies);
    }

    setAllAssemblies(allModuleAssemblies); // Uncomment and use if you're setting state in a framework like React
    return allModuleAssemblies;
  }

  function assemblySelection(value) {
    setStructure({ ...structure, assemblies: value });
  }

  function handleCreateStructure() {
    const path =
      "Projects/" +
      project[0].uid +
      "/Modules/" +
      moduleUid +
      "/0/Structure/" +
      structure.type;

    var assyList = []
    
    for (let i = 0; i < structure.assemblies.length; i++) {
      assyList.push({"description": structure.assemblies[i]})
    }

    const updatedStructure = {
      ...structure,
      assemblies: assyList
    }  
    setFB(path, updatedStructure);
  }

  useEffect(() => {
    fetchParents();
  }, [selectedAssembly]);

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>Create Structure</CardHeader>
          <CardBody>
            <div>
              <div className="input-container-2column">
                <div className="input-container-3column">
                  <Select
                    label="Structure Type"
                    value={structure.type}
                    onChange={(e) =>
                      setStructure({ ...structure, type: e.target.value })
                    }>
                    {structureType.map((value) => (
                      <SelectItem
                        key={value.value}
                        textValue={value.value}
                        value={value.value}>
                        {value.value}
                      </SelectItem>
                    ))}
                  </Select>
                  {structure.type === "Frame" ? (
                    <Input
                      label="Description"
                      value={structure.description}
                      onChange={(e) =>
                        setStructure({
                          ...structure,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <div></div>
                  )}
                  <div>
                    <Button
                      color="primary"
                      onClick={() => handleCreateStructure()}>
                      Submit
                    </Button>
                  </div>
                </div>

                <div>
                  <Card>
                    <CardBody>
                      <CheckBoxList
                        label={"Select Assemblies"}
                        data={allAssemblies}
                        updateparent={assemblySelection}
                      />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
