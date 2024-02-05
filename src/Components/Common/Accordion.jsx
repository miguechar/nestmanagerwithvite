import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export const SplittedAccordion = ({ title, content }) => {
  return (
    <div className="input-container-1column" style={{marginTop: "1px"}}>
      <Accordion variant="splitted">
        <AccordionItem key="1" aria-label="Accordion 1" title={title}>
          {content}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
