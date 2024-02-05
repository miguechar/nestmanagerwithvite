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
  return (
    <div>
      <div className="input-container-3column">
        <LCSWidget />
        <MMSCWidget />
        <FFGWidget />
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
