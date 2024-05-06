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
              color={trialCard.trialcard[0]["Status"] === "O" ? "green" : "red"}
              sx={{ marginBOttom: "5px" }}>
              {trialCard.trialcard[0]["Status"] === "O"
                ? "Status: Open"
                : "Status: Closed"}
            </Typography>
          </div>
          <div className="input-container-1column">
            <div className="input-container-2column">
              <Card>
                <CardHeader>
                  {trialCard.trialcard[0]["Trial Card #"] +
                    ": " +
                    trialCard.trialcard[0]["Title"]}
                </CardHeader>
                <CardBody>
                  <p>{trialCard.vessel}</p>
                  <p>{"Department: " + trialCard.trialcard[0]["Dept"]} </p>
                  <p>
                    {"Compartment: " + trialCard.trialcard[0]["COMPARTMENT"]}{" "}
                  </p>
                  <p>
                    {"Action Taken: " + trialCard.trialcard[0]["Action Taken"]}{" "}
                  </p>

                  <p>
                    {"Originator: " + trialCard.trialcard[0]["Originator Name"]}{" "}
                  </p>

                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Divider />
                  </div>

                  <p>{"Narrative: " + trialCard.trialcard[0]["Narrative"]}</p>

                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Divider />
                  </div>

                  <p>
                    {trialCard.trialcard[0]["Corrective Action"]
                      ? "Corrective Action: " +
                        trialCard.trialcard[0]["Corrective Action"]
                      : "No Corrective Action"}
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>Task Notes</CardHeader>
                <Divider />
                <CardBody>
                  <div>
                    <div>{trialCard.trialcard[0]["Task Notes"]}</div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>References</CardHeader>
                <CardBody>
                  <div>
                    <p>{trialCard.trialcard[0]["References"]} </p>
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
