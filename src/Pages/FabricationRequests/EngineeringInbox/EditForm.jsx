import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { hullOptions, ffgModules } from "../../../Components/Global/MenuItems";

export const EditFormEngineering = ({ selectedFabReq, updateParentState }) => {
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
    hoursWorked: "",
    currentCount: "",
    select: true,
  });

  useEffect(() => {
    setFabreq(selectedFabReq);
  }, [selectedFabReq]);

  return (
    <div>
      <Card>
        <CardHeader>
          {"Edit: " + fabreq.frNo + ", Requested by: " + fabreq.requestedBy}
        </CardHeader>
        <CardBody>
          <div>
            <div className="input-container-3column">
              <Input
                label={"Date Required"}
                type="date"
                value={fabreq.dateRequiered}
                onChange={(e) => {
                  const updatedState = {
                    ...fabreq,
                    dateRequiered: e.target.value,
                  };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}
              />
              <Select
                label="Project"
                selectedKeys={[fabreq.project]}
                onChange={(e) => {
                  const updatedState = { ...fabreq, project: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}>
                {hullOptions.map((value) => (
                  <SelectItem value={value.value} key={value.value}>
                    {value.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Module"
                selectedKeys={[fabreq.module]}
                onChange={(e) => {
                  const updatedState = { ...fabreq, module: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}>
                {ffgModules.map((value) => (
                  <SelectItem value={value.name} key={value.name}>
                    {value.name}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label={"PO"}
                type="number"
                value={fabreq.po}
                onChange={(e) => {
                  const updatedState = { ...fabreq, po: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}
              />
              <Input
                label={"PO Name"}
                value={fabreq.poName}
                onChange={(e) => {
                  const updatedState = { ...fabreq, poName: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}
              />
              <Input
                label={"Ship To"}
                value={fabreq.shipTo}
                onChange={(e) => {
                  const updatedState = { ...fabreq, shipTo: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}
              />
              <Input
                label={"Comp# (for paint)"}
                value={fabreq.comp}
                onChange={(e) => {
                  const updatedState = { ...fabreq, comp: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}
              />
              <Select
                label={"Material Provided?"}
                value={fabreq.materialProvided}
                onChange={(e) => {
                  const updatedState = { ...fabreq, materialProvided: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}>
                <SelectItem value={"Yes"} key={"Yes"}>
                  Yes
                </SelectItem>
                <SelectItem value={"No"} key={"No"}>
                  No
                </SelectItem>
              </Select>
              {fabreq.materialProvided === "Yes" ? (
                <Input
                  label={"Material Location"}
                  value={fabreq.materialLocation}
                  onChange={(e) => {
                    const updatedState = { ...fabreq, materialLocation: e.target.value };
                    setFabreq(updatedState); // Update local state
                    updateParentState(updatedState); // Propagate changes to parent
                  }}
                />
              ) : (
                <div></div>
              )}
              <Input
                label={"Brief Description"}
                value={fabreq.briefDescription}
                onChange={(e) => {
                  const updatedState = { ...fabreq, briefDescription: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}
              />
              <Input
                label={"Detailed Instructions"}
                value={fabreq.detailedInstructions}
                onChange={(e) => {
                  const updatedState = { ...fabreq, detailedInstructions: e.target.value };
                  setFabreq(updatedState); // Update local state
                  updateParentState(updatedState); // Propagate changes to parent
                }}
              />
            </div>
            <div></div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
