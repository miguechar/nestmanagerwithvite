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

export const EditFormEngineering = ({ allFabrequests, selectedFro }) => {
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
    engineeredChecked: "no",
    engineeringNotes: "",
    partsList: [],
    personWorked: "",
    personWorked1: "",
    personWorked2: "",
    hoursWorked: "",
    currentCount: "",
    select: true,
  });

  useEffect(() => {
    const selectedfab = allFabrequests.find((value) => value.frNo === selectedFro);
    if (selectedfab) {
      setFabreq(selectedfab);
    }
  }, [allFabrequests, selectedFro]); // Add dependencies to re-run the effect when they change
  

  return (
    <div>
      <Card>
      <CardHeader>{"Edit: " + fabreq.frNo + ", Requested by: " + fabreq.requestedBy}</CardHeader>
        <CardBody>
          <div>
            <div className="input-container-3column">
              <Input
                label={"Date Required"}
                type="date"
                value={fabreq.dateRequiered}
                onChange={(e) =>
                  setFabreq({ ...fabreq, dateRequiered: e.target.value })
                }
              />
              <Select
                label="Project"
                selectedKeys={[fabreq.project]}
                onChange={(e) =>
                  setFabreq({ ...fabreq, project: e.target.value })
                }>
                {hullOptions.map((value) => (
                  <SelectItem value={value.value} key={value.value}>
                    {value.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Module"
                selectedKeys={[fabreq.module]}
                onChange={(e) =>
                  setFabreq({ ...fabreq, module: e.target.value })
                }>
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
                onChange={(e) => setFabreq({ ...fabreq, po: e.target.value })}
              />
              <Input
                label={"PO Name"}
                value={fabreq.poName}
                onChange={(e) =>
                  setFabreq({ ...fabreq, poName: e.target.value })
                }
              />
              <Input
                label={"Ship To"}
                value={fabreq.shipTo}
                onChange={(e) =>
                  setFabreq({ ...fabreq, shipTo: e.target.value })
                }
              />
              <Input
                label={"Comp# (for paint)"}
                value={fabreq.comp}
                onChange={(e) => setFabreq({ ...fabreq, comp: e.target.value })}
              />
              <Select
                label={"Material Provided?"}
                value={fabreq.materialProvided}
                onChange={(e) =>
                  setFabreq({ ...fabreq, materialProvided: e.target.value })
                }>
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
                  onChange={(e) =>
                    setFabreq({ ...fabreq, materialLocation: e.target.value })
                  }
                />
              ) : (
                <div></div>
              )}
              <Input
                label={"Brief Description"}
                value={fabreq.briefDescription}
                onChange={(e) =>
                  setFabreq({ ...fabreq, briefDescription: e.target.value })
                }
              />
              <Input
                label={"Detailed Instructions"}
                value={fabreq.detailedInstructions}
                onChange={(e) =>
                  setFabreq({
                    ...fabreq,
                    detailedInstructions: e.target.value,
                  })
                }
              />
            </div>
            <div></div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
