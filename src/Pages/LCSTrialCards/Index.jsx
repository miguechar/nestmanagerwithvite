import { useEffect, useState } from "react";
import { port, ip } from "../../Config";
import { paths } from "./paths";
import { Tabs, Tab } from "@nextui-org/react";
import { TCSummary } from "./Summary/TCSummary";
import { SearchTrialCard } from "./SearchTrialCard/SearchTrialCard";
import { ViewTrialCard } from "./ViewTC/ViewTC";

export const LCSTRiadCards = () => {
  const [cards, setCards] = useState([]);
  const [selectedTab, setSelectedTab] = useState({
    tab: "sum",
    product: "",
  });

  const fetchCards = async () => {
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
      setCards(data);
      console.log(data);

      // localStorage.setItem("cards", JSON.stringify(data));
      //   updateParentState(data);
    } catch (error) {
      console.error("Error sending paths:", error);
    }
  };

  let tabs = [
    {
      id: "sum",
      label: "Hull Summary",
      content: <TCSummary Cards={cards} />,
    },
    {
      id: "viewAllTC",
      label: "Search Trial Cards",
        content: <SearchTrialCard dataset={cards} updateParentState={updateParentState}/>,
    },
    {
      id: "viewtc",
      label: "View Trial Card",
      content: <ViewTrialCard data={selectedTab.product} />,
    },
  ];

  function updateParentState(data) {
    setSelectedTab({...selectedTab, tab: data.tab, product: data.data})
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div>
      <div className="input-container-1column"><p>{cards.length + " hulls loaded"}</p></div>
      <div className="input-container-1column">
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          selectedKey={selectedTab.tab}
          isDisabled={cards.length > 0 ? false : true}
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
