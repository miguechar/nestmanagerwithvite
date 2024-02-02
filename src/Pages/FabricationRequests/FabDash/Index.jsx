import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import { MyResponsiveBar } from "../../../Components/Common/BarChart";

export const FabDash = () => {
  const [operators, setOperators] = useState({
    all: [],
    clock: [],
    hours: [],
  });

  function getData(operators) {
    var clocks = [];
    const sumOfHoursArray = [];
  
    for (let i = 0; i < operators.length; i++) {
      clocks.push(operators[i].clock);
  
      // Initialize the sum for the operator
      let sum = 0;
  
      // Iterate through each entry for the operator's work
      for (const entry in operators[i].work) {
        const workEntry = operators[i].work[entry];
        sum += parseFloat(workEntry.hoursWorked, 10) || 0; // Convert hoursWorked to an integer
      }
  
      // Add the sum to the array
      sumOfHoursArray.push({ sum });
    }
  
    setOperators({
      ...operators,
      clock: clocks,
      hours: sumOfHoursArray,
    });
  }

  const fetchData = async () => {
    const operators = await getFB("/fabricationRequests/Operators/");

    if (Array.isArray(operators)) {
      getData(operators);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="input-container-1column">
        <MyResponsiveBar data={operators} />
      </div>
    </div>
  );
};
