import { useEffect, useState } from "react";
import { getFB } from "../../Components/Global/functions/firebase";
import { PieChart } from "../../Components/Common/Piechart";
import { Box } from "@mui/material";
import { Skeleton, Card } from "@nextui-org/react";

export const NestsCutChart = () => {
  const [pieData, setPieData] = useState({loading: false, data: []});

  function RenderPie(values) {
    try {
        const cutNests = values.filter((value) => value.status == "Cut");
        const nestsCutAmount = cutNests.length;
        const totalAmountofNests = values.length;

        var dataset = [];
        dataset.push(
          {
            id: "Cut",
            label: "Cut Nests",
            value: nestsCutAmount,
            color: "hsl(262, 70%, 50%)",
          },
          {
            id: "Not Cut",
            label: "Not Cut Nests",
            value: totalAmountofNests - nestsCutAmount,
            color: "hsl(132, 70%, 50%)",
          }
        );
        setPieData({loading: false, data: dataset});
      
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setPieData({...pieData, loading: true})
    const fetchData = async () => {
      const nests = await getFB("/nests");

      if (Array.isArray(nests)) {
        RenderPie(nests);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {pieData.loading ? (
        <Skeleton className="rounded-lg">
          <div style={{ height: "500px" }}></div>
        </Skeleton>
      ) : (
        <div style={{ height: "500px" }}>
          <PieChart data={pieData.data}/>
        </div>
      )}
    </div>
  );
};
