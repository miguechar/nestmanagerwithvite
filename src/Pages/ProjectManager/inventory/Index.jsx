import { useState, useEffect } from "react";
import { BreadcrumbItem, Breadcrumbs, Tabs, Tab } from "@nextui-org/react";
import { PMAddPlate } from "./AddPlate";
import { useLocation } from "react-router-dom";
import { PlateChart } from "./PlateChart";

export const InventoryBC = () => {
  <Breadcrumbs>
    <BreadcrumbItem href="/projectmanager">Home</BreadcrumbItem>
    <BreadcrumbItem href="/projectmanager/inventory">Inventory</BreadcrumbItem>
  </Breadcrumbs>;
};

export const Inventory = () => {
  const [selectedTab, setSelectedTab] = useState({
    tab: "inventory",
  });
  const location = useLocation();
  const data = location.state
  const [project, setProject] = useState({
    module: data.module,
    full: data.data,
    moduleUid: data.moduleUid,
  });

  let tabs = [
    {
      id: "inventory",
      label: "Inventory",
      content: <PlateChart projectUID={data.data.full.uid}/>,
    },
    {
        id: "addPlate",
        label: "Add Plate",
        content: <PMAddPlate projectUID={data.data.full.uid}/>,
      },
  ];
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          selectedKey={selectedTab.tab}
          onClick={(e) =>
            setSelectedTab({ ...selectedTab, tab: e.target.value })
          }>
          {(item) => (
            <Tab key={item.id} title={item.label} value={item.id}>
              {item.content}
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};
