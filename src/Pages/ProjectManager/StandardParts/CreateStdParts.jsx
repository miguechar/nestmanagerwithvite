import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFB } from "../../../Components/Global/functions/firebase";
import {
    Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Tab, 
  Tabs
} from "@nextui-org/react";
import { STDClosure } from "./STDForms/stdClosure";

export const CreateStandardPart = ({projectUID}) => {
  const [selectedTab, setSelectedTab] = useState("createCollarPlate")

  let tabs = [
    {
      id: "createCollarPlate",
      label: "Collar Plate",
      content: (
        <STDClosure projectUID={projectUID}/>
      ),
    },
    {
      id: "createLandingBracket",
      label: "Chock",
      content: (
        <div></div>
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
