import { Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { useState } from "react";
import { TextField } from "@mui/material";

export const K2Project = () => {
    const [selectedDirectory, setSelectedDirectory] = useState(null);

    const handleDirectoryChange = (event) => {
        const files = event.target.files;
        if (files.length) {
          // Process the selected directory's files here
          console.log(files);
          setSelectedDirectory(files);
        }
      };

    return(
        <div>
            <div>
                <Card>
                    <CardHeader>Convert PC to .csv / .json</CardHeader>
                    <CardBody>
                        <div>
                            <div>
                                <input 
                                    helper_text="Select Directory"
                                    webkitdirectory="true"
                                    directory="true"
                                    type="file"
                                    onChange={handleDirectoryChange}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
