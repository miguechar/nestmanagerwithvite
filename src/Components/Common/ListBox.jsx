import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import { ItemCounter } from "../nextui/ItemCounter";
import { BugIcon } from "../icons/BugIcon";
import { IconWrapper } from "../icons/IconWrapper";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcons";

export default function ListBox({title, edge, clickEvent, icon}) {
  return (
    <Listbox
      aria-label="User Menu"
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
      style={{marginTop: "5px", marginBottom: "5px"}}
    >
      <ListboxItem
        key="issues"
        endContent={<ItemCounter number={edge} clickEvent={clickEvent} />}
        startContent={
          <IconWrapper className="bg-success/10 text-success">
            <VerticalDotsIcon className="text-lg"/>
          </IconWrapper>
        }
      >
        {title}
      </ListboxItem>
    </Listbox>
  );
}
