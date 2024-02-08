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

export const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  });
  const [project, setProject] = useState({
    description: "",
    projectNo: "",
    module: [],
  });

  function handleDialogClose() {
    setDialog({ ...Dialog, open: false });
  }

  async function fetchProjects() {
    const projects = await getFB("Projects");

    if (localStorage.getItem("project") === "") {
      if (Array.isArray(projects)) {
        setProjects(projects);
      }
    } else {
      if (Array.isArray(projects)) {
        const currentProject = projects.filter(
          (value) => value.projectNo === localStorage.getItem("project")
        );
        const inside = currentProject[0];
        setProject({
          description: currentProject[0].projectDescription,
          projectNo: currentProject[0].projectNo,
          module: currentProject[0].module,
        });
        console.log(currentProject[0].module);
      }
    }
  }

  function handleCreateProjectDialog() {
    var projectNo = "";
    var projectDescription = "";

    const body = (
      <div>
        <div>
          <Input
            label="Project Number"
            onChange={(e) => {
              projectNo = e.target.value;
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Input
            label="Project Description"
            onChange={(e) => {
              projectDescription = e.target.value;
            }}
          />
        </div>
      </div>
    );
    const footer = (
      <div>
        <div>
          <Button
            color="primary"
            onClick={() => createProject(projectNo, projectDescription)}>
            Create Project
          </Button>
        </div>
      </div>
    );

    setDialog({
      open: true,
      title: "Create New Project",
      body: body,
      footer: footer,
    });
  }

  function createProject(projectNo, projectDescription) {
    const projectData = {
      projectNo: projectNo,
      projectDescription: projectDescription,
    };

    setFB("Projects/", projectData);
    handleDialogClose();
  }

  async function handleProjectSelect(Project) {
    localStorage.setItem("project", Project);

    const currentProject = projects.filter(
      (value) => value.projectNo === Project
    );
    setProject(currentProject);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      {localStorage.getItem("project") ? (
        <div>
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <Button
              color="primary"
              onClick={() => localStorage.setItem("project", "")}>
              Change Project
            </Button>
          </div>
          <div className="input-container-1column">
            <Card>
              <CardHeader>
                Project: {localStorage.getItem("project")}
              </CardHeader>
              <CardBody>
                <div className="input-container-2column">
                  <div>
                    <p>{project.description}</p>
                  </div>
                  <div>
                    {/* {project.module.map((value) => (
                        <div></div>
                    ))} */}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div>
            
          </div>
        </div>
      ) : (
        <div>
          <div className="input-container-2column">
            <Card>
              <CardHeader>Select Project</CardHeader>
              <CardBody>
                <div>
                  <div>
                    <Select
                      label="Select Project"
                      onChange={(e) => handleProjectSelect(e.target.value)}>
                      {projects.map((value) => (
                        <SelectItem
                          key={value.projectNo}
                          value={value.projectNo}
                          textValue={value.projectNo}>
                          <div className="flex flex-col">
                            <span className="text-small">
                              {value.projectNo}
                            </span>
                            <span className="text-tiny text-default-400">
                              {value.projectDescription}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Create Project</CardHeader>
              <CardBody>
                <Button color="primary" onClick={handleCreateProjectDialog}>
                  Create Project
                </Button>
              </CardBody>
            </Card>
          </div>
          <div>
            <Dialog
              open={dialog.open}
              onClose={handleDialogClose}
              title={dialog.title}
              body={dialog.body}
              footer={dialog.footer}
            />
          </div>
        </div>
      )}
    </div>
  );
};
