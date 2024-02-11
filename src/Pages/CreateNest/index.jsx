import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import PDFParse from "../../Components/Processing/PDFParse";
import { NestForm } from "./NestForm";
import { PartsListCreate } from "../../Components/Common/PartsListCreate";
import { SubmitNest } from "./SubmitNest";
import { QRCodeGenerator } from "../../Components/Processing/QRGenerator";
import { getTodayDate } from "../../Components/Global/functions/firebase";
import { auth } from "../../Config";

export const CreateNest = () => {
  const todaysDate = getTodayDate();
  const currentUser = auth?.currentUser?.email;
  const [nestData, setNestData] = useState({
    addedBy: currentUser,
    material: "",
    hull: "",
    nestName: "",
    thickness: "",
    stock: "",
    po: "",
    notes: "",
    plateSize: "",
    partsList: [],
    path: "",
    open: false,
    shipTo: "",
    addedon: todaysDate,
    // to add data
    status: "Not Cut",
    uploadMethod: "",
    serialNumber: "-",
    heatNumber: "-",
    micthkns: "-",
    cutBy: "-",
    date: "-",
    notesByOperator: "-",
  });

  // function that comes from PDFParse
  function updateParentState(value) {
    setNestData({
      ...nestData,
      material: value.material,
      hull: value.hull,
      nestName: value.nestName,
      thickness: value.thickness,
      stock: value.stock,
      po: value.po,
      notes: value.notes,
      plateSize: value.plateSize,
      partsList: value.partsList,
      path: value.path,
      shipTo: value.shipTo,
      open: true,
    })
  }

  // from createPartsList
  function updatePartsList(partsList) {
    setNestData({ ...nestData, partsList: partsList });
  }

  // from submitNest
  function RegisterSubmit(uid) {
    setNestData({ ...nestData, register: true, uid: uid });
  };

  // from nest form if any changes
  function updateNestData(newState) {
    setNestData({
      ...nestData,
      material: newState.material,
      hull: newState.hull,
      nestName: newState.nestName,
      thickness: newState.thickness,
      stock: newState.stock,
      po: newState.po,
      notes: newState.notes,
      plateSize: newState.plateSize,
      partsList: newState.partsList,
      path: newState.path,
      shipTo: newState.shipTo,
      open: true,
    })
  }

  return (
    <div>
      <div className="input-container-2column">

        <Card>
          <CardHeader>Method</CardHeader>
          <CardBody>
            <div className="input-container-3column">
              <Button
                color="success"
                onClick={() =>
                  setNestData({ ...nestData, uploadMethod: "automatic" })
                }>
                Automatic
              </Button>
              <Button
                color="danger"
                onClick={() => setNestData({open: false })}>
                Clear
              </Button>
              <Button
                color="primary"
                onClick={() =>
                  setNestData({
                    ...nestData,
                    uploadMethod: "manual", open: true
                  })
                }>
                Manual
              </Button>
            </div>
          </CardBody>
        </Card>

        <div>
          {nestData.uploadMethod === "automatic" ? (
            <Card>
              <CardHeader>Upload PDF</CardHeader>
              <CardBody>
                <div>
                  <PDFParse
                    updateParentState={updateParentState}
                    formatType={"nestTape"}
                  />
                </div>
              </CardBody>
            </Card>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div>
        {nestData.open ? (
          <div className="input-container-1column">
            <div>
              <Card>
                <CardHeader>Nest Form</CardHeader>
                <CardBody>
                  <NestForm
                    pmaterial={nestData.material}
                    pnestName={nestData.nestName}
                    pthickness={nestData.thickness}
                    pstock={nestData.stock}
                    ppo={nestData.po}
                    pnotes={nestData.notes}
                    ppartsList={nestData.partsList}
                    pplateSize={nestData.plateSize}
                    ppath={nestData.path}
                    phull={nestData.hull}
                    pShipTo={nestData.shipTo}
                    updateNestData={updateNestData}
                  />
                </CardBody>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>Parts List</CardHeader>
                <CardBody>
                  <div>
                    <PartsListCreate
                      partsList={nestData.partsList}
                      updatePartsList={updatePartsList}
                      formatType={"partsList"}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
            {nestData.partsList.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}>
                <Card>
                  <CardHeader>Submit</CardHeader>
                  <CardBody>
                    <SubmitNest
                      nestData={nestData}
                      registerSuccess={RegisterSubmit}
                    />
                  </CardBody>
                </Card>
                {nestData.uid ? (
                  <Card>
                    <CardHeader>QR</CardHeader>
                    <CardBody>
                      <QRCodeGenerator value={nestData.uid} />
                    </CardBody>
                  </Card>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
