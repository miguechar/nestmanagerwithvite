import { Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export const AddPlate = () => {
  const [plate, setPlate] = useState({
    material: "",
    size: "",
    thickness: "",
    stock: "",
  });

  return (
    <div>
      <div>
        <Select
          label="Material"
          onChange={(e) => setPlate({ ...plate, material: e.target.value })}>
          <SelectItem value={"A-36"} key={"A-36"} textValue="A-36">
            "A-36"
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};
