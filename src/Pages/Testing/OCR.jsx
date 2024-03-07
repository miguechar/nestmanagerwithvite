import { TextField } from "@mui/material"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { useState } from "react"


export const OCR = () => {
    const [file, setFile] = useState([])

    return(
        <div>
            <Card>
                <CardHeader>OCR</CardHeader>
                <CardBody>
                    <div>
                        <TextField type="file" />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}