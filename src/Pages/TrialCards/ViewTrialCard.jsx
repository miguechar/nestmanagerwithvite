import { Typography } from "@mui/material";
import {
  Card,
  CardHeader,
  BreadcrumbItem,
  Breadcrumbs,
  Divider,
  CardBody,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ViewTrialCardBC = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/trialcards">Trial Cards</BreadcrumbItem>
      <BreadcrumbItem href="/trialcards">View Trial Card</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export const ViewTrialCard = () => {
  //retrieve data from previous window
  const location = useLocation();
  const data = location.state;

  const [trialCard, setTrialCard] = useState(null);

  useEffect(() => {
    setTrialCard(data.data);
    console.log(data.data)
  }, []);

  return (
    <div>
      {trialCard ? (
        <div>
          <div style={{ textAlign: "left" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color={trialCard["Status"] === "O" ? "green" : "red"}
              sx={{ marginBOttom: "5px" }}>
              {trialCard["Status"] === "O"
                ? "Status: Open"
                : "Status: Closed"}
            </Typography>
          </div>
          <div className="input-container-1column">
            <div className="input-container-2column">
              <Card>
                <CardHeader>
                  {trialCard["Trial Card #"] +
                    ": " +
                    trialCard["Title"]}
                </CardHeader>
                <CardBody>
                  <p>{trialCard.vessel}</p>
                  <p>{"Department: " + trialCard["Dept"]} </p>
                  <p>
                    {"Compartment: " + trialCard["COMPARTMENT"]}{" "}
                  </p>
                  <p>
                    {"Action Taken: " + trialCard["Action Taken"]}{" "}
                  </p>

                  <p>
                    {"Originator: " + trialCard["Originator Name"]}{" "}
                  </p>

                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Divider />
                  </div>

                  <p>{"Narrative: " + trialCard["Narrative"]}</p>

                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Divider />
                  </div>

                  <p>
                    {trialCard["Corrective Action"]
                      ? "Corrective Action: " +
                        trialCard["Corrective Action"]
                      : "No Corrective Action"}
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>Task Notes</CardHeader>
                <Divider />
                <CardBody>
                  <div>
                    <div>{trialCard["Task Notes"]}</div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>References</CardHeader>
                <CardBody>
                  <div>
                    <p>{trialCard["References"]} </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
