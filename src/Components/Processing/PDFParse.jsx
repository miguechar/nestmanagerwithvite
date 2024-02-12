import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { Input } from "@nextui-org/react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFParse = ({ updateParentState, formatType }) => {
  const [numPages, setNumPages] = useState(null);

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await pdfjs.getDocument(typedarray).promise;
        let array = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const textItems = content.items.map((item) => item.str);
          array.push(textItems);
        }

        const ntProps = array[0];

        if (formatType === "nestTape") {
          const valuesToFilterOut = [
            "",
            "BEV_R",
            "BEV_D",
            "BEV_EE",
            "STBD",
            "UP",
            "PORT",
            "DOWN",
            "FWD",
            "10(S)",
            "15(S)",
            "10(P)",
            "15(P)",
            " ",
          ];
          const filteredParts = ntProps.filter(
            (value) => !valuesToFilterOut.includes(value)
          );


          const totalLength = filteredParts.length;

          const partsList = filteredParts.slice(36, totalLength); 
          updateParentState({
            material: filteredParts[27],
            hull: filteredParts[28],
            nestName: filteredParts[23],
            thickness: filteredParts[26],
            stock: filteredParts[29],
            po: filteredParts[32],
            notes: filteredParts[34],
            plateSize: filteredParts[25],
            partsList: findElement(partsList),
            path: filteredParts[21],
            shipTo: filteredParts[35],
          });
        }

        if(formatType === "subassy") {
          createArrayForSubAssy(array)
        }

        setNumPages(pdf.numPages);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  function findElement(element) {
    const elementCount = {};

    element.forEach((element) => {
      elementCount[element] = (elementCount[element] || 0) + 1;
    });

    const resultArray = [];

    Object.keys(elementCount).forEach((element) => {
      const elementObject = {
        name: element,
        qty: elementCount[element],
      };

      resultArray.push(elementObject);
    });

    return resultArray;
  }

  function createArrayForSubAssy(array) {
    const rawPartsList = array[0];

    const filteredList = [];
    for (let i = 0; i < rawPartsList.length; i++) {
      if (rawPartsList[i].length == 12) {
        filteredList.push({
          name: rawPartsList[i],
          qty: 1,
        });
      }
    }

    const partsList = filteredList.splice(1, filteredList.length);

    updateParentState({
        parent: filteredList[0].name,
        hull: rawPartsList[58],
        po: rawPartsList[50],
        partsList: partsList
    })

  }

  return (
    <div>
      <Box>
        <TextField
          type="file"
          placeholder="Upload PDF"
          onChange={onFileChange}
        />

        {numPages && (
          <Box display="flex">
            <p>PDF Loaded, {numPages} pages loaded</p>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PDFParse;
