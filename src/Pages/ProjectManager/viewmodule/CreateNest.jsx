import { Card, CardBody, CardHeader, Input, Select } from "@nextui-org/react"
import { PartsListCreate } from "../../../Components/Common/PartsListCreate"
import { useState } from "react"
import { m } from "framer-motion"


export const CreateNest = ({selectedModule, projectUID}) => {
    const [newNest, setNewNest] = useState({
        name: "",
        module: selectedModule,
        partsList: []
    });

    
    return(
        <div>
            <div>
                <Card>
                    <CardHeader>
                        Create Nest
                    </CardHeader>
                    <CardBody>
                        <div>
                            <div className="input-container-6column">
                                <Select label="Plate"></Select>
                            </div>
                            <div>
                                <PartsListCreate />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}