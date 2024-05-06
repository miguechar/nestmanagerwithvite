import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownTrigger,
  Input,
  DropdownItem,
  DropdownMenu,
  Divider,
  CardFooter,
  Switch,
  Image,
} from "@nextui-org/react";
import { useState, useMemo, useEffect } from "react";
import { ChevronRightIcon } from "../../Components/icons/ChevronRightIcon";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { ShipCustomIcon } from "../../Components/icons/ShipIcon";
import lcs23 from "../../assets/imgs/lcs23.jpeg";
import lcs25 from "../../assets/imgs/lcs25.avif";
import lcs21 from "../../assets/imgs/lcs21.png";
import lcs27 from "../../assets/imgs/lcs27.png";
import lcs29 from "../../assets/imgs/lcs29.jpg";
import lcs31 from "../../assets/imgs/lcs31.jpg";

export const SearchTrialCard = ({ dataset }) => {
  const [filter, setFilter] = useState("");
  const [searched, setSearched] = useState([]);
  const navigate = useNavigate();
  const [totalTrialCards, setTotalTrialCards] = useState(0);

  const selectedValue = useMemo(
    () => Array.from(filter).join(", ").replaceAll("_", " "),
    [filter]
  );

  const filterOptions = [
    {
      name: "Trial Card #",
    },
    {
      name: "COMPARTMENT",
    },
    {
      name: "Narrative",
    },
  ];

  function handleFilter(value) {
    if (value.length > 3) {
      let filtered = [];
      for (let i = 0; i < dataset.length; i++) {
        const searched = dataset[i].data.filter(
          (item) =>
            item[selectedValue] &&
            item[selectedValue].toLowerCase().includes(value.toLowerCase())
        );
        if (searched.length > 0) {
          filtered.push({ trialcard: searched, vessel: dataset[i].vessel });
        }
      }
      setSearched(filtered);
    }
  }

  function handleViewTrialCard(value, e) {
    e.stopPropagation();
    navigate("viewTrialCard", { state: { data: value } });
  }

  const lcsimages = [
    {
      name: "LCS 21",
      image: lcs21,
    },
    {
      name: "LCS 23",
      image: lcs23,
    },
    {
      name: "LCS 25",
      image: lcs25,
    },
    {
      name: "LCS 27",
      image: lcs27,
    },
    {
      name: "LCS 29",
      image: lcs29,
    },
    {
      name: "LCS 31",
      image: lcs31,
    },
  ];

  const renderItemVesselImage = (vesselName) => {
    // Find the matching image object
    const matchingImageObject = lcsimages.find(
      (imageObj) => imageObj.name === vesselName
    );

    // If found, return the image component using the image; otherwise, return null or a default image
    return matchingImageObject ? (
      <Image src={matchingImageObject.image} alt={vesselName} />
    ) : null;
  };

  useEffect(() => {
    const totalCount = searched.reduce(
      (sum, item) => sum + item.trialcard.length,
      0
    );
    setTotalTrialCards(totalCount);
  }, [searched]);

  return (
    <div>
      <Card>
        <CardHeader>Search Trial Card</CardHeader>
        <CardBody>
          <div>
            <div className="input-container-2column">
              <Input
                label={
                  filter !== ""
                    ? "Search Trial cards by " + selectedValue
                    : "Choose filter"
                }
                onChange={(e) => handleFilter(e.target.value)}
              />
              <div className="input-container-2column">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="capitalize"
                      style={{ width: "150px" }}>
                      {selectedValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedValue}
                    onSelectionChange={setFilter}>
                    {filterOptions.map((value) => (
                      <DropdownItem key={value.name}>{value.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <p>
                  {"*Showing " +
                    totalTrialCards +
                    " results on " +
                    searched.length +
                    " hulls*"}
                </p>
              </div>
            </div>

            <div className="input-container-4column">
              {searched.map((item) =>
                item.trialcard.map((trial) => (
                  <Card key={trial.uid}>
                    <CardHeader className="justify-between">
                      <div className="flex gap-5" style={{ display: "flex" }}>
                        <div>{trial["Trial Card #"]}</div>
                      </div>
                      <div>
                        <Button
                          radius="full"
                          color="primary"
                          size="sm"
                          endContent={<ShipCustomIcon />}
                          onClick={(e) => handleViewTrialCard(item, e)}>
                          View
                        </Button>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <div>
                        <p>{item.vessel}</p>
                        <p>
                          {trial["Corrective Action"] ? (
                            <p color="green">CA Provided</p>
                          ) : (
                            <p color="red">*No Corrective Action*</p>
                          )}
                        </p>
                        {trial.Status == "X" ? (
                          <Typography fontWeight="bold" color="red">
                            *Closed*
                          </Typography>
                        ) : (
                          <Typography fontWeight="bold" color="green">
                            *Open*
                          </Typography>
                        )}
                        <div className="overflow-visible py-2">
                          {renderItemVesselImage(item.vessel)}
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter>
                      {"Created On: " + trial["Created On"]}
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
