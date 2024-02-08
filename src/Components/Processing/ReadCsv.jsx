import { Box, TextField } from "@mui/material";
import { useState, useRef } from "react";

export const ReadCSV = ({ updateParentState, formatType }) => {
  const [csvData, setCsvData] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const fileReaders = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.onload = async (e) => {
            const content = e.target.result;
            const parsedData = await parseCsv(content);
            resolve(parsedData);
            updateParentState(parsedData);
          };

          reader.readAsText(file);
        });
      });

      Promise.all(fileReaders).then((parsedDataArray) => {
        // Filter out empty arrays before updating state
        const nonEmptyData = parsedDataArray.filter((data) => data.length > 0);
        setCsvData((prevData) => [...prevData, ...nonEmptyData]);
        
        // Reset the input value to unload the file
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    }
  };

  const parseCsv = (csvContent) => {
    // Assuming the CSV has columns named "name" and "qty"
    const rows = csvContent.split("\n");
    const parsedData = rows.slice(1).map((row) => {
      // Remove carriage return (\r) from each value and split by comma
      const values = row.replace(/\r/g, "").split(",");

      // Check if the row is not empty
      if (values.length > 1) {
        if (formatType === "partsList") {
          const [name, qty] = values;
          return { name, qty };
        } else {
          return values; // Return array as is
        }
      }

      return null; // Return null for empty rows
    });

    return parsedData.filter(Boolean); // Filter out null values
  };

  return (
    <Box>
      <TextField
        label="Upload CSV"
        type="file"
        onChange={handleFileChange}
        inputRef={fileInputRef}
      />
    </Box>
  );
};
