import { Tabs, Tab } from "@nextui-org/react";
import { LCSViewAllTC } from "./ViewAllHulls";
import { useState } from "react";
import { LCSTreeView } from "./Treeview";

export const TrialCards = () => {
  const [selectedTab, setSelectedTab] = useState({
    tab: "viewAllTC",
    product: "",
  });

  const [data, setData] = useState(null);

  let tabs = [
    {
      id: "viewAllTC",
      label: "All Trial Cards",
      content: <LCSViewAllTC updateParentState={updateData} />,
    },
    {
      id: "tree",
      label: "View Tree",
      content: <LCSTreeView data={data} />,
    },
  ];

  function updateParentTab(value) {
    setSelectedTab({ tab: value.tab, product: value.product });
  }

  function updateData(value) {
    setData(value, () => {
      // This function gets called after `data` is updated.
      console.log(data);
    });
  }

  return (
    <div>
      <div className="input-container-1column">
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          selectedKey={selectedTab.tab}
          isDisabled = {data ? false : true}
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
