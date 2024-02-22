import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFB } from "../../../Components/Global/functions/firebase";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import CustomizedTreeView from "../../../Components/Common/TreeView";

export const ProductHierarchy = ({ selectedModule, moduleID, projectUID, updateParentTab }) => {
  const location = useLocation();
  const data = location.state;
  const [allAssemblies, setAllAssemblies] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    assyName: "",
    uid: ""
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

    // Initialize map with all items and find root items
    assemblies.forEach((item) => {
      map[item.uid] = { ...item, children: [] };
      if (item.assyParent === "") roots.push(map[item.uid]);
    });

    // Populate children assemblies
    assemblies.forEach((item) => {
      if (item.assyParent !== "") {
        map[item.assyParent].children.push(map[item.uid]);
      }
    });
    setAllAssemblies(roots);
    return roots;
  }

  function handleChildClick(value) {
    setSelectedProduct({uid: value.uid, assyName: value.assyName})
  };

  function handleEditButton(value) {
    updateParentTab("editAssy")
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
                <Button onClick={() => handleEditButton()}>{"View: " + selectedProduct.assyName}</Button>
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
