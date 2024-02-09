import React from "react";
import { CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox";
import { TruncatedString } from "../Processing/MaxLengthString";
import { useEffect } from "react";

export default function CheckBoxList({ label, data, updateparent }) {
  const [groupSelected, setGroupSelected] = React.useState([]);

  function updateParent() {
    updateparent(groupSelected)
  }

  useEffect(() => {
    updateParent()
  }, [groupSelected])

  return (
    <div
      className="flex flex-col gap-1 w-full"
      style={{ width: "100%", display: "flex" }}>
      <CheckboxGroup
        label={label}
        value={groupSelected}
        style={{ width: "100%", display: "flex" }}
        onChange={setGroupSelected}
        classNames={{
          base: "w-full",
        }}>
        {data.map((value) => (
          <div>
            <CustomCheckbox
              value={value.name}
              user={{
                name: value.name,
                avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
                description: <TruncatedString string={value.path} maxLength={"22"} />,
                url: "https://twitter.com/jrgarciadev",
                role: "Build Stage: " + value.buildStage,
                status: value.progress,
              }}
              statusColor= {value.progress === "Complete" ? "primary" : "secondary"}
            />
          </div>
        ))}
      </CheckboxGroup>
      <p className="mt-4 ml-1 text-default-500">
        Selected: {groupSelected.join(", ")}
      </p>
    </div>
  );
}
