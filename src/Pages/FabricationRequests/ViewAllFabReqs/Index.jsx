import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SplittedAccordion } from "../../../Components/Common/Accordion";
import { getFB } from "../../../Components/Global/functions/firebase";
import { Box } from "@mui/material";
import { FabricationPDF } from "../../../Components/PDF/FabReqPDF";
import { SearchIcon } from "../../../Components/icons/SearchIcon";
import {
  updateFB,
  deleteFB,
} from "../../../Components/Global/functions/firebase";
import { auth } from "../../../Config";
import SnackBarComponent from "../../../Components/Common/Snackbar";

export const ViewAllFabs = () => {
  const [fabrequests, setFabrequests] = useState([]);
  const [filterValues, setFilterValues] = useState({
    filter: "",
    filteredArray: [],
  });
  const [SnackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  function handleSnackBarClose() {
    setSnackBar({
      ...SnackBar,
      open: false,
    });
  }

  function deleteFabReq(fab) {
    const path = "/fabricationRequests/fabricationRequests/" + fab.uid;
    deleteFB(path);
    setSnackBar({
      open: true,
      message: "Fab Request has been deleted success",
      severity: "success",
    });
    fetchData();
  }

  function markFloor(value) {
    // un mark from the floor
    if (value.sentToFloor === "yes") {
      updateFB("/fabricationRequests/fabricationRequests/" + value.uid, {
        sentToFloor: "no",
      });
      fetchData();
    }
    if (value.sentToFloor === "no") {
      updateFB("/fabricationRequests/fabricationRequests/" + value.uid, {
        sentToFloor: "yes",
      });
      fetchData();
    }
  }

  const fetchData = async () => {
    const fabreq = await getFB("/fabricationRequests/fabricationRequests");

    if (Array.isArray(fabreq)) {
      setFabrequests(fabreq);
    }
  };

  function handleFilter(filter) {
    let filteredFabs = [];
    switch (filter) {
      case "All Items":
        break;
      case "Sent To Floor":
        filteredFabs = fabrequests.filter(
          (value) => value.sentToFloor === "yes"
        );
        break;
      case "Not Sent to Floor":
        filteredFabs = fabrequests.filter(
          (value) => value.sentToFloor === "no"
        );
        break;
      case "Not Completed":
        filteredFabs = fabrequests.filter((value) => value.dateCompleted == "");
        break;
      case "All Completed":
        filteredFabs = fabrequests.filter(
          (value) => value.dateCompleted !== ""
        );
        break;
      case "Checked":
        filteredFabs = fabrequests.filter(
          (value) => value.engineeredChecked === "yes"
        );
        break;
      case "Not Checked":
        filteredFabs = fabrequests.filter(
          (value) => value.engineeredChecked === "no"
        );
        break;
        case "Rejected":
          filteredFabs = fabrequests.filter(
            (value) => value.rejected === "yes"
          );
          break;
      default:
        break;
    }
    setFilterValues({ filter: filter, filteredArray: filteredFabs });
  }

  function handlePOSearch(po) {
    let filteredFabs = [...fabrequests];
    if (po.length > 0) {
      filteredFabs = fabrequests.filter((value) =>
        value.po.toLowerCase().includes(po.toLowerCase())
      );
      setFilterValues({ ...filterValues, filteredArray: filteredFabs });
    } else {
      setFilterValues({ ...filterValues, filteredArray: filteredFabs });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>All Fabrication Requests</CardHeader>
          <CardBody>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                marginRight: "13px",
                marginLeft: "13px",
                marginBottom: "5px",
              }}>
              <Input
                startContent={<SearchIcon />}
                placeholder="Search by PO..."
                onValueChange={handlePOSearch}
              />
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    {filterValues.filter ? filterValues.filter : "Filter"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  selectedKeys={filterValues.filter}
                  onAction={(key) => handleFilter(key)}>
                  <DropdownItem key="All Items">All Items</DropdownItem>
                  <DropdownItem key="Sent To Floor">Sent To Floor</DropdownItem>
                  <DropdownItem key="Not Sent to Floor">
                    Not Sent to Floor
                  </DropdownItem>
                  <DropdownItem key="Not Completed">Not Completed</DropdownItem>
                  <DropdownItem key="All Completed">All Completed</DropdownItem>
                  <DropdownItem key="Checked">Checked</DropdownItem>
                  <DropdownItem key="Not Checked">Not Checked</DropdownItem>
                  <DropdownItem key="Rejected">Rejected</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              {(filterValues.filteredArray.length > 0
                ? filterValues.filteredArray
                : fabrequests
              )
                .slice()
                .sort((a, b) => {
                  const getSequentialNumber = (frNo) =>
                    parseInt(frNo.split("-").pop());
                  return (
                    getSequentialNumber(b.frNo) - getSequentialNumber(a.frNo)
                  );
                })
                .map((value) => (
                  <div>
                    <SplittedAccordion
                      title={
                        <div className="input-container-3column">
                          {value.frNo}
                          <div className="input-container-1column">
                            {value.module + ", " + value.project}
                          </div>
                          <div>
                            {value.rejected === "yes" ? (
                              <div
                                className="input-container-2column"
                                style={{ display: "flex" }}>
                                <div>
                                  <Chip color="danger">Rejected</Chip>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="input-container-2column"
                                style={{ display: "flex" }}>
                                <div>
                                  {value.engineeredChecked === "yes" ? (
                                    <Chip color="success">Checked</Chip>
                                  ) : (
                                    <Chip color="warning">Not Checked</Chip>
                                  )}
                                </div>
                                <div>
                                  {value.dateCompleted ? (
                                    <Chip color="success">Completed</Chip>
                                  ) : (
                                    <Chip color="warning">Not Completed</Chip>
                                  )}
                                </div>
                                <div>
                                  {value.dateCompleted ? (
                                    <div></div>
                                  ) : (
                                    <div>
                                      {" "}
                                      {value.sentToFloor === "no" ? (
                                        <div></div>
                                      ) : (
                                        <Chip color="success">
                                          Sent to Floor
                                        </Chip>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      }
                      content={
                        <div>
                          <div>
                            <div>
                              {value.rejectionMessage ? (
                                <p>{value.rejectionMessage}</p>
                              ) : (
                                <p></p>
                              )}
                              <p>
                                Date Required:
                                {value.dateRequiered
                                  ? value.dateRequiered
                                  : "-"}
                              </p>
                              <p>
                                Date Requested: {value.date ? value.date : "-"}
                              </p>
                              <p>
                                Project: {value.project ? value.project : "-"}
                              </p>
                              <p>
                                Requested By:{" "}
                                {value.requestedBy ? value.requestedBy : "-"}
                              </p>
                              <p>PO: {value.po ? value.po : "-"}</p>
                              <p>
                                PO Name: {value.poName ? value.poName : "-"}
                              </p>
                              <p>
                                Ship To: {value.shipTo ? value.shipTo : "-"}
                              </p>
                            </div>
                            <Box mt={"10px"} height={"800px"}>
                              <FabricationPDF data={value} />
                            </Box>

                            <div
                              style={{
                                justifyContent: "space-between",
                                display: "flex",
                                marginTop: "10px",
                              }}>
                              {value.requestedBy ===
                              auth?.currentUser?.email ? (
                                <div>
                                  <Button
                                    color="danger"
                                    onClick={() => deleteFabReq(value)}>
                                    Delete
                                  </Button>
                                </div>
                              ) : (
                                <div></div>
                              )}

                              <div>
                                <Button
                                  onClick={() => markFloor(value)}
                                  color={
                                    value.sentToFloor === "no"
                                      ? "success"
                                      : "danger"
                                  }>
                                  {value.sentToFloor === "no"
                                    ? "Mark as sent to Floor"
                                    : "Mark as NOT sent to Floor"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                ))}
            </div>

            <div>
              <SnackBarComponent
                open={SnackBar.open}
                message={SnackBar.message}
                severity={SnackBar.severity}
                onClose={handleSnackBarClose}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
