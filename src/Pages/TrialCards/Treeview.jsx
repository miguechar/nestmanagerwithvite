import { useEffect } from "react";
import LCSTreeComponent from "./TreeComponent";
import { useState, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Switch,
} from "@nextui-org/react";
import { paths } from "./paths";

export const LCSTreeView = ({ data, updateParentTab }) => {
  const [tree, setTree] = useState(null);
  const [filterTree, setFilterTree] = useState(null);
  const [switchState, setSwitchState] = useState(false);
  const [selectedHulls, setSelectedHulls] = useState([]);
  const [selectedHullData, setSelectedHullData] = useState([]);
  const [allData, setAllData] = useState(null)

  function transformDataForTreeView(x) {
    // Check if data is undefined or null
    if (!x) {
      console.error("Data is undefined or not yet available.");
      return; // Exit the function if data is not available
    }

    const compartments = {};

    x.forEach((vessel) => {
      vessel.data.forEach((item) => {
        if (!compartments[item.COMPARTMENT]) {
          compartments[item.COMPARTMENT] = {
            name: item.COMPARTMENT,
            vessels: [],
          };
        }
        // Assuming 'Narrative' is a field within each item
        const narrative = item.Narrative || "No narrative available"; // Fallback text if Narrative is missing
        compartments[item.COMPARTMENT].vessels.push({
          vessel: vessel.vessel,
          uid: item.uid,
          narrative: narrative,
          ...item,
        });
      });
    });

    const treeData = Object.keys(compartments).map((key) => {
      const comp = compartments[key];
      return {
        id: `comp-${key}`,
        name: comp.name,
        children: comp.vessels.map((v) => ({
          id: `vessel-${v.uid}`,
          name: `${v.vessel}: ${v.COMPARTMENT},  ${v["Current State"]}`,
          children: [
            {
              id: `narrative-${v.uid}`,
              name: `Narrative: ${v.narrative}`,
            },
          ], // Adding a grandchild for Narrative
        })),
      };
    });

    // setTree(treeData);
    return treeData;
  }

  function handleCompartmentSearch(filter) {
    const filtered = tree.filter((value) =>
      value.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilterTree(filtered);
    console.log(filterTree);
  }

  function findSimilarNarratives() {}

  const selectedValue = useMemo(
    () => Array.from(selectedHulls).join(", ").replaceAll("_", " "),
    [selectedHulls]
  );

  useEffect(() => {
    const selected = selectedValue.split(", ");

    let datafromS = [];
    for (let i = 0; i < data.length; i++) {
      for (let t = 0; t < selected.length; t++) {
        if (data[i].vessel === selected[t]) {
          datafromS.push(data[i]);
        }
      }
    }

    if (datafromS !== null) {
      let notCompleted = [];
      for (let i = 0; i < datafromS.length; i++) {
        const notCompletedFilter = datafromS[i].data.filter(
          (value) => value["Current State"] !== "Card Complete"
        );
        notCompleted.push({
          data: notCompletedFilter,
          vessel: datafromS[i].vessel,
        });
      }
      const value = transformDataForTreeView(notCompleted);
      setTree(value);

      setSelectedHullData(datafromS)
    } else {
      updateParentTab({ tab: "viewAllTC" });
    }
  }, [selectedHulls]);

  useEffect(() => {
    if (switchState && selectedHullData) {
      const ref = transformDataForTreeView(selectedHullData);
      setTree(ref);
    }
    if (!switchState) {
      let notCompleted = [];
      for (let i = 0; i < selectedHullData.length; i++) {
        const notCompletedFilter = selectedHullData[i].data.filter(
          (value) => value["Current State"] !== "Card Complete"
        );
        notCompleted.push({ data: notCompletedFilter, vessel: selectedHullData[i].vessel });
      }
      const value = transformDataForTreeView(notCompleted);
      setTree(value);
    }
  }, [switchState]);

  useEffect(() => {
    setAllData(data)
  }, [])
  return (
    <div>
      <div>
        <Card>
          <CardHeader>By Compartment</CardHeader>
          <CardBody>
            <div>
              <div className="input-container-4column">
                <Input
                  label="Compartment"
                  onChange={(e) => handleCompartmentSearch(e.target.value)}
                />
                <Switch
                  isSelected={switchState}
                  onValueChange={setSwitchState}
                  color="primary">
                  {switchState ? "Showing All" : "Showing Not Completed"}
                </Switch>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">{selectedValue}</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    selectionMode="multiple"
                    selectedKeys={selectedHulls}
                    aria-label="Multiple selection example"
                    closeOnSelect={false}
                    variant="flat"
                    onSelectionChange={setSelectedHulls}>
                    {paths.map((value) => (
                      <DropdownItem key={value.vessel}>
                        {value.vessel}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div style={{ margin: "10px" }}>
                <Divider />
              </div>

              <div className="input-container-1column">
                {tree ? (
                  filterTree ? (
                    <LCSTreeComponent data={filterTree} />
                  ) : (
                    <LCSTreeComponent data={tree} />
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div>
        <Button color="primary">Testing Only</Button>
      </div>
    </div>
  );
};
