import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFB, setFB } from "../../../../Components/Global/functions/firebase";
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

export const STDClosure = ({ projectUID }) => {
  const [standardParts, setStandardParts] = useState([]);
  const [standardDetail, setStandardDetail] = useState([]);
  const [standardBT, setStandardBT] = useState([]);
  const [newStandardParts, setNewStandardPart] = useState({
    std: "",
    stock: "",
    name: "",
    lap: "",
    lappedTee: "",
    type: "collarplate"
  });

  async function fetchStandardParts() {
    const standardPartsPath = "Projects/" + projectUID + "/StandardParts";
    const standardParts = await getFB(standardPartsPath);
    setStandardParts(standardParts);

    const standardDetailPath = "Projects/" + projectUID + "/StandardDetail";
    const standardDetails = await getFB(standardDetailPath);
    setStandardDetail(standardDetails);

    const standardBT = "Projects/" + projectUID + "/standardBT";
    const projectBT = await getFB(standardBT);
    setStandardBT(projectBT);
  }

  function createPartName() {
    const first = newStandardParts.std.slice(0, 2); //cutout detail
    const second = newStandardParts.stock.slice(4, 5); //thickness detail
    const third = ""; //

    const partName =
      first +
      second +
      third +
      " " +
      (newStandardParts.tee ? newStandardParts.tee : "");
    setNewStandardPart({ ...newStandardParts, name: partName });
  }

  function createStock() {
    if (newStandardParts.lappedTee !== "" && newStandardParts.std !== "") {
      const teeSelected = standardBT.filter(
        (value) => value.bt === newStandardParts.lappedTee
      );
      const webThickness = teeSelected[0].webth;
      const fractionString = webThickness.replace('"', "");
      const [numerator, denominator] = fractionString.split("/").map(Number);
      const decimalInches = numerator / denominator;
      let mm = decimalInches * 25.4;
  
      const penWebTh = parseFloat(mm.toFixed(2));
  
      const selectedSTD = standardDetail.filter((value) => value.viewport === newStandardParts.std);
      if (selectedSTD.length > 0) {
        // Assuming selectedSTD[0] contains the lap variables
        let lapValue = null;
        
        // Check the range and assign the appropriate lap value
        if (penWebTh >= 0 && penWebTh <= 6.4) {
          lapValue = selectedSTD[0].lap064;
        } else if (penWebTh >= 6.5 && penWebTh <= 15.9) {
          lapValue = selectedSTD[0].lap64159;
        } else if (penWebTh >= 16.0 && penWebTh <= 25.4) {
          lapValue = selectedSTD[0].lap159254;
        }
  
        // get stock value
        const stock = "13E0" + numerator + "0"
        setNewStandardPart({...newStandardParts, lap: lapValue, stock: stock})
        
      }
    }
  }
  
  function handleSubmitNewSTDPart () {
    setFB("Projects/" + projectUID + "/StandardParts", newStandardParts)
  }

  useEffect(() => {
    fetchStandardParts();
  }, []);

  useEffect(() => {
    createPartName();
  }, [newStandardParts.std, newStandardParts.tee, newStandardParts.stock]);

  useEffect(() => {
    createStock();
  }, [newStandardParts.lappedTee, newStandardParts.std]);

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>
            {"Add Standard Part: " +
              (newStandardParts.name ? newStandardParts.name : "")}
          </CardHeader>
          <CardBody>
            <div>
              <div className="input-container-6column">
                <Select
                  label="Cut Out STD"
                  value={newStandardParts.std}
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
                      {value.viewport + " - " + value.title}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Tee"
                  value={newStandardParts.tee}
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      tee: e.target.value,
                    })
                  }>
                  {standardBT.map((value) => (
                    <SelectItem
                      value={value.bt}
                      key={value.bt}
                      textValue={value.bt}>
                      {value.bt}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Penatrated Tee"
                  key={"lappedTee"}
                  value={newStandardParts.lappedTee}
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      lappedTee: e.target.value,
                    })
                  }>
                  {standardBT.map((value) => (
                    <SelectItem
                      value={value.bt}
                      key={value.bt}
                      textValue={value.bt}>
                      {value.bt}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Stock"
                  value={newStandardParts.stock}
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      stock: e.target.value,
                    })
                  }
                />

                <Input
                  label="Lap"
                  value={newStandardParts.lap}
                  onChange={(e) =>
                    setNewStandardPart({
                      ...newStandardParts,
                      lap: e.target.value,
                    })
                  }
                />
              </div>
              <div style={{ margin: "10px" }}>
                <Divider />
              </div>
              <div>
                <Button color="primary" style={{ textAlign: "right" }} onClick={() => handleSubmitNewSTDPart()}>
                  Submit
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
