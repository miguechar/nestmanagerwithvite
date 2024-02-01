import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import { RadioInbox } from "./RadioInbox";
import { EditFormEngineering } from "./EditForm";
import { CheckPartsEng } from "./CheckPartsEng";

export const EngineeringInbox = () => {
  const [allFabReq, setAllFabReq] = useState([]);
  const [nests, setNests] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  function handleCheckedfr(selectedValue) {
    setSelectedValue(selectedValue);
  }

  useEffect(() => {
    const fetchData = async () => {
      const fabreq = await getFB("/fabricationRequests/fabricationRequests");
      const nests = await getFB("nests");

      if (Array.isArray(fabreq)) {
        const engineering = fabreq.filter(
          (value) => value.engineeredChecked === "no"
        );
        setAllFabReq(engineering);
        setNests(nests);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="input-container-2column">
          {allFabReq ? (
            <RadioInbox
              fabreq={allFabReq}
              updateParentState={handleCheckedfr}
            />
          ) : (
            <div></div>
          )}

          {selectedValue ? (
            <EditFormEngineering allFabrequests={allFabReq} selectedFro={selectedValue} />
          ) : (
            <div></div>
          )}
      </div>
      <div className="input-container-1column">
        {selectedValue ? (
            <CheckPartsEng allFabrequests={allFabReq} selectedFro={selectedValue} />
          ) : (
            <div></div>
          )}
      </div>
      <div>

      </div>
    </div>
  );
};
