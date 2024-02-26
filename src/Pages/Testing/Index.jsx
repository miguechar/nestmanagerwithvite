import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomizedTreeView from "../../Components/Common/TreeView";
import { CircularProgress } from "@nextui-org/react";

export const TestingPage = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  function getFolders() {
    fetch("http://10.102.30.12:8080/opensdrive", {
      method: "GET", // Ensure this matches what your server expects
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFolders(data); // Assuming you want to set the fetched data to your folders state
        setLoading(false); // Set loading to false after the data is fetched and state is updated
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
        setLoading(false); // Also set loading to false in case of an error
      });
  }

  function handleNodeUpdate(value) {
    console.log(value);
  }

  function handleNodeDoubleClick(nodeId, event) {
    event.preventDefault(); // Prevent the default action
    // Assuming nodeId or a part of it can be used to identify the file on the backend
    const filePath = nodeId; // Or any logic to get the file path or unique identifier

    fetch(`http://10.102.30.12:8080/openfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath: filePath }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File opened successfully", data);
      })
      .catch((error) => {
        console.error("Error opening file:", error);
      });
  }

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>Navigator</CardHeader>
          <CardBody>
            {loading ? (
              <div>
                <CircularProgress aria-label="Loading..." />
              </div>
            ) : (
              <CustomizedTreeView
                data={folders}
                updateParentState={handleNodeUpdate}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
