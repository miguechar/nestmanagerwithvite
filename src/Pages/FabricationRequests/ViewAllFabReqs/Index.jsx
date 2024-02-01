import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SplittedAccordion } from "../../../Components/Common/Accordion";
import { getFB } from "../../../Components/Global/functions/firebase";
import { Box } from "@mui/material";
import { FabricationPDF } from "../../../Components/PDF/FabReqPDF";

export const ViewAllFabs = () => {
  const [fabrequests, setFabrequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fabreq = await getFB("/fabricationRequests/fabricationRequests");

      if (Array.isArray(fabreq)) {
        setFabrequests(fabreq);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>All Fabrication Requests</CardHeader>
          <CardBody>
            {fabrequests
              .sort((a, b) => {
                const getSequentialNumber = (frNo) =>
                  parseInt(frNo.split("-").pop());
                return (
                  getSequentialNumber(b.frNo) - getSequentialNumber(a.frNo)
                );
              })
              .map((value) => (
                <div>
                  <SplittedAccordion
                    title={
                      <div className="input-container-3column">
                        {value.frNo}
                        <div className="input-container-1column">
                          {value.module + ", " + value.project}
                        </div>
                        <div
                          className="input-container-2column"
                          style={{ display: "flex" }}>
                          <div>
                            {value.engineeredChecked === "yes" ? (
                              <Chip color="success">Checked</Chip>
                            ) : (
                              <Chip color="danger">Not Checked</Chip>
                            )}
                          </div>
                          <div>
                            {value.dateCompleted ? (
                              <Chip color="success">Completed</Chip>
                            ) : (
                              <Chip color="danger">Not Completed</Chip>
                            )}
                          </div>
                        </div>
                      </div>
                    }
                    content={
                      <div>
                        <div>
                          <div>
                            <p>
                              Date Required:
                              {value.dateRequiered ? value.dateRequiered : "-"}
                            </p>
                            <p>
                              Date Requested: {value.date ? value.date : "-"}
                            </p>
                            <p>
                              Project: {value.project ? value.project : "-"}
                            </p>
                            <p>
                              Requested By: {value.requestedBy ? value.requestedBy : "-"}
                            </p>
                            <p>PO: {value.po ? value.po : "-"}</p>
                            <p>PO Name: {value.poName ? value.poName : "-"}</p>
                            <p>Ship To: {value.shipTo ? value.shipTo : "-"}</p>
                          </div>
                          <Box mt={"10px"} height={"800px"}>
                            <FabricationPDF data={value} />
                          </Box>
                        </div>
                      </div>
                    }
                  />
                </div>
              ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
