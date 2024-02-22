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
import { useEffect } from "react";
import { useState } from "react";
import { getFB, setFB } from "../../../Components/Global/functions/firebase";
import { useLocation } from "react-router-dom";
import DataTable from "../../../Components/Common/DataTable/Index";

export const ProjectBT = ({ moduleUid }) => {
  const [standardbt, setstandardbt] = useState([]);
  const [newbt, setnewbt] = useState({
    flangeTh: "",
    flangew: "",
    webTh: "",
    webw: "",
  });

  async function fetchStandardBT() {
    const path = "Projects/" + moduleUid + "/standardBT";
    const standardBT = await getFB(path);
    setstandardbt(standardBT);
  }

  function handleTableClick(value) {
    console.log(value);
  }

  function handleNewBT() {
    setFB("Projects/" + moduleUid + "/standardBT", newbt);
    setnewbt([]);
    fetchStandardBT();
  }

  const initialColumns = ["bt", "flangeth", "flangew", "webth", "webw", "webth"];

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "BT", uid: "bt", sortable: true },
    { name: "FL Th", uid: "flangeth", sortable: true },
    { name: "FL W", uid: "fangew", sortable: true },
    { name: "W Th", uid: "webth", sortable: true },
    { name: "W W", uid: "webw", sortable: true },
  ];

  const category = [
    {
      name: "Chock",
    },
    {
      name: "Collar Plate",
    },
    {
      name: "Stiffener Cutout",
    },
    {
      name: "Profile Ending",
    },
  ];

  useEffect(() => {
    fetchStandardBT();
  }, []);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Standard BT</CardHeader>
          <CardBody>
            <div>
              <div className="input-container-6column">
                <Input
                  label="BT"
                  onChange={(e) =>
                    setnewbt({
                      ...newbt,
                      bt: e.target.value,
                    })
                  }
                />
                <Input
                  label="Flange Thickness"
                  onChange={(e) =>
                    setnewbt({
                      ...newbt,
                      flangeTh: e.target.value,
                    })
                  }
                />
                <Input
                  label="Flange Width"
                  onChange={(e) =>
                    setnewbt({
                      ...newbt,
                      flangew: e.target.value,
                    })
                  }
                />
                <Input
                  label="Web Thickness"
                  onChange={(e) =>
                    setnewbt({
                      ...newbt,
                      webTh: e.target.value,
                    })
                  }
                />
                <Input
                  label="Web Width"
                  onChange={(e) =>
                    setnewbt({
                      ...newbt,
                      webw: e.target.value,
                    })
                  }
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <Button color="primary" onClick={() => handleNewBT()}>
                  Enter
                </Button>
              </div>
              <div style={{ margin: "10px" }}>
                <Divider />
              </div>
              <div>
                <DataTable
                  initialColumns={initialColumns}
                  columns={columns}
                  rows={standardbt.length > 0 ? standardbt : []}
                  updateParent={handleTableClick}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
