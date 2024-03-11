import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { getFB, updateFB } from "../../Components/Global/functions/firebase";
import Dialog from "../../Components/Common/Dialog";
import { ip, port } from "../../Config";

export const RecordNestData = () => {
  const [message, setMessage] = useState("Server loading...");
  const [nestUid, setNestUid] = useState("");
  const [nestdata, setNestData] = useState("");
  const [nestsdb, setNestsdb] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  });

  function fetchNest(e) {
    e.preventDefault();
    const selectedNest = nestsdb.filter((value) => value.uid === nestUid);

    // if a nest is found set state of nestdata
    if (selectedNest) {
      setNestData({...selectedNest[0], status: "Cut"});
      console.log(selectedNest[0])
    } else {
      const footer = (
        <div>
          <Button color="danger" onClick={() => handleDialogClose()}>
            Close
          </Button>
        </div>
      );
      setDialog({ open: true, title: "Nest Not Found :(", footer: footer });
    }
  }

  const fetchData = async () => {
    const nests = await getFB("/nests");

    if (Array.isArray(nests)) {
      // Sort the nests array by the 'addedon' date in ascending order
      const sortedNests = nests.sort((a, b) => {
        const dateA = new Date(a.addedon);
        const dateB = new Date(b.addedon);
        return dateB - dateA; // Ascending order
      });

      setNestsdb(sortedNests);
    }
  };

  function handleDialogClose() {
    setDialog({ ...dialog, open: false });
  };

  async function updateNestData() {
    const path = nestdata.path + "\\" + nestdata.nestName + ".pdf"; // Assuming this forms your PDF path
    const text = `\nCut on: ${nestdata.dateCut}\nHeat Number: ${nestdata.heatNumber}\nMic: ${nestdata.micthkns}\nSN: ${nestdata.serialNumber}`;
    const position = [100, 100]; // Example position, adjust as necessary
    const page_number = 0; // Example page number
    
    const requestBody = {
        input_pdf_path: path,
        output_pdf_path: path, // Assuming you're writing back to the same file
        text: text,
        position: position,
        page_number: page_number,
    };

    try {
        const response = await fetch("http://" + ip + ":" + port + "/update_nest_data", { // Update your Flask app's URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        if (responseData.status === 'success') {
            console.log("PDF updated successfully");
            // Handle success (e.g., showing a success message)
        } else {
            // Handle failure (e.g., showing an error message)
        }
    } catch (error) {
        console.error("Failed to update PDF:", error);
        // Handle error (e.g., showing an error message)
    }

    const fbpath = ("nests/" + nestdata.uid + "/");
    const updatedNest = {...nestdata, status: "Cut"}
    updateFB(fbpath, nestdata);
    setNestData()

    const footer = (
        <div>
          <Button color="danger" onClick={() => handleDialogClose()}>
            Close
          </Button>
        </div>
      );
      setDialog({ open: true, title: nestdata.nestName +  " Updated!", footer: footer });
  }

  useEffect(() => {
    // fetch("http://127.0.0.1:8080/api/home")
    //   .then((response) => response.json())
    //   .then((data) => setMessage(data.message));

    fetchData();
  }, []);

  return (
    <div>
      <div className="input-container-2column">
        <Card>
          <CardHeader>Hello World!</CardHeader>
          <CardBody>
            <form onSubmit={fetchNest}>
              <div className="input-container-2column">
                <Input
                  label="Nest UID"
                  value={nestUid}
                  onChange={(e) => setNestUid(e.target.value)}
                />
                <Select
                  label="Choose From Recent Nests.."
                  onChange={(e) => setNestUid(e.target.value)}>
                  {nestsdb.map((value) => (
                    <SelectItem key={value.uid} value={value.uid}>
                      {value.nestName}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                <Button color="primary" onClick={fetchNest} type="submit">
                  Enter
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
      {nestdata ? (
        <div>
          <div className="input-container-2column">
            <Card>
              <CardHeader>Nest:</CardHeader>
              <CardBody>
                <div>
                  <p>{"Nest Name: " + nestdata.nestName}</p>
                  <p>{"Stock: " + nestdata.stock}</p>
                  <p>{"Notes: " + nestdata.notes}</p>
                  <p>{"Created On: " + nestdata.addedon}</p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Parts List:</CardHeader>
              <CardBody>
                <div>
                  {nestdata.parts.map((value) => (
                    <div>{value.name}</div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="input-container-1column">
            <Card>
              <CardHeader>Data to Input</CardHeader>
              <CardBody>
                <div>
                  <div className="input-container-4column">
                    <Input
                      label="Heat Number"
                      value={nestdata.heatNumber}
                      onChange={(e) =>
                        setNestData({ ...nestdata, heatNumber: e.target.value })
                      }
                    />
                    <Input
                      label="Mic Thnks"
                      value={nestdata.micthkns}
                      onChange={(e) =>
                        setNestData({ ...nestdata, micthkns: e.target.value })
                      }
                    />
                    <Input
                      label="Cut By"
                      value={nestdata.cutBy}
                      onChange={(e) =>
                        setNestData({ ...nestdata, cutBy: e.target.value })
                      }
                    />
                    <Input
                      label="Date"
                      type="date"
                      value={nestdata.dateCut}
                      onChange={(e) =>
                        setNestData({ ...nestdata, dateCut: e.target.value })
                      }
                    />
                    <Input
                      label="Serial Number"
                      value={nestdata.serialNumber}
                      onChange={(e) =>
                        setNestData({ ...nestdata, serialNumber: e.target.value })
                      }
                    />
                    <Input
                      label="Notes by Operator"
                      value={nestdata.notesByOperator}
                      onChange={(e) =>
                        setNestData({ ...nestdata, notesByOperator: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ textAlign: "right", marginTop: "10px" }}>
                    <Button color="primary" onClick={() => updateNestData()}>Submit</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div>
        <Dialog
          open={dialog.open}
          title={dialog.title}
          body={dialog.body}
          footer={dialog.footer}
          onClose={handleDialogClose}
        />
      </div>
    </div>
  );
};
