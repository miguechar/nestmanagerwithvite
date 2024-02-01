import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import RadioGroupComponent from "../../../Components/Common/RadioGroup";
import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";

export const RadioInbox = ({fabreq, updateParentState}) => {
  const [allFabReq, setAllFabReq] = useState(fabreq);
  const [nests, setNests] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectionChange = (newValue) => {
    setSelectedValue(newValue);
  };

  useEffect(() => {
    setAllFabReq(fabreq);
  }, [fabreq]);

  return (
    <div>
      <div >
        <Card>
          <CardHeader>Check Fab</CardHeader>
          <CardBody>
            <div>
              <div>
                {allFabReq
                  .sort((a, b) => {
                    const getSequentialNumber = (frNo) =>
                      parseInt(frNo.split("-").pop());
                    return (
                      getSequentialNumber(b.frNo) - getSequentialNumber(a.frNo)
                    );
                  })
                  .map((value) => (
                    <div>
                      <RadioGroupComponent
                        title={value.frNo}
                        subtitle={
                          value.project +
                          (value.module ? ", " + value.module : "") + 
                          (value.partsList ? ", " + value.partsList.length + " parts" : "")
                        }
                        selectedValue={selectedValue}
                        onSelectionChange={handleSelectionChange}
                      />
                    </div>
                  ))}
              </div>
              {selectedValue ? (
                <div
                  className="w-full flex justify-between gap-2"
                  style={{ marginTop: "10px" }}>
                  <Button color="danger" onClick={() => setSelectedValue("")}>
                    Clear
                  </Button>
                  <Button color="primary" onClick={() => updateParentState(selectedValue)}>Check</Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
