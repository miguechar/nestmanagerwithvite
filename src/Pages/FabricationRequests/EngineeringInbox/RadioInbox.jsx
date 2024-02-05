import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import RadioGroupComponent from "../../../Components/Common/RadioGroup";
import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";

export const RadioInbox = ({ fabreq, updateParentState }) => {
  const [allFabReq, setAllFabReq] = useState(fabreq);
  const [selectedValue, setSelectedValue] = useState({
    fr: "",
    fullValue: [],
  });

  const handleSelectionChange = (newValue) => {
    const fullValue = allFabReq.filter((value) => value.frNo === newValue);
    setSelectedValue({ fr: newValue, fullValue: fullValue });
  };

  useEffect(() => {
    setAllFabReq(fabreq);
  }, [fabreq]);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Check Fab</CardHeader>
          <CardBody>
            <div>
              <div>
                {allFabReq.length > 0 ? (
                  <div>
                    {" "}
                    {allFabReq
                      .sort((a, b) => {
                        const getSequentialNumber = (frNo) =>
                          parseInt(frNo.split("-").pop());
                        return (
                          getSequentialNumber(b.frNo) -
                          getSequentialNumber(a.frNo)
                        );
                      })
                      .map((value) => (
                        <div>
                          <RadioGroupComponent
                            title={value.frNo}
                            subtitle={
                              value.project +
                              (value.module ? ", " + value.module : "") +
                              (value.partsList
                                ? ", " + value.partsList.length + " parts"
                                : "")
                            }
                            selectedValue={selectedValue.fr}
                            onSelectionChange={handleSelectionChange}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div>
                    <p>No Fabs to be checked...</p>
                  </div>
                )}
              </div>
              {selectedValue.fr ? (
                <div
                  className="w-full flex justify-between gap-2"
                  style={{ marginTop: "10px" }}>
                  <Button color="danger" onClick={() => updateParentState("")}>
                    Clear
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => updateParentState(selectedValue)}>
                    Check
                  </Button>
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
