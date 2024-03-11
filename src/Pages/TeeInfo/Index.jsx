import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { MMSCTee } from "./MMSCTee"
import { FFGTee } from "./FFGTee"


export const TeeInfo = () => {

    return(
        <div>
            <div className="input-container-1column">
                <Card>
                    <CardHeader>MMSC Tee</CardHeader>
                    <CardBody>
                        <MMSCTee />
                    </CardBody>
                </Card>
            </div>
            <div className="input-container-1column">
                <Card>
                    <CardHeader>FFG Tee</CardHeader>
                    <CardBody>
                        <FFGTee />
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}