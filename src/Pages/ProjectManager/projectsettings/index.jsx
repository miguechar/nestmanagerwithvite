import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import { useLocation } from "react-router-dom";

export const ProjectSettings = () => {
  const [settings, setSettings] = useState([]);
  const location = useLocation();
  const data = location.state;

  async function fetchSettings() {
    const settings = await getFB(
      "Projects/" + data.data.full.uid + "/Settings/"
    );
    console.log(settings[0].projectpath);

    if (Array.isArray(settings)) {
      console.log(settings);
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
      <div>
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
        <div>
          <Divider />
        </div>
      </div>
    </div>
  );
};
