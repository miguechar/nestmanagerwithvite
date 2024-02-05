import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
    Note,
    Link
  } from "@react-pdf/renderer";
  
  const styles = StyleSheet.create({
    page: {
      color: "black",
      margin: 10,
      flexDirection: "row",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: "100%",
      height: "100%",
      marginBottom: 5,
    },
    s1: {
      margin: 10,
      padding: 10,
      color: "black",
      fontSize: 13,
      textAlign: "right",
    },
    boxSection: {
      border: 1,
      width: "50%",
    },
    table: {
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #EEE",
      paddingTop: 8,
      paddingBottom: 8,
    },
    row1: {
      width: "35%",
      border: 1,
      fontSize: 15,
    },
    row2: {
      width: "25%",
      border: 1,
      fontSize: 15,
    },
    row3: {
      width: "15%",
      border: 1,
      fontSize: 15,
    },
    row4: {
      width: "20%",
      border: 1,
      fontSize: 15,
    },
    row5: {
      width: "27%",
      border: 1,
      fontSize: 15,
    },
    imageContainer: {
      flexGrow: 1, // Allow the image to take the remaining space
      display: "flex",
      justifyContent: "flex-end", // Align the content to the right
      marginRight: 10, // Add margin for spacing
    },
    image: {
      width: 140, // Set the width of the image
      height: 45, // Set the height of the image
      justifyContent: "flex-end",
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 10,
      color: "gray",
    },
  });
  
  export const FabricationPDF = ({ data }) => {
    
    return (
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size={"letter"} style={styles.page}>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View style={{ width: "100%" }}>
                    <Text
                      style={{ fontSize: 15, margin: 2, textAlign: "center" }}>
                      {"Fabrication Shop Work Request Form: " + data.frNo}
                    </Text>
                  </View>
                </View>
              </View>
  
              {/* Row 1 */}
  
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  width: "100%",
                }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Date:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.date ? data.date : "-"}
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Comp# (for Paint):
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.comp ? data.comp : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 2 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Date Required:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.dateRequiered ? data.dateRequiered : "-"}
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Material Provided:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.materialProvided ? data.materialProvided : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 3 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Requested By:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.requestedBy ? data.requestedBy : "-"}
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Material Location:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.materialLocation ? data.materialLocation : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 4 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Project:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.project ? data.project : "-"}
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    DWG:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.dwg ? data.dwg : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 5 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Module:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.module ? data.module : "-"}
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Sheet/Zone:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.sheetZone ? data.sheetZone : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 6 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Prod Order:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.po ? data.po : "-"}
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    ECN/FCN:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.ecnfcn ? data.ecnfcn : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 7 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    PO Name:
                  </Text>
                </View>
  
                <View style={{ width: "72%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.poName ? data.poName : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 8 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Ship:
                  </Text>
                </View>
  
                <View style={{ width: "72%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "center" }}>
                    {data.shipTo ? data.shipTo : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 9 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%" }}>
                  <Text
                    style={{
                      fontSize: 7,
                      margin: 2,
                      textAlign: "left",
                      marginTop: 20,
                    }}>
                    Brief Description of work Requested:
                  </Text>
                </View>
              </View>
  
              {/* Row 10 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "96%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "left" }}>
                    {data.briefDescription ? data.briefDescription : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 11 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%" }}>
                  <Text
                    style={{
                      fontSize: 7,
                      margin: 2,
                      textAlign: "left",
                      marginTop: 20,
                    }}>
                    Detailed Instructions/Sketch:
                  </Text>
                </View>
              </View>
  
              {/* Row 12 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "96%", border: 1 }}>
                  <Text
                    style={{
                      fontSize: 8,
                      margin: 2,
                      textAlign: "left",
                      height: 250,
                    }}>
                    {data.detailedInstructions ? data.detailedInstructions : "-No Detail Instructions Provided\n\n"}
                    {data.partsList ? (
                      data.partsList.map((value, index) => (
                        <Text key={index}>
                          {"-" + value.name + ", qty: " + value.qty}
                          {"\n"}
                        </Text>
                      ))
                    ) : (
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 2,
                          textAlign: "left",
                          height: 250,
                        }}>
                        No Parts List Provided
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
  
              {/* Row 13 */}
  
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 15,
                }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Shop assigned to:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "left" }}>
                    {data.shopAssigned ? data.shopAssigned : "-"}
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Person Worked:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "left" }}>
                    {data.personWorked2 ? data.personWorked1 + " / " + data.personWorked2 : data.personWorked1}
                  </Text>
                </View>
              </View>
  
              {/* Row 13 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Date Completed:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "left" }}>
                    {data.dateCompleted ? data.dateCompleted : "-"}
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "right" }}>
                    Hours Worked:
                  </Text>
                </View>
  
                <View style={{ width: "24%", border: 1 }}>
                  <Text style={{ fontSize: 8, margin: 2, textAlign: "left" }}>
                    {data.hoursWorked ? data.hoursWorked : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 14 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%" }}>
                  <Text
                    style={{
                      fontSize: 7,
                      margin: 2,
                      textAlign: "left",
                      marginTop: 20,
                    }}>
                    Shop Notes:
                  </Text>
                </View>
              </View>
  
              {/* Row 15 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "96%", border: 1 }}>
                  <Text
                    style={{
                      fontSize: 8,
                      margin: 2,
                      textAlign: "left",
                      height: 70,
                    }}>
                    {data.shopNotes ? data.shopNotes : "-"}
                  </Text>
                </View>
              </View>
  
              {/* Row 16 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "24%" }}>
                  <Text
                    style={{
                      fontSize: 7,
                      margin: 2,
                      textAlign: "left",
                      marginTop: 20,
                    }}>
                    Engineering Notes:
                  </Text>
                </View>
              </View>
  
              {/* Row 17 */}
  
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <View style={{ width: "96%", border: 1 }}>
                  <Text
                    style={{
                      fontSize: 8,
                      margin: 2,
                      textAlign: "left",
                      height: 70,
                    }}>
                    {data.engineeringNotes ? (data.engineeringNotes + "\n") : "No Notes...\n"}
                    {data.engineeredChecked === "yes" ? (
                      data.path ? (
                        data.path 
                      ) : (
                        <Text
                          style={{
                            fontSize: 8,
                            margin: 2,
                            textAlign: "left",
                            height: 70,
                          }}>
                          {data.partsList
                            ? data.partsList.map((value, index) => (
                              <View>
                                <Text
                                  key={index}
                                  style={{
                                    fontSize: 8,
                                    margin: 2,
                                    textAlign: "left",
                                    height: 70,
                                  }}>
                                  {"-" + value.name +
                                    ", path: " +
                                    (value.path || "N/A")}
                                </Text>
                                <Link style={{fontSize: 7}} src={value.path + ".pdf"}> 
                                  Click me to View PDF
                                </Link>
                                <Text>{"\n"}</Text>
                              </View>
                              ))
                            : "No parts list available"}
                        </Text>
                      )
                    ) : (
                      <Text>Not Checked Yet</Text>
                    )}
                  </Text>
                  
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  };
  