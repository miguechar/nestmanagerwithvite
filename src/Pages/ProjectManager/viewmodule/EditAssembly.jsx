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
import {
  getFB,
  setFB,
  updateFB,
} from "../../../Components/Global/functions/firebase";
import { useEffect } from "react";
import { PartsListCreate } from "../../../Components/Common/PartsListCreate";

export const EditAssembly = ({ assy, projectUID, updateParentTab }) => {
  const [assembly, setAssembly] = useState({
    assyName: assy[0] ? assy[0].assyName : "No Assy Selected",
    assyWeight: assy[0] ? assy[0].assyWeight : "No Assy Selected",
    assyProgress: assy[0] ? assy[0].assyProgress : "No Assy Selected",
    assyParent: assy[0] ? assy[0].assyParent : "No Assy Selected",
    module: assy[0] ? assy[0].module : "No Assy Selected",
    description: assy[0] ? assy[0].description : "No Assy Selected",
    partsList: assy[0] ? assy[0].partsList : "",
  });
  const [allAssemblies, setallAssemblies] = useState([]);

  async function getAssemblies() {
    const assemblies = await getFB("Projects/" + projectUID + "/Assemblies/");
    setallAssemblies(assemblies);
  }

  function handlePartsListChange(value) {
    if (value.length > 0) {
      setAssembly({ ...assembly, partsList: value });
    }
  }

  function handleUpdateAssy() {
    if (assembly.partsList) {
      updateFB(
        "Projects/" + projectUID + "/Assemblies/" + assy[0].uid,
        assembly
      );
    } else {
      const assyFB = {
        assyName: assembly.assyName,
        assyWeight: assembly.assyWeight,
        assyProgress: assembly.assyProgress,
        assyParent: assembly.assyParent,
        module: assembly.module,
        description: assembly.description,
      };
      updateFB("Projects/" + projectUID + "/Assemblies/" + assy[0].uid, assyFB);
    }

    updateParentTab({tab: "viewHierarchy"})
  }

  useEffect(() => {
    getAssemblies();
  }, []);

  return (
    <div className="input-container-1column">
      <Card>
        <CardHeader>{"Edit Assembly: " + (assy[0] ? assembly.assyName + " " + assy[0].uid : "")}</CardHeader>
        <CardBody>
          <div>
            <div className="input-container-6column">
              <Input
                label="Assy No."
                key={"assyNo"}
                value={assembly.assyName}
                onChange={(e) =>
                  setAssembly({ ...assembly, assyName: e.target.value })
                }
              />
              <Input
                label="Assy Weight"
                value={assembly.assyWeight}
                onChange={(e) =>
                  setAssembly({ ...assembly, assyWeight: e.target.value })
                }
              />
              <Input
                label="Progress"
                value={assembly.assyProgress}
                onChange={(e) =>
                  setAssembly({
                    ...assembly,
                    assyProgress: e.target.value,
                  })
                }
              />
              <Input
                label="Description"
                value={assembly.description}
                onChange={(e) =>
                  setAssembly({
                    ...assembly,
                    description: e.target.value,
                  })
                }
              />
              <Select
                label="Parent"
                selectedKeys={[assembly.assyParent]}
                onChange={(e) =>
                  setAssembly({ ...assembly, assyParent: e.target.value })
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
                partsList={assembly.partsList}
                updatePartsList={handlePartsListChange}
                formatType={"BOM"}
              />
            </div>

            <div>
              <Button color="primary" onClick={() => handleUpdateAssy()}>
                Update
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
