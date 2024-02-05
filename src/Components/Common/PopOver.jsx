import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

export default function PopOver({ buttonTitle, message, title }) {
  return (
    <Popover placement="down">
      <PopoverTrigger>
        <Button color="secondary">{buttonTitle}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">{title}</div>
          <div className="text-tiny">{message}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
