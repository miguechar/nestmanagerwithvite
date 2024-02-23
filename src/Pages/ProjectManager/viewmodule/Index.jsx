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
import { EditAssembly } from "./EditAssembly";
import { CBom } from "./CBom";

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
  const [selectedTab, setSelectedTab] = useState({
    tab: "createAssy",
    product: "",
  });

  let tabs = [
    {
      id: "createAssy",
      label: "Create Assembly",
      content: (
        <CreateAssembly
          selectedModule={data.module}
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
        <EditAssembly
          assy={selectedTab.product}
          projectUID={data.data.full.uid}
          updateParentTab={updateParentTab}
        />
      ),
    },
    {
      id: "cbom",
      label: "CBOM",
      content: (
        <CBom
          projectUID={data.data.full.uid}
          selectedModule={project.module}
          updateParentTab={updateParentTab}
        />
      ),
    },
  ];

  function updateParentTab(value) {
    setSelectedTab({ tab: value.tab, product: value.product });
  }

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
