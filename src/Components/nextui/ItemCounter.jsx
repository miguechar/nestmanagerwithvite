import React from "react";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

export const ItemCounter = ({ number, clickEvent, type }) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
    {type === "trash" ? (
      <DeleteIcon className="text-xl" onClick={() => clickEvent()} />
    ) : (
      <ChevronRightIcon className="text-xl" onClick={() => clickEvent()} />
    )}
  </div>
);
