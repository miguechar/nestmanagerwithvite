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

export const ProjectManager = () => {
  const [project, setProject] = useState({
    full: [],
    modules: [],
  });

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
                <p>{project.full.projectDescription}</p>
              </div>
              <div>
                {project.modules.map((name, index) => (
                  <div style={{ marginTop: "10px" }}>
                    <Card key={index}>
                      <CardHeader>{name}</CardHeader>
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
