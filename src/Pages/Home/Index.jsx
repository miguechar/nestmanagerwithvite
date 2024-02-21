import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Grid } from "@mui/material";
import { NestsCutChart } from "./NestsCutChart";
import { RecentNestsList } from "./RecentNestsList";
import { PlateShopHoursChart } from "./PlateShopHoursChart";
import { LCSWidget } from "./shipWidgets/lcsWidget";
import { MMSCWidget } from "./shipWidgets/mmscwidget";
import { FFGWidget } from "./shipWidgets/ffgWidget";

export function Home() {
  async function openPDF(path) {
    const response = await fetch("http://10.102.30.12:8080/pdfopen/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paths: path }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const mergedPdfUrl = URL.createObjectURL(blob);
      window.open(mergedPdfUrl, "_blank");
    } else {
      console.error("Failed to merge PDFs");
    }
  }

  const quickLinks = [
    {
      project: "MMSC",
      name: "Standard Weld Detail",
      value:
        "U:/MMSC/01 Final Contract Documents/000/0831-074-002 C018/0831-074-002_REV(-)",
    },
    {
      project: "MMSC",
      name: "Standard Structural Detail",
      value:
        "U:/MMSC/01 Final Contract Documents/000/0831-074-001 C018/0831-074-001_REV(A)",
    },
    {
      project: "FFG",
      name: "Standard Weld Detail",
      value:
        "//fmmfs005/ENG_FINALCONTRACTS/FFG(X)/01 Final Contract Documents/000/074-001/0521-1-074-001_REV (A)",
    },
    {
      project: "FFG",
      name: "Standard Structural Detail",
      value:
        "//fmmfs005/ENG_FINALCONTRACTS/FFG(X)/01 Final Contract Documents/100/100-003 (B148_006)/0521-1-100-003_REV C",
    },
  ];

  return (
    <div>
      <div className="input-container-3column">
        <LCSWidget />
        <MMSCWidget />
        <FFGWidget />
      </div>

      <div className="input-container-4column">
        {quickLinks.map((value) => (
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{value.project}</p>
              <h4 className="font-bold text-large">{value.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Button onClick={() => openPDF(value.value)}>Open</Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="input-container-2column">
        <Card>
          <CardHeader>Nests Cut</CardHeader>
          <CardBody>
            <NestsCutChart />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Recent Nests</CardHeader>
          <CardBody>
            <RecentNestsList />
          </CardBody>
        </Card>
      </div>

      <div className="input-container-1column">
        <Card>
          <CardHeader>Plate Shop Hours</CardHeader>
          <CardBody>
            <PlateShopHoursChart />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
