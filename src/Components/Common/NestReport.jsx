import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import FMMWE from "../../assets/imgs/fmmwe.png";
import { useEffect } from "react";
import { useState } from "react";

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

const NestReport = ({ data, date }) => {
  const [pagesData, setPagesData] = useState([]);

  function splitArrayIntoChunks(array, chunkSize) {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }

  useEffect(() => {
    console.log(data)
    const that = splitArrayIntoChunks(data, 30);
    setPagesData(that);
  }, []);

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        {pagesData.map((pageData, pageIndex) => (
          <Page size="letter" style={styles.page}>
          <View>
            <View
              style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
            >
              <View style={{ width: "83%" }}>
                <View style={{ width: "83%" }}>
                  <Text style={{ fontSize: 15, margin: 2 }}>
                    WE Nests B30 Report
                  </Text>
                  <Text style={{ fontSize: 10, margin: 2 }}>
                    {"Parts: " + pageData.length}
                  </Text>
                  <Text style={{ fontSize: 8, margin: 2 }}>
                    {/* {"(-) Taken from inventory, () Put in inventory"} */}
                  </Text>
                </View>
              </View>
              <View style={{ alignContent: "right", width: "30%" }}>
                <View style={{ alignContent: "right", width: "30%" }}>
                  <Image
                    src={FMMWE}
                    textAlign="right"
                    style={styles.image}
                  />
                </View>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ borderBottom: 1, width: "15.5%" }}>
                <Text style={{ fontSize: 8, margin: 2 }}>Part</Text>
              </View>
              <View style={{ borderBottom: 1, width: "8%" }}>
                <Text style={{ fontSize: 8, margin: 2 }}>QTY</Text>
              </View>
              <View style={{ borderBottom: 1, width: "8%" }}>
                <Text style={{ fontSize: 8, margin: 2 }}>Desciption</Text>
              </View>
              <View style={{ borderBottom: 1, width: "20%" }}>
                <Text style={{ fontSize: 8, margin: 2 }}>WE Nest</Text>
              </View>
              <View style={{ borderBottom: 1, width: "10%" }}>
                <Text style={{ fontSize: 8, margin: 2 }}>Heat Number</Text>
              </View>
              <View style={{ borderBottom: 1, width: "10%" }}>
                <Text style={{ fontSize: 8, margin: 2 }}>S/N</Text>
              </View>
              <View style={{ borderBottom: 1, width: "10%" }}>
                <Text style={{ fontSize: 8, margin: 2 }}>Date Cut</Text>
              </View>
              <View style={{ borderBottom: 1, width: "12%" }}>
                <Text style={{ fontSize: 8, margin: 2 }}>Ship</Text>
              </View>
            </View>

            {pageData.map((value) => (
              <View>
                <View 
                  style={{
                  display: "flex",
                  flexDirection: "row",
                }}>
                  <View style={{ width: "15.5%" }}>
                    <Text style={{ fontSize: 8, margin: 2 }}>
                      {value.name}
                    </Text>
                  </View>
                  <View style={{ width: "8%" }}>
                    <Text style={{ fontSize: 8, margin: 2 }}>
                      {value.qty}
                    </Text>
                  </View>
                  <View style={{ width: "8%" }}>
                    <Text style={{ fontSize: 8, margin: 2 }}>
                      {value.stock}
                    </Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text style={{ fontSize: 8, margin: 2 }}>
                      {value.nest ? value.nest : "-"}
                    </Text>
                  </View>
                  <View style={{ width: "10%" }}>
                    <Text style={{ fontSize: 8, margin: 2 }}>
                      {value.heatNumber}
                    </Text>
                  </View>
                  <View style={{ width: "10%" }}>
                    <Text style={{ fontSize: 8, margin: 2 }}>
                      {value.serialNumber}
                    </Text>
                  </View>
                  <View style={{ width: "10%" }}>
                    <Text style={{ fontSize: 8, margin: 2 }}>
                      {value.dateCut}
                    </Text>
                  </View>
                  <View style={{ width: "12%" }}>
                    <Text style={{ fontSize: 8, margin: 2 }}>
                      {value.shipTo}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            <Text style={styles.footer}>
            {"Generated on: " + date + ", Page " + (pageIndex + 1) + " of " + pagesData.length}
            </Text>
          </View>
        </Page>

        ))}
      </Document>
    </PDFViewer>
  );
};

export default NestReport;
