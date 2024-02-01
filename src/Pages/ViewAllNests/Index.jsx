import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Grid } from "@mui/material";
import { NestsDataTable } from "./NestsDataTable";

export function ViewAllNests() {
  return (
    <div>
      <div>
        <Grid container spacing={"20px"} mb={"100px"}>
          <Grid item xs={12}>
            <Card>
              <CardHeader>All Nests</CardHeader>
              <CardBody>
                <NestsDataTable />
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
