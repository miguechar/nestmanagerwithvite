import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { useEffect } from "react";
import { useState } from "react"
import { getFB, setFB } from "../../../Components/Global/functions/firebase";
import { useLocation } from "react-router-dom";
import DataTable from "../../../Components/Common/DataTable/Index";

export const ProjectSTD = ({moduleUid}) => {
    const [newMaterial, setNewMaterial] = useState({
        materialName: "",
        materialKey: "",
        density: "",
        UTS: "",
        YTS: ""
    });
    const [standardDetail, setStandardDetail] = useState([])
    const [newStandardDetail, setNewStandardDetail] = useState({
        viewport: ""
    })

    async function fetchStandardDetails() {
        const path = "Projects/" + moduleUid + "/StandardDetail";
        const standardDetail = await getFB(path);
        setStandardDetail(standardDetail);
    };

    function handleTableClick(value) {
        console.log(value)
    };

    function handleMaterialSubmit() {
        setFB("Projects/" + moduleUid + "/StandardDetail", newStandardDetail)
        setNewStandardDetail([])
        fetchStandardDetails();
    }

    const initialColumns = [
        "materialName",
        'materialKey',
        "density",
        "UTS" ,
        "YTS",
      ];

    const columns = [
        { name: "UID", uid: "uid", sortable: true },
        { name: "Material", uid: "materialName", sortable: true },
        { name: "Key", uid: "materialKey", sortable: true },
        { name: "Density", uid: "density", sortable: true },
        { name: "UTS", uid: "UTS", sortable: true },
        { name: "YTS", uid: "YTS", sortable: true },
    ];

    useEffect(() => {
        fetchStandardDetails();
    }, [])

    return(
        <div>
            <div>
                <Card>
                    <CardHeader>
                        Standard Details
                    </CardHeader>
                    <CardBody>
                        <div>
                            <div className="input-container-6column">
                                <Input label="Viewport" onChange={(e) => setNewStandardDetail({...newStandardDetail, materialName: e.target.value})} />
                                <Input label="Material Key" onChange={(e) => setNewMaterial({...newMaterial, materialKey: e.target.value})} />
                                <Input label="Category" onChange={(e) => setNewMaterial({...newMaterial, materialKey: e.target.value})} />
                            </div>
                            <div style={{textAlign: "right"}}>
                                <Button color="primary" onClick={() => handleMaterialSubmit()}>Enter</Button>
                            </div>
                            <div style={{margin: "10px"}}>
                                <Divider />
                            </div>
                            <div>
                                <DataTable initialColumns={initialColumns} columns={columns} rows={standardDetail.length > 0 ? standardDetail : []} updateParent={handleTableClick} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}