import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Dialog from "../../../Components/Common/Dialog";

export const ToDo = ({ proj }) => {
  const [project, setProject] = useState([]);
  const [modules, setModules] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  });

  function handleDialogClose() {
    setDialog({ ...Dialog, open: false });
  }

  function handleCreateToDo() {
    var task = "";
    var module = "";

    const body = (
      <div>
        <div>
          <Input
            label="Task"
            onChange={(e) => {
              task = e.target.value;
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Select
            label="Module Assigned"
            onChange={(e) => {
              module = e.target.value;
            }}>
            {project.Modules.map((value) => (
              <SelectItem
                value={value.moduleName}
                key={value.moduleName}
                textValue={value.moduleName}>
                {value.moduleName}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    );
    const footer = (
      <div>
        <div>
          <Button color="primary" onClick={() => createTodo(task, module)}>
            Create Project
          </Button>
        </div>
      </div>
    );

    setDialog({
      open: true,
      title: "Add To-Do",
      body: body,
      footer: footer,
    });
  }

  function createTodo(task, module) {}

  useEffect(() => {
    setProject(project);
    setModules(project.Modules);
  }, [project]);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <div
              className="flex gap-5"
              style={{ display: "flex", justifyItems: "space-between" }}>
              <p>To do</p>
            </div>
          </CardHeader>
          <CardBody>
            <div>
              <div>
                <Button radius="full" onClick={() => handleCreateToDo()}>
                  Add New
                </Button>
              </div>
            </div>
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
  );
};
