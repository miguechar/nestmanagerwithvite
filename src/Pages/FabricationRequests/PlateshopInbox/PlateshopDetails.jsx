import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";

export const PlateShopDetails = ({ selectedFabReq, updateParentState }) => {
  const [fabreq, setFabreq] = useState({
    dateRequiered: "",
    requestedBy: "",
    project: "",
    module: "",
    po: "",
    poName: "",
    shipTo: "",
    comp: "",
    materialProvided: "",
    materialLocation: "",
    dwg: "",
    sheetZone: "",
    ecnfcn: "",
    briefDescription: "",
    detailedInstructions: "",
    shopAssigned: "",
    dateCompleted: "",
    shopNotes: "",
    frNo: "",
    engineeredChecked: "yes",
    engineeringNotes: "",
    personWorked: "",
    personWorked1: "",
    personWorked2: "",
    operatorsWorked: [],
    hoursWorked: "",
    currentCount: "",
    select: true,
  });
  const [operators, setOperators] = useState([]);

  const fetchData = async () => {
    const operators = await getFB("/fabricationRequests/Operators/");

    if (Array.isArray(operators)) {
      setOperators(operators);
    }
  };

  useEffect(() => {
    setFabreq(selectedFabReq);
    fetchData();
  }, [selectedFabReq]);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Plate Shop Details</CardHeader>
          <CardBody>
            <div className="input-container-4column">
              <Select
                label="Shop Assigned to"
                selectedKeys={[fabreq.shopAssigned]}
                onChange={(e) => {
                  const updatedState = {
                    ...fabreq,
                    shopAssigned: e.target.value,
                  };
                  setFabreq(updatedState);
                  updateParentState(updatedState);
                }}>
                {operators.map((value) => (
                  <SelectItem value={value.clock} key={value.clock}>
                    {value.name + " - " + value.clock}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Date Completed"
                type="date"
                value={fabreq.dateCompleted}
                onChange={(e) => {
                  const updatedState = {
                    ...fabreq,
                    dateCompleted: e.target.value,
                  };
                  setFabreq(updatedState);
                  updateParentState(updatedState);
                }}
              />
              <Select
                label="Operator Worked 1"
                selectedKeys={[fabreq.personWorked1]}
                onChange={(e) => {
                  const updatedState = {
                    ...fabreq,
                    personWorked1: e.target.value,
                  };
                  setFabreq(updatedState);
                  updateParentState(updatedState);
                }}>
                {operators.map((value) => (
                  <SelectItem value={value.clock} key={value.clock}>
                    {value.name + " - " + value.clock}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Operator Worked 2"
                selectedKeys={[fabreq.personWorked2]}
                onChange={(e) => {
                  const updatedState = {
                    ...fabreq,
                    personWorked2: e.target.value,
                  };
                  setFabreq(updatedState);
                  updateParentState(updatedState);
                }}>
                {operators.map((value) => (
                  <SelectItem value={value.clock} key={value.clock}>
                    {value.name + " - " + value.clock}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Hours Worked"
                type="number"
                value={fabreq.hoursWorked}
                onChange={(e) => {
                  const updatedState = {
                    ...fabreq,
                    hoursWorked: e.target.value,
                  };
                  setFabreq(updatedState);
                  updateParentState(updatedState);
                }}
              />
              <Input
                label="Shop Notes"
                value={fabreq.shopNotes}
                onChange={(e) => {
                  const updatedState = {
                    ...fabreq,
                    shopNotes: e.target.value,
                  };
                  setFabreq(updatedState);
                  updateParentState(updatedState);
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
