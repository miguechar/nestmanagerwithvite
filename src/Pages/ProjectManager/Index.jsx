import {
  Card,
  CardHeader,
  CardBody,
  Select,
  Button,
  Input,
  SelectItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getFB, setFB } from "../../Components/Global/functions/firebase";
import Dialog from "../../Components/Common/Dialog";
import { CreateModule } from "./dashboard/CreateModule";
import { ToDo } from "./dashboard/ToDo";
import { ChevronRightIcon } from "../../Components/icons/ChevronRightIcon";
import { useNavigate } from "react-router-dom";

export const ProjectManager = () => {
  const [project, setProject] = useState({
    full: [],
    modules: [],
  });
  const navigate = useNavigate();

  async function fetchProject() {
    const project = await getFB("Projects/");

    const getCurProj = project.filter(
      (value) => value.projectNo === localStorage.getItem("project")
    );
    const moduleNames = Object.values(getCurProj[0].Modules).map(
      (module) => module.moduleName
    );

    setProject({
      ...project,
      full: getCurProj[0],
      modules: moduleNames,
    });
  };

  function goToViewModule(module) {
    navigate("/projectmanager/viewmodule", {state: { module: module, data: project}})
  }

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>
            {"Project " + localStorage.getItem("project")}
          </CardHeader>
          <CardBody>
            <div className="input-container-2column">
              <div>
                <p>Overview:</p>
                <p>{project.full.projectDescription}</p>
                <p>{project.modules.length + " modules"}</p>
                <p>Gross Tonnage: 0t</p>
              </div>
              <div>
                {project.modules.map((name, index) => (
                  <div style={{ marginTop: "10px" }}>
                    <Card key={index}>
                      <CardHeader>
                        <div style={{ justifyContent: "space-between", display:"flex",width: "100%"}}>
                          {name}
                          <Button color="secondary" radius="full" endContent={<ChevronRightIcon/>} onClick={() => goToViewModule(name)}>View</Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="input-container-3column">
        <CreateModule proj={project} />
      </div>
    </div>
  );
};
