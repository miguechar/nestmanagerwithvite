import {
  Card,
  CardHeader,
  CardBody,
  Select,
  Button,
  Input,
  SelectItem,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getFB, setFB } from "../../Components/Global/functions/firebase";
import Dialog from "../../Components/Common/Dialog";
import { CreateModule } from "./dashboard/CreateModule";
import { ToDo } from "./dashboard/ToDo";
import { ChevronRightIcon } from "../../Components/icons/ChevronRightIcon";
import { useNavigate } from "react-router-dom";
import { ProjectMaterial } from "./projectsettings/Material";

export const ProjectManagerBC = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/projectmanager">Home</BreadcrumbItem>
    </Breadcrumbs>
  );
};

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

    const moduleNames = Object.values(getCurProj[0].Modules).map((module) => ({
      name: module.moduleName,
      uid: module.uid,
    }));

    setProject({
      ...project,
      full: getCurProj[0],
      modules: moduleNames,
    });
  }

  function goToViewModule(module, moduleUid) {
    navigate("/projectmanager/viewmodule", {
      state: { module: module, data: project, moduleUid: moduleUid },
    });
  }

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div>
      <div style={{ textAlign: "right", marginRight: "9px" }}>
        <Button
          onClick={() =>
            navigate("/projectmanager/settings", { state: { data: project } })
          }>
          Settings
        </Button>
      </div>
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
                {project.modules.map((value, index) => (
                  <div style={{ marginTop: "10px" }}>
                    <Card key={index}>
                      <CardHeader>
                        <div
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                            width: "100%",
                          }}>
                          {value.name}
                          <Button
                            color="secondary"
                            radius="full"
                            endContent={<ChevronRightIcon />}
                            onClick={() =>
                              goToViewModule(value.name, value.uid)
                            }>
                            View
                          </Button>
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
        <div>
          <CreateModule proj={project} />
        </div>
        <div>
          <Card>
            <CardHeader>Inventory</CardHeader>
            <CardBody>
              <div>
                <Button
                  radius="full"
                  onClick={() =>
                    navigate("/projectmanager/inventory", {
                      state: { data: project },
                    })
                  }>
                  Go To Inventory
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>Standard Parts</CardHeader>
            <CardBody>
              <div>
                <Button
                  radius="full"
                  onClick={() =>
                    navigate("/projectmanager/standardparts", {
                      state: { data: project },
                    })
                  }>
                  Go To Standard Parts
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
