import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFB } from "../../../Components/Global/functions/firebase";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import CustomizedTreeView from "../../../Components/Common/TreeView";

export const ProductHierarchy = ({
  selectedModule,
  moduleID,
  projectUID,
  updateParentTab,
}) => {
  const location = useLocation();
  const data = location.state;
  const [rawAssemblies, setRawAssemblies] = useState([]);
  const [allAssemblies, setAllAssemblies] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    assyName: "",
    uid: "",
  });

  async function fetchAssemblies() {
    const assemblies = await getFB(
      "Projects/" + data.data.full.uid + "/Assemblies"
    );
    createHierarchy(assemblies);
  }

  function createHierarchy(assemblies) {
    let map = {};
    let roots = [];

    // Initialize map with all items and find root items, including description in the name
    assemblies.forEach((item) => {
      // Concatenate assyName and description
      const nameWithDescription = `${item.assyName} (${item.description})`;

      map[item.uid] = { ...item, assyName: nameWithDescription, children: [] };
      if (item.assyParent === "") roots.push(map[item.uid]);
    });

    // Populate children assemblies
    assemblies.forEach((item) => {
      if (item.assyParent !== "") {
        // Ensure children also have their names updated to include descriptions
        const updatedChild = {
          ...map[item.uid],
          assyName: `${item.assyName} (${item.description})`,
        };
        map[item.assyParent].children.push(updatedChild);
      }
    });

    // Sort children of each assembly by assyName (including description)
    Object.values(map).forEach((assembly) => {
      if (assembly.children.length > 1) {
        assembly.children.sort((a, b) => a.assyName.localeCompare(b.assyName));
      }
    });

    // Optionally, sort roots if needed
    roots.sort((a, b) => a.assyName.localeCompare(b.assyName));

    setAllAssemblies(roots);
    setRawAssemblies(assemblies)
    return roots;
  }

  function handleChildClick(value) {
    setSelectedProduct({ uid: value.uid, assyName: value.assyName });
  }

  function handleEditButton() {
    const assemblyName = selectedProduct.assyName.split(" ");
    console.log(assemblyName[0])
    const selectedAssembly = rawAssemblies.filter((value) => value.assyName === assemblyName[0]);
    updateParentTab({tab: "editAssy", product: selectedAssembly})
  }

  useEffect(() => {
    fetchAssemblies();
  }, []);

  return (
    <div className="input-container-1column">
      <Card>
        <CardHeader>Product Hierarchy</CardHeader>
        <CardBody>
          <div className="input-container-1column">
            <div>
              <CustomizedTreeView
                data={allAssemblies}
                updateParentState={handleChildClick}
              />
            </div>
            {selectedProduct.assyName ? (
              <div>
                <Button onClick={() => handleEditButton()}>
                  {"View: " + selectedProduct.assyName}
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </CardBody>
      </Card>
      <div></div>
    </div>
  );
};
