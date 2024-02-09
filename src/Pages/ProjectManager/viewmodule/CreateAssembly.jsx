import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { assyType, subModules } from "../pmmenuitems";
import { useState } from "react";
import { PartsListCreate } from "../../../Components/Common/PartsListCreate";
import { setFB } from "../../../Components/Global/functions/firebase";
import { useEffect } from "react";

export const CreateAssembly = ({ updateParent, module, project, moduleUid }) => {
  const [assembly, setAssembly] = useState({
    module: module,
    subModule: "",
    buildStage: "",
    assyType: "",
    assyNo: "",
    weight: "",
    progress: "",
    partsList: [],
    parentAssembly: ""
  });
  const [allAssemblies, setAllAssemblies] = useState([])

  function updatePartsList(partsList) {
    setAssembly({ ...assembly, partsList: partsList });
  }

  function handleAssemblySubmit() {
    const newAssembly = {
      ...assembly,
      assemblyName:
        assembly.module +
        assembly.subModule +
        "-" +
        assembly.buildStage +
        "-" +
        assembly.assyType +
        assembly.assyNo,
    };

    if(assembly.parentAssembly !== "") {
      const path = "Projects/" + project[0].uid + "/Modules/" + moduleUid + "/0/Assembly/" + newAssembly.parentAssembly 
      setFB(path, newAssembly)
      // console.log(path)
    }
    else if(assembly.subModule !== "" && assembly.buildStage !== "" && assembly.assyType !== "" && assembly.assyNo !== "") {
      // const path = "Projects/" + project[0].uid + "/Modules/" + moduleUid + "/0/Assembly/"
      // setFB(path, newAssembly)
      console.log("normal")
    }
  }

  function fetchParents() {
    const moduleAssemblies = (project.full.Modules[moduleUid]["0"].Assembly)
    
    var allModuleAssemblies = [];

    function processAssemblies(assemblyObj, currentPath = "") {
      Object.entries(assemblyObj).forEach(([uid, assemblyData]) => {
        const newPath = currentPath + uid + "/Assembly/"; // Update the path with the current UID
  
        // Add the current assembly to the array with its path
        allModuleAssemblies.push({ "name": assemblyData.assemblyName, "uid": assemblyData.uid, "path": newPath });
  
        // Check for children assemblies and process them recursively, passing the updated path
        if (assemblyData.Assembly && typeof assemblyData.Assembly === 'object') {
          processAssemblies(assemblyData.Assembly, newPath);
        }
      });
    }
  
    if (moduleAssemblies && typeof moduleAssemblies === 'object') {
      processAssemblies(moduleAssemblies);
    }
  
    setAllAssemblies(allModuleAssemblies); // Uncomment and use if you're setting state in a framework like React
    return allModuleAssemblies;
  }

  useEffect(() => {
    fetchParents()
  }, [])

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>
            {"Create Assembly " +
              assembly.module +
              assembly.subModule +
              "-" +
              assembly.buildStage +
              "-" +
              assembly.assyType +
              assembly.assyNo}
          </CardHeader>
          <CardBody>
            <div>
              <div className="input-container-6column">
                <Input label="Module" value={module} isDisabled />

                <Select
                  label="Submodule"
                  value={assembly.subModule}
                  onChange={(e) =>
                    setAssembly({ ...assembly, subModule: e.target.value })
                  }
                >
                  {subModules.map((value) => (
                    <SelectItem
                      key={value.value}
                      value={value.value}
                      textValue={value.value}
                    >
                      {value.value + "-" + value.name}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Build Stage"
                  value={assembly.buildStage}
                  onChange={(e) =>
                    setAssembly({ ...assembly, buildStage: e.target.value })
                  }
                >
                  <SelectItem key={"00"} value={"00"} textValue="00">
                    {"00"}
                  </SelectItem>
                  <SelectItem key={"01"} value={"01"} textValue="01">
                    {"01"}
                  </SelectItem>
                  <SelectItem key={"02"} value={"02"} textValue="02">
                    {"02"}
                  </SelectItem>
                </Select>

                <Select
                  label="Assy Letter"
                  onChange={(e) =>
                    setAssembly({ ...assembly, assyType: e.target.value })
                  }
                >
                  {assyType.map((value) => (
                    <SelectItem
                      key={value.value}
                      value={value.value}
                      textValue={value.value}
                    >
                      {value.value + "-" + value.name}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="Assy #"
                  onChange={(e) =>
                    setAssembly({ ...assembly, assyNo: e.target.value })
                  }
                />

                <Input
                  label="Weight"
                  endContent={"kg"}
                  onChange={(e) =>
                    setAssembly({ ...assembly, weight: e.target.value })
                  }
                />

                <Select
                  label="Progess"
                  value={assembly.progress}
                  onChange={(e) =>
                    setAssembly({ ...assembly, progress: e.target.value })
                  }
                >
                  <SelectItem
                    key={"Complete"}
                    value={"Complete"}
                    textValue={"Complete"}
                  >
                    {"Complete"}
                  </SelectItem>
                  <SelectItem
                    key={"Not Complete"}
                    value={"Not Complete"}
                    textValue={"Not Complete"}
                  >
                    {"Not Complete"}
                  </SelectItem>
                </Select>

                <Select
                  label="Parent"
                  value={assembly.parentAssembly}
                  onChange={(e) =>
                    setAssembly({ ...assembly, parentAssembly: e.target.value })
                  }
                >
                  {allAssemblies.map((value) => (
                    <SelectItem value={value.path} textValue={value.name} key={value.path}>
                      {value.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="input-container-1column">
        <Card>
          <CardHeader>Parts List</CardHeader>
          <CardBody>
            <PartsListCreate
              partsList={assembly.partsList}
              updatePartsList={updatePartsList}
            />
          </CardBody>
        </Card>
      </div>

      <div className="input-container-1column">
        <Button onClick={handleAssemblySubmit}>Submit Assembly</Button>
      </div>
    </div>
  );
};
