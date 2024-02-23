import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { getFB, setFB } from "../../../Components/Global/functions/firebase";
import { useEffect } from "react";
import { PartsListCreate } from "../../../Components/Common/PartsListCreate";

export const CreateAssembly = ({ selectedModule, projectUID }) => {
  const [newAssembly, setNewAssembly] = useState({
    assyName: "",
    assyWeight: "",
    assyProgress: "",
    assyParent: "",
    module: selectedModule,
    description: "",
    partsList: [],
  });
  const [allAssemblies, setAllAssemblies] = useState([]);

  function handleNewAssy() {
    console.log(newAssembly)
    setFB("Projects/" + projectUID + "/Assemblies/", newAssembly);
    getAssemblies();
  }

  async function getAssemblies() {
    const assemblies = await getFB("Projects/" + projectUID + "/Assemblies/");
    setAllAssemblies(assemblies);
  }

  function handlePartsListChange(value) {
    setNewAssembly({ ...newAssembly, partsList: value });
  }

  useEffect(() => {
    getAssemblies();
  }, []);

  return (
    <div className="input-container-1column">
      <Card>
        <CardHeader>Create New Assembly</CardHeader>
        <CardBody>
          <div>
            <div className="input-container-6column">
              <Input
                label="Assy No."
                key={"assyNo"}
                value={newAssembly.assyName}
                onChange={(e) =>
                  setNewAssembly({ ...newAssembly, assyName: e.target.value })
                }
              />
              <Input
                label="Assy Weight"
                onChange={(e) =>
                  setNewAssembly({ ...newAssembly, assyWeight: e.target.value })
                }
              />
              <Input
                label="Progress"
                onChange={(e) =>
                  setNewAssembly({
                    ...newAssembly,
                    assyProgress: e.target.value,
                  })
                }
              />
              <Input
                label="Description"
                onChange={(e) =>
                  setNewAssembly({
                    ...newAssembly,
                    description: e.target.value,
                  })
                }
              />
              <Select
                label="Parent"
                onChange={(e) =>
                  setNewAssembly({ ...newAssembly, assyParent: e.target.value })
                }>
                {allAssemblies.map((value) => (
                  <SelectItem
                    value={value.uid}
                    key={value.uid}
                    textValue={value.assyName}>
                    {value.assyName}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div style={{ margin: "10px" }}>
              <Divider />
            </div>

            <div>
              <PartsListCreate
                partsList={newAssembly.partsList}
                updatePartsList={handlePartsListChange}
                formatType={"BOM"}
              />
            </div>

            <div>
              <Button color="primary" onClick={() => handleNewAssy()}>
                Submit
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

// "assemblies": {
//     "assemblyId1": {
//       "name": "Main Assembly",
//       "type": "assembly",
//       "parentId": null
//     },
//     "subassemblyId1": {
//       "name": "Subassembly A",
//       "type": "subassembly",
//       "parentId": "assemblyId1"
//     }
//   }

//   "parts": {
//     "partId1": {
//       "name": "Part A1",
//       "assemblyId": "subassemblyId1"
//     },
//     "partId2": {
//       "name": "Part A2",
//       "assemblyId": "subassemblyId1"
//     }
//   }
