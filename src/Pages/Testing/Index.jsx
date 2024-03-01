import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomizedTreeView from "../../Components/Common/TreeView";
import { CircularProgress } from "@nextui-org/react";
import { TextField } from "@mui/material";

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

  async function createPDF() {
    const fileName = "Hello"
    const url = `http://10.102.30.12:8080/create-pdf/${fileName}`;
    
    try {
      const response = await fetch(url);
      const data = await response.text(); // Assuming the Flask endpoint returns a text message
      
      console.log(data); // Log the response from the server
      // Handle success response
      alert(data); // Show success message or handle it as per your requirement
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      alert('Failed to create PDF'); // Show error message or handle it as per your requirement
    }
  }


  const [selectedFile, setSelectedFile] = useState(null);

  // Handler for file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handler for file upload
  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://10.102.30.12:8080/uploadfile', {
        method: 'POST',
        body: formData, // FormData will be used in the request
      });

      const data = await response.text();
      alert(data); // Show success message or handle it as per your requirement
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload file'); // Show error message or handle it as per your requirement
    }
  };

  useEffect(() => {
    getFolders();
  }, []);

  useEffect(() => {
    // Encode the directory path by replacing slashes with pipes
    const directoryPath = '//fmmfs002|Users1|cm12308'.replace(/\//g, '|');
    const apiUrl = `http://10.102.30.12:8080/list-directory/${directoryPath}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Directory Contents:', data);
      })
      .catch(error => {
        console.error('Error fetching directory contents:', error);
      });
  }, []);

  return (
    <div className="input-container-1column">
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
      <div>
        <Card>
          <CardHeader>TESTING ONLY</CardHeader>
          <CardBody>
            {/* <Button onClick={createPDF} color="success">Press Me</Button> */}
            <TextField type="file" onChange={handleFileChange} />
            <Button color="secondary" onClick={uploadFile}>Upload</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
