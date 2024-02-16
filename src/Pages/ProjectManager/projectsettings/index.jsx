import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  BreadcrumbItem,
  Breadcrumbs
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import { useLocation } from "react-router-dom";
import { ProjectMaterial } from "./Material";
import { ProjectSTD } from "./STD";

export const SettingsBC = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/projectmanager">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projectmanager/settings">Settings</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export const ProjectSettings = () => {
  const [settings, setSettings] = useState([]);
  const location = useLocation();
  const data = location.state;

  async function fetchSettings() {
    const settings = await getFB(
      "Projects/" + data.data.full.uid + "/Settings/"
    );

    if (Array.isArray(settings)) {
      setSettings({
        projectpath: settings[0].projectpath,
      });
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);
  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>Project File</CardHeader>
          <CardBody>
            <div>
              <div>
                <Input label="Project Path" value={settings.projectpath} />
              </div>
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                <Button color="secondary">Update</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="input-container-1column">
        <Divider />
      </div>
      <div className="input-container-1column">
        <ProjectMaterial moduleUid = {data.data.full.uid}/>
      </div>
      <div className="input-container-1column">
        <ProjectSTD moduleUid = {data.data.full.uid}/>
      </div>
    </div>
  );
};
