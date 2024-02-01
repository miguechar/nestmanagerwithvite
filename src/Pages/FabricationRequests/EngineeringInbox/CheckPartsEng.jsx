import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";

export const CheckPartsEng = ({ allFabrequests, selectedFro }) => {
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

  const [nests, setNests] = useState([]);

  const handlePathChange = (e, index) => {
    const updatedPartsList = [...fabreq.partsList];
    updatedPartsList[index] = {
      ...updatedPartsList[index],
      path: e.target.value,
    };
    setFabreq({
      ...fabreq,
      partsList: updatedPartsList,
    });
  };

  useEffect(() => {
    const selectedfab = allFabrequests.find(
      (value) => value.frNo === selectedFro
    );
    if (selectedfab) {
      setFabreq(selectedfab);
    }
  }, [allFabrequests, selectedFro]);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Add WE Nest or Path</CardHeader>
          <CardBody>
            <div>
              <div>
                {fabreq.partsList.length > 0 ? (
                  <div>
                    {fabreq.partsList.map((value, index) => (
                      <div key={index}>
                        <p variant="h5">{value.name + ", qty: " + value.qty}</p>
                        <Input
                          variant="filled"
                          label="Path"
                          style={{ width: 650 }}
                          value={value.path ? value.path : ""}
                          onChange={(e) => handlePathChange(e, index)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>Add Path</p>
                    <Input
                      label="Path"
                      variant="filled"
                      style={{ width: 650 }}
                      onChange={(e) =>
                        setFabreq({ ...fabreq, path: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
