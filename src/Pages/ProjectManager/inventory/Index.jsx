import { useState, useEffect } from "react";
import { BreadcrumbItem, Breadcrumbs, Tabs, Tab } from "@nextui-org/react";

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
  let tabs = [
    {
      id: "inventory",
      label: "Inventory",
      content: <div></div>,
    },
    {
        id: "addPlate",
        label: "Add Plate",
        content: <div></div>,
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
