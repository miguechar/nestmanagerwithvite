import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import CustomizedTreeView from "../../../Components/Common/TreeView";
import { CreateAssembly } from "./CreateAssembly";

export const ViewModule = () => {
  // use location to get data from Project Manager Index.jsx
  const location = useLocation();
  const data = location.state;
  const [project, setProject] = useState({
    module: data.module,
    full: data.data,
    moduleUid: data.moduleUid,
  });
  const [newAssembly, setNewAssembly] = useState(false);

  function getValueClickedTree(value) {
    console.log(value);
  }

  useEffect(() => {
    console.log(data.data);
  }, []);

  return (
    <div>
      <div className="input-container-1column">
        <Card>
          <CardHeader>{data.module}</CardHeader>
          <CardBody>
            <div className="input-container-2column">
              <div>
                <Button color="primary" onClick={() => setNewAssembly(true)}>
                  Create Assembly
                </Button>
              </div>
              <div>
                {project.full ? (
                  <div>
                    <CustomizedTreeView
                      data={project.full}
                      moduleName={data.module}
                      updateParent={getValueClickedTree}
                    />
                  </div>
                ) : (
                  <p>loading...</p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
        
      </div>
      {newAssembly ? <CreateAssembly module={project.module} project={data.data} moduleUid={data.moduleUid} /> : <div></div>}
    </div>
  );
};
