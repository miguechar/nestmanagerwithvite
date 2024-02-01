import { useState, useEffect } from "react";
import { LineGraph } from "../../Components/Common/LineChart";
import { Skeleton } from "@nextui-org/react";
import { getFB } from "../../Components/Global/functions/firebase";

export const PlateShopHoursChart = () => {
  const [palteShopHours, setPlateShopHours] = useState({
    data: [],
    loading: false,
  });

  const MonthlyHoursSum = (data) => {
    const monthlyHours = Array(12).fill(0);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    data.forEach((operator) => {
      if (operator.work) {
        Object.values(operator.work).forEach((workEntry) => {
          const month = new Date(workEntry.date).getMonth();

          monthlyHours[month] += parseFloat(workEntry.hoursWorked) || 0;
        });
      }
    });

    const resultArray = monthlyHours.map((totalHours, index) => ({
      x: monthNames[index],
      y: totalHours,
    }));

    var finalArray = [];

    finalArray.push({id: "japan",
    color: "hsl(239, 70%, 50%)", data: resultArray})

    setPlateShopHours({ ...palteShopHours, data: finalArray, loading: false });
  };


  useEffect(() => {
    setPlateShopHours({...palteShopHours, loading: true})
    const fetchData = async () => {
      const fetchedPlateShopHours = await getFB(
        "/fabricationRequests/Operators"
      );

      if (Array.isArray(fetchedPlateShopHours)) {
        MonthlyHoursSum(fetchedPlateShopHours);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {palteShopHours.loading ? (
        <Skeleton className="rounded-lg">
          <div style={{ height: "500px" }}></div>
        </Skeleton>
      ) : (
        <div style={{ height: "500px" }}>
          <LineGraph data={palteShopHours.data} curve={"stepAfter"} yHeader={"Hours"} xHeader={"Month"} />
        </div>
      )}
    </div>
  );
};
