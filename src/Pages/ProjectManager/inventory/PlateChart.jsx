import { useEffect, useState } from "react"
import { getFB } from "../../../Components/Global/functions/firebase";


export const PlateChart = () => {
    const [inventory, setInventory] = useState([]);

    async function fetchInventory() {
        const inventory = await getFB("Projects/" + localStorage.getItem("project") + "/Inventory");
        setInventory(inventory)
    }

    useEffect(() => {
        fetchInventory()
    }, [])
    
    return(
        <div>

        </div>
    )
}