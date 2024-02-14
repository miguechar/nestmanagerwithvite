import { useEffect, useState } from "react";
import { getFB, setFB } from "../../../Components/Global/functions/firebase";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import ListBox from "../../../Components/Common/ListBox";

export const FabHome = () => {
  const [operators, setOperators] = useState({
    operators: []
  });
  const [newOperator, setNewOperator] = useState({
    name: "",
    clock: "",
  });

  async function fetchOperators() {
    const operators = await getFB("/fabricationRequests/Operators");
    getOperatorHours(operators)
  };

  function getOperatorHours(operators) {
    var clocks = [];
    const sumOfHoursArray = [];
  
    for (let i = 0; i < operators.length; i++) {
      clocks.push(operators[i].clock);

      let sum = 0;
  
      for (const entry in operators[i].work) {
        const workEntry = operators[i].work[entry];
        sum += parseFloat(workEntry.hoursWorked, 10) || 0; // Convert hoursWorked to an integer
      }
  
      sumOfHoursArray.push({ "total": sum, "operator": operators[i].name, "clock": operators[i].clock, });
    }
    setOperators({...operators, operators: sumOfHoursArray});
  }

  function handleNewOperator() {
    setFB("/fabricationRequests/Operators", newOperator);
    fetchOperators();
  }

  useEffect(() => {
    fetchOperators();
  }, []);

  return (
    <div className="input-container-2column">
      <div>
        <Card>
          <CardHeader>Operators</CardHeader>
          <CardBody>
            <div>
              {operators.operators.map((value) => (
                <ListBox title={value.operator} subtitle={value.clock + ", " + value.total + " hours"} />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>Add Operator</CardHeader>
          <CardBody>
            <div>
              <div className="input-container-2column">
                <Input
                  label="Name"
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, name: e.target.value })
                  }
                />
                <Input
                  label="Clock"
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, clock: e.target.value })
                  }
                />
              </div>
              <div>
                <Button color="primary" onClick={handleNewOperator}>
                  Enter New
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
