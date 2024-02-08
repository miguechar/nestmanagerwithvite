import { Card, CardBody, CardHeader, Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Dialog from "../../../Components/Common/Dialog";
import { setFB, updateFB } from "../../../Components/Global/functions/firebase";

export const moduleDetails = [
  {
    Structure: {
      Frame: {
        Framex: "-",
      },
      LngBhd: {
        LngBhdx: "-",
      },
      Deck: {
        Deckx: "-",
      },
    },
    Pipe: {
      Seachest: "-",
      "Ballast Water": "-",
      "Water Cooling": "-",
      "Plumbing Drains": "-",
    },
  },
];

export const CreateModule = ({ proj }) => {
  const [project, setProject] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  });

  function handleDialogClose() {
    setDialog({ ...Dialog, open: false });
  }

  function handleCreateModule() {
    var moduleName = "";
    var moduleDescription = "";

    const body = (
      <div>
        <div>
          <Input
            label="Module Name"
            onChange={(e) => {
              moduleName = e.target.value;
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Input
            label="Description"
            onChange={(e) => {
              moduleDescription = e.target.value;
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
            onClick={() => createModule(moduleName, moduleDescription)}>
            Create Project
          </Button>
        </div>
      </div>
    );

    setDialog({
      open: true,
      title: "Create Module",
      body: body,
      footer: footer,
    });
  }

  function createModule(moduleName, moduleDescription) {
    const newModule = {
      ...moduleDetails,
      moduleName: moduleName,
      moduleDescription: moduleDescription,
    };

    setFB("/Projects/" + project.uid + "/Modules/", newModule);
    handleDialogClose();
  }

  useEffect(() => {
    setProject(proj.full);
  }, [proj]);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <div
              className="flex gap-5"
              style={{ display: "flex", justifyItems: "space-between" }}>
              <p>New Module</p>
            </div>
          </CardHeader>
          <CardBody>
            <div>
              <div>
                <Button radius="full" onClick={() => handleCreateModule()}>
                  Create New Module
                </Button>
              </div>
              <div>
                {/* {modules.length > 0 ? (
                  modules.map((value) => <div></div>)
                ) : (
                  <div></div>
                )} */}
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
