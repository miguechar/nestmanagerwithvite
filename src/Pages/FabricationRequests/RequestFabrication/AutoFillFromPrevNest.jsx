import { Select, SelectItem } from "@nextui-org/react";
import { getFB } from "../../../Components/Global/functions/firebase";
import { useState, useEffect } from "react";

export const AutoFillFromPrevNest = ({ updateParentState }) => {
  const [nestsdb, setNestsdb] = useState([]);

  function autoFillFabreq(nestName) {
    const selectedNest = nestsdb.filter((value) => value.nestName === nestName)
    updateParentState({
      dateRequiered: "",
      requestedBy: "",
      project: selectedNest[0].hull,
      module: "",
      po: selectedNest[0].po,
      poName: "",
      shipTo: selectedNest[0].shipTo,
      comp: "",
      materialProvided: "",
      materialLocation: "",
      dwg: "",
      sheetZone: "",
      ecnfcn: "",
      briefDescription: "",
      detailedInstructions: "",
      shopAssigned: "",
      dateCompleted: "",
      shopNotes: "",
      frNo: "",
      engineeredChecked: "no",
      engineeringNotes: selectedNest[0].notes,
      partsList: selectedNest[0].parts,
      personWorked: "",
      personWorked1: "",
      personWorked2: "",
      hoursWorked: "",
      currentCount: "",
      tempPath: selectedNest[0].path,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const nests = await getFB("/nests");
      if (Array.isArray(nests)) {
        setNestsdb(nests);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div>
          <Select
            label="Select Nest"
            onChange={(e) => autoFillFabreq(e.target.value)}>
            {nestsdb
              .sort((a, b) => new Date(b.addedon) - new Date(a.addedon)) // Sort by date in descending order
              .map((value) => (
                <SelectItem key={value.nestName} value={value.nestName}>
                  {value.nestName}
                </SelectItem>
              ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
