import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react"
import { useEffect } from "react";
import { useState } from "react"
import { getFB, setFB } from "../../../Components/Global/functions/firebase";
import { useLocation } from "react-router-dom";
import DataTable from "../../../Components/Common/DataTable/Index";

export const ProjectMaterial = ({moduleUid}) => {
    const [newMaterial, setNewMaterial] = useState({
        materialName: "",
        materialKey: "",
        density: "",
        UTS: "",
        YTS: ""
    });
    const [material, setMaterial] = useState([])

    async function fetchProjectMaterial() {
        const path = "Projects/" + moduleUid + "/material";
        const projectMaterial = await getFB(path);
        setMaterial(projectMaterial);
    };

    function handleTableClick(value) {
        console.log(value)
    };

    function handleMaterialSubmit() {
        setFB("Projects/" + moduleUid + "/material", newMaterial)
        setNewMaterial([])
        fetchProjectMaterial();
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
        fetchProjectMaterial();
    }, [])

    return(
        <div>
            <div>
                <Card>
                    <CardHeader>
                        Material
                    </CardHeader>
                    <CardBody>
                        <div>
                            <div className="input-container-6column">
                                <Input label="Material" onChange={(e) => setNewMaterial({...newMaterial, materialName: e.target.value})} />
                                <Input label="Material Key" onChange={(e) => setNewMaterial({...newMaterial, materialKey: e.target.value})} />
                                <Input label="Density" onChange={(e) => setNewMaterial({...newMaterial, density: e.target.value})} />
                                <Input label="UTS" onChange={(e) => setNewMaterial({...newMaterial, UTS: e.target.value})} />
                                <Input label="YTS" onChange={(e) => setNewMaterial({...newMaterial, YTS: e.target.value})} />
                            </div>
                            <div style={{textAlign: "right"}}>
                                <Button color="primary" onClick={() => handleMaterialSubmit()}>Enter</Button>
                            </div>
                            <div style={{margin: "10px"}}>
                                <Divider />
                            </div>
                            <div>
                                <DataTable initialColumns={initialColumns} columns={columns} rows={material.length > 0 ? material : []} updateParent={handleTableClick} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}