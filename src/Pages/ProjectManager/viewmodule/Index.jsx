import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { ProductHierarchy } from "./ProductHierarchy";
import { CreateAssembly } from "./CreateAssembly";

export const ViewModuleBC = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/projectmanager">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projectmanager/viewmodule">
        View Module
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export const ViewModule = () => {
  // use location to get data from Project Manager Index.jsx
  const location = useLocation();
  const data = location.state;
  const [project, setProject] = useState({
    module: data.module,
    full: data.data,
    moduleUid: data.moduleUid,
  });
  const [selectedTab, setSelectedTab] = useState("createAssy")

  let tabs = [
    {
      id: "createAssy",
      label: "Create Assembly",
      content: (
        <CreateAssembly
          selectedModule={project.module}
          moduleID={project.moduleUid}
          projectUID={data.data.full.uid}
        />
      ),
    },
    {
      id: "viewHierarchy",
      label: "Product Hierarchy",
      content: (
        <ProductHierarchy
          selectedModule={project.module}
          moduleID={project.moduleUid}
          projectUID={data.data.full.uid}
          updateParentTab={updateParentTab}
        />
      ),
    },
    {
      id: "editAssy",
      label: "Edit Assy",
      content: (
        <ProductHierarchy
          selectedModule={project.module}
          moduleID={project.moduleUid}
          projectUID={data.data.full.uid}
        />
      ),
    },
  ];

  function updateParentTab(value) {
    setSelectedTab(value)
  }

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
