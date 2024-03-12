import { useEffect, useState } from "react";
import { OCR } from "./OCR";
import { ip, port } from "../../Config";
import { Input } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";

export const TestingPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://10.102.13.68:8070/excelreader', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {loading ? <CircularProgress /> : <div></div>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

