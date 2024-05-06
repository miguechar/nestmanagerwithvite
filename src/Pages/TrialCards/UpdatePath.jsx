import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { getFB, setFB, updateFB } from "../../Components/Global/functions/firebase";
import { TextField } from "@mui/material";
import { ip, port } from "../../Config";

export const UpdatePath = () => {
  const [clicked, setClicked] = useState(false);
  const [pathsdb, setpathsdb] = useState([]);

  async function handleClick() {
    setClicked(true);

    const paths = await getFB("lcstrials/paths");
    setpathsdb(paths);
  }

  function handlePathChange(e, index) {
    const updatedPath = [...pathsdb];
    updatedPath[index] = {
      ...updatedPath[index],
      path: e.target.value
    }

    setpathsdb(updatedPath)
    console.log(updatedPath)
  }

  function uploadToFB() {
    console.log(pathsdb.length)
    for(let i = 0; i < pathsdb.length; i++) {
      updateFB("lcstrials/paths/" + i, pathsdb[i])
    }
  }

  return (
    <div>
      <div>
        <Button onClick={() => handleClick()}>Update Paths</Button>
      </div>
      {clicked ? (
        <div className="input-container-1column">
          <Card>
            <CardHeader>Current Paths</CardHeader>
            <CardBody>
              <div>
                <div className="input-container-1column">
                  {pathsdb ? (
                    pathsdb.map((value, index) => (
                      <div>
                        <p>{value.vessel}</p>
                        <Input
                          value={value.path}
                          onChange={(e) => handlePathChange(e, index)}
                        />
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
                <div>
                  <Button color="danger" onClick={() => setClicked(false)}>
                    Close
                  </Button>
                  <Button color="primary" onClick={() => uploadToFB()}>
                    Update
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
