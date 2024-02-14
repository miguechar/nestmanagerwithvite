import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import shipdiv from "../../assets/imgs/shipdiv.png";
import { useState, useEffect } from "react";
import axios from 'axios';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

export const LocalNews = () => {
    // const [pdfFiles, setPdfFiles] = useState([]);

    // useEffect(() => {
    //   axios.get('/pdfs') // Adjust this URL to match your Flask endpoint
    //     .then(response => {
    //       setPdfFiles(response.data);
    //     })
    //     .catch(error => console.error("There was an error fetching the PDF files: ", error));
    // }, []);
  
    return (
      <div>
        {/* {pdfFiles.map(file => (
          <div key={file}>
            <h3>{file}</h3>
            <Document file={`/pdfs/${file}`} >
              <Page pageNumber={1} />
            </Document>
          </div>
        ))} */}
      </div>
    );
  };