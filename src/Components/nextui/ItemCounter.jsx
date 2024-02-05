import React from "react";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";

export const ItemCounter = ({number, clickEvent}) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
    <ChevronRightIcon className="text-xl" onClick={() => clickEvent()} />
  </div>
);
