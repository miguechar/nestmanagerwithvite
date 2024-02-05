import React from "react";
import {
  RadioGroup,
  Radio,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

export default function RadioGroupComponent({  title, subtitle, selectedValue, onSelectionChange }) {
  return (
    <div style={{ marginTop: "7px" }}>
      <RadioGroup
        value={selectedValue}
        onChange={(e) => onSelectionChange(e.target.value)}
      >
        <div className="w-full">
          <Card className="w-full flex justify-between gap-2">
            <CardBody>
              <Radio value={title}>
                <div>
                  <div>{title}</div>
                  <div>{subtitle}</div>
                </div>
              </Radio>
            </CardBody>
          </Card>
        </div>
      </RadioGroup>
    </div>
  );
}
