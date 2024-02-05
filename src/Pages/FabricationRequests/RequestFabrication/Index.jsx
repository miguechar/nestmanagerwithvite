import { useState, useEffect } from "react";
import { getTodayDate } from "../../../Components/Global/functions/firebase";
import { getFB } from "../../../Components/Global/functions/firebase";
import { auth } from "../../../Config";
import moment from "moment";
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ffgModules, hullOptions } from "../../../Components/Global/MenuItems";
import { PartsListCreate } from "../../../Components/Common/PartsListCreate";
import { AutoFillFromPrevNest } from "./AutoFillFromPrevNest";
import { SubmitRequest } from "./SubmitRequest";

export const RequestFab = () => {
  const date = getTodayDate();
  const [nests, setNests] = useState([]);
  const [fabreq, setFabreq] = useState({
    date: date,
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
    sentToFloor: "no",
    newCount: "",
  });

  function updatePartsList(newPartsList) {
    setFabreq({ ...fabreq, partsList: newPartsList });
  }

  function updateNestData(newState) {
    setFabreq({});

    var createdPartsList = [];
    for (let i = 0; i < newState.partsList.length; i++) {
      const current = newState.partsList[i];
      createdPartsList.push({ ...current, path: newState.tempPath });
    }

    setFabreq({
      ...fabreq,
      project: newState.project,
      po: newState.po,
      shipTo: newState.shipTo ? newState.shipTo : "-",
      engineeringNotes: newState.engineeringNotes,
      partsList: createdPartsList,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const count = await getFB("fabricationRequests/count");
      const nests = await getFB("nests");

      var date = moment();
      var monthYear = date.format("YYYY-MM");
      const newCount = parseInt(count) + 1;
      const frNo = "FR " + monthYear + "-" + newCount;

      if (Array.isArray(count)) {
        setFabreq({
          ...fabreq,
          frNo: frNo,
          currentCount: count,
          requestedBy: auth?.currentUser?.email,
          newCount: newCount,
        });
      }
      if (Array.isArray(nests)) {
        setNests(nests);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>Auto Complete from Min-Nest (Optional)</CardHeader>
          <CardBody>
            <AutoFillFromPrevNest updateParentState={updateNestData} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>{"Fab Request Form: " + fabreq.frNo + " *new*"}</CardHeader>
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
                  onChange={(e) =>
                    setFabreq({ ...fabreq, comp: e.target.value })
                  }
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
                    label={"Comp# (for paint)"}
                    value={fabreq.comp}
                    onChange={(e) =>
                      setFabreq({ ...fabreq, comp: e.target.value })
                    }
                  />
                ) : (
                  <div></div>
                )}
                <Input
                  label={"DWG"}
                  value={fabreq.dwg}
                  onChange={(e) =>
                    setFabreq({ ...fabreq, dwg: e.target.value })
                  }
                />
                <Input
                  label={"Sheet/Zone"}
                  value={fabreq.sheetZone}
                  onChange={(e) =>
                    setFabreq({ ...fabreq, sheetZone: e.target.value })
                  }
                />
                <Input
                  label={"ECN / FCN"}
                  value={fabreq.ecnfcn}
                  onChange={(e) =>
                    setFabreq({ ...fabreq, ecnfcn: e.target.value })
                  }
                />
              </div>
              <div className="input-container-2column">
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
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Parts List</CardHeader>
          <CardBody>
            <PartsListCreate
              partsList={fabreq.partsList}
              updatePartsList={updatePartsList}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Submit</CardHeader>
          <CardBody>
            <SubmitRequest fabreq={fabreq} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
