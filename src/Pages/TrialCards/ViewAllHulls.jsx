import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CircularProgress,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import DataTable from "../../Components/Common/DataTable/Index";
import { paths } from "./paths";
import { ip, port } from "../../Config";
import { SearchTrialCard } from "./SearchTrialCard";
import { TCSummary } from "./TCSummary";

export const LCSViewAllTC = ({ updateParentState }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // State to store the received data
  const [showAll, setShowAll] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://" + ip + ":" + port + "/lcstrialcards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paths),
        }
      );
      const data = await response.json();
      setData(data);
      console.log(data)

      localStorage.setItem("cards", JSON.stringify(data));
      setLoading(false);
      updateParentState(data);
    } catch (error) {
      console.error("Error sending paths:", error);
      setLoading(false);
    }
  };

  const columns = [
    { name: "UID", uid: "uid", sortable: true },
    { name: "Compartment", uid: "COMPARTMENT", sortable: true },
    { name: "Narrative", uid: "Narrative", sortable: true },
  ];

  const initialColumns = ["COMPARTMENT", "Narrative"];

  function updateParent(value) {}

  useEffect(() => {
    // if (localStorage.getItem("cards").length > 0) {
    //   // setData(localStorage.getItem("cards"));
    //   console.log(JSON.parse(localStorage.getItem("cards")))
    // } else {
      fetchData(paths);
    // }
  }, []);

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>LCS Trial Cards</CardHeader>
          <CardBody>
            <div className="input-container-3column">
              {loading ? <CircularProgress /> : <div>Loaded</div>}
            </div>
          </CardBody>
        </Card>
      </div>

      {data ? (
        <div>
          <div>
            <TCSummary Cards={data} />
          </div>
          <div className="input-container-1column">
            <SearchTrialCard dataset={data} />
          </div>
          <div>
            <Button color="primary" onClick={() => setShowAll(true)}>
              Show All
            </Button>
          </div>

          {/* {showAll ? (
            <div>
              (data.map((value) => (
              <div className="input-container-1column">
                <Card>
                  <CardHeader>{value.vessel + " Trial Cards"}</CardHeader>
                  <CardBody>
                    <div className="input-container-1column">
                      {value.data ? (
                        <DataTable
                          rows={value.data}
                          initialColumns={initialColumns}
                          columns={columns}
                          updateParent={updateParent}
                          searchField={"true"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
              )))
            </div>
          ) : (
            <div></div>
          )} */}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
