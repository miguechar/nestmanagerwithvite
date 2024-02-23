import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import {
  Tabs, 
  Tab,
  Breadcrumbs, BreadcrumbItem
} from "@nextui-org/react";
import { CreateStandardPart } from "./CreateStdParts";
import { ViewStandardParts } from "./ViewStandardParts";

export const StandardPartsBC = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/projectmanager">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projectmanager/settings">Standard Parts</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export const StandardParts = () => {
  const location = useLocation();
  const data = location.state;
  const [project, setProject] = useState({
    module: data.module,
    full: data.data,
    moduleUid: data.moduleUid,
  });
  const [selectedTab, setSelectedTab] = useState("viewStandardParts")
  let tabs = [
    {
      id: "viewStandardParts",
      label: "View Standard Parts",
      content: (
        <ViewStandardParts projectUID={data.data.full.uid}/>
      ),
    },
    {
      id: "createStandardParts",
      label: "Create New STD Part",
      content: (
        <CreateStandardPart projectUID={data.data.full.uid}/>
      ),
    },    
  ];

  return (
    <div>
      <div style={{textAlign: "left"}}>
        <Tabs aria-label="Dynamic tabs" items={tabs} selectedKey={selectedTab} onClick={(e) => setSelectedTab(e.target.value)}>
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
