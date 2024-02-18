import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
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

export const StandardParts = () => {
  const [standardParts, setStandardParts] = useState([]);
  const [standardDetail, setStandardDetail] = useState([])
  const location = useLocation();
  const data = location.state;
  const [project, setProject] = useState({
    module: data.module,
    full: data.data,
    moduleUid: data.moduleUid,
  });
  const [newStandardParts, setNewStandardPart] = useState({
    std: "",
    stock: "",
    name: "",
    lap: "",
    width: "",
    height: "",
  });

  async function fetchStandardParts() {
    const projectUid = data.data.full.uid;
    const standardPartsPath = "Projects/" + projectUid + "/StandardParts";
    const standardParts = await getFB(standardPartsPath);
    setStandardParts(standardParts)

    const standardDetailPath = "Projects/" + projectUid + "/StandardDetail";
    const standardDetails = await getFB(standardDetailPath);
    setStandardDetail(standardDetails)
  }

  const std = [
    {
      name: "STD-6B",
    },
  ];

  const stock = [
    {
      name: "13E060",
    },
  ];

  const tee = [
    {
      name: "BT075-20",
    },
  ];

  function createPartName() {
    const first = newStandardParts.std.slice(4,5); //cutout detail
    const second =  "" //thickness detail
    const third = ""; //

    const partName = first + second + third + (newStandardParts.tee ? newStandardParts.tee : "");
    setNewStandardPart({...newStandardParts, name: partName})
  }

  useEffect(() => {
    fetchStandardParts();
  }, []);

  useEffect(() => {
    createPartName()
  }, [newStandardParts])

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>{"Add Standard Part: " + (newStandardParts.name? newStandardParts.name : "")}</CardHeader>
          <CardBody>
            <div>
              <p>Hello</p>
              <div className="input-container-6column">
                <Select
                  label="Cut Out STD"
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      std: e.target.value,
                    })
                  }>
                  {standardDetail.map((value) => (
                    <SelectItem
                      value={value.viewport}
                      key={value.viewport}
                      textValue={value.viewport}>
                      {value.viewport}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Stock"
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      stock: e.target.value,
                    })
                  }>
                  {stock.map((value) => (
                    <SelectItem
                      value={value.name}
                      key={value.name}
                      textValue={value.name}>
                      {value.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Tee"
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      tee: e.target.value,
                    })
                  }>
                  {tee.map((value) => (
                    <SelectItem
                      value={value.name}
                      key={value.name}
                      textValue={value.name}>
                      {value.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Lap"
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      lap: e.target.value,
                    })
                  }
                />
                <Input
                  label="Width"
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      width: e.target.value,
                    })
                  }
                />
                <Input
                  label="Height"
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      height: e.target.value,
                    })
                  }
                />
              </div>
              <div style={{margin: "10px"}} >
                <Divider/>
              </div>
              <div>
                <Button color="primary" style={{textAlign: "right"}} >Submit</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
