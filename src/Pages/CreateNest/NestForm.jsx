import { Card, CardHeader, Input, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  hullOptions,
  materialOptions,
  materialThickness,
} from "../../Components/Global/MenuItems";
import "../../App.css";

export const NestForm = ({
  pmaterial,
  pnestName,
  pthickness,
  pstock,
  ppo,
  pnotes,
  ppartsList,
  pplateSize,
  ppath,
  phull,
  pShipTo,
  updateNestData
}) => {
  const [nestData, setNestData] = useState({
    material: pmaterial,
    nestName: pnestName,
    thickness: pthickness,
    stock: pstock,
    po: ppo,
    notes: pnotes,
    partsList: ppartsList,
    plateSize: pplateSize,
    path: ppath,
    uid: "",
    hull: phull,
    shipTo: pShipTo,
  });

  useEffect(() => {
    updateNestData(nestData);
  }, [nestData]);

  return (
    <div className="flex flex-col gap-4">
      <div className="input-container-3column">
        <Select
          label="Hull"
          selectedKeys={[nestData.hull]}
          onChange={(e) => setNestData({...nestData, hull: e.target.value})}
        >
          {hullOptions.map((value) => (
            <SelectItem value={value.value} key={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Material"
          selectedKeys={[nestData.material]}
          onChange={(e) => setNestData({...nestData, material: e.target.value})}
        >
          {materialOptions.map((value) => (
            <SelectItem value={value.value} key={value.value}>
              {value.value}
            </SelectItem>
          ))}
        </Select>
        <Input 
          value={nestData.nestName}
          label="Nest Name"
          onChange={(e) => setNestData({...nestData, nestName: e.target.value})}
        />
        <Input 
          value={nestData.thickness}
          label="Thickness"
          onChange={(e) => setNestData({...nestData, thickness: e.target.value})}
        />
        <Input 
          label="Stock"
          value={nestData.stock}
          onChange={(e) => setNestData({...nestData, stock: e.target.value})}
        />
        <Input 
          label="PO"
          value={nestData.po}
          onChange={(e) => setNestData({...nestData, po: e.target.value})}
        />
        <Input 
          label="Notes"
          value={nestData.notes}
          onChange={(e) => setNestData({...nestData, notes: e.target.value})}
        />
        <Input 
          label="Ship To"
          value={nestData.shipTo}
          onChange={(e) => setNestData({...nestData, shipTo: e.target.value})}
        />
      </div>
    </div>
  );
};
