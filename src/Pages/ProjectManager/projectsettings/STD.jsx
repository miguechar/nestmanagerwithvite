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

export const ProjectSTD = ({ moduleUid }) => {
  const [standardDetail, setStandardDetail] = useState([]);
  const [newStandardDetail, setNewStandardDetail] = useState({
    viewport: "",
    category: "",
    title: ""
  });

  async function fetchStandardDetails() {
    const path = "Projects/" + moduleUid + "/StandardDetail";
    const standardDetail = await getFB(path);
    setStandardDetail(standardDetail);
  }

  function handleTableClick(value) {
    console.log(value);
  }

  function handleNewStandardDetail() {
    setFB("Projects/" + moduleUid + "/StandardDetail", newStandardDetail);
    setNewStandardDetail([]);
    fetchStandardDetails();
  }

  const initialColumns = [    
    "title",
    "viewport",
    "category",
  ];

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "Title", uid: "title", sortable: true },
    { name: "Viewport", uid: "viewport", sortable: true },
    { name: "Category", uid: "category", sortable: true },
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
    fetchStandardDetails();
  }, []);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Standard Details</CardHeader>
          <CardBody>
            <div>
              <div className="input-container-6column">
                <Input
                  label="Viewport"
                  onChange={(e) =>
                    setNewStandardDetail({
                      ...newStandardDetail,
                      viewport: e.target.value,
                    })
                  }
                />
                <Select
                  label="Category"
                  onChange={(e) =>
                    setNewStandardDetail({
                      ...newStandardDetail,
                      category: e.target.value,
                    })
                  }
                >
                  {category.map((value) => (
                    <SelectItem
                      key={value.name}
                      value={value.name}
                      textValue={value.name}
                    >
                      {value.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Title"
                  onChange={(e) =>
                    setNewStandardDetail({
                      ...newStandardDetail,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <Button color="primary" onClick={() => handleNewStandardDetail()}>
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
                  rows={standardDetail.length > 0 ? standardDetail : []}
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
