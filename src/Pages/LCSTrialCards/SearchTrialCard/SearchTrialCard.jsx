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
  import { ChevronRightIcon } from "../../../Components/icons/ChevronRightIcon";
  import { useNavigate } from "react-router-dom";
  import { Typography } from "@mui/material";
  import { ShipCustomIcon } from "../../../Components/icons/ShipIcon";
  import lcs23 from "../../../assets/imgs/lcs23.jpeg";
  import lcs25 from "../../../assets/imgs/lcs25.avif";
  import lcs21 from "../../../assets/imgs/lcs21.png";
  import lcs27 from "../../../assets/imgs/lcs27.png";
  import lcs29 from "../../../assets/imgs/lcs29.jpg";
  import lcs31 from "../../../assets/imgs/lcs31.jpg";
  import { trades } from "../trades";
  
  export const SearchTrialCard = ({ dataset, updateParentState }) => {
    const [filter, setFilter] = useState("");
    const [searched, setSearched] = useState([]);
    const navigate = useNavigate();
    const [totalTrialCards, setTotalTrialCards] = useState(0);
  
    // FILTERS
    const [showAllFilters, setShowShowAllFilters] = useState(false);
    const [selectedTrades, setSelectedTrades] = useState(new Set(["Trades:"]));
    const [originatorFilter, setOriginatorFilter] = useState("");
    const [narrativeFilter, setNarrativeFilter] = useState("");
    const [compartmentFilter, setCompartmentFilter] = useState("");
    const [openOnlyFilter, setOpenOnlyFilter] = useState(false);
  
    const[test, setTest] = useState([])
  
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
  
    function handleMultipleFilter() {
      setSearched([]);
  
      let filteredCards = [];
      for (let i = 0; i < dataset.length; i++) {
        const filteredData = dataset[i].data.filter((item) => {
          const narrativeMatch =
            !narrativeFilter ||
            (item["Narrative"] &&
              item["Narrative"]
                .toLowerCase()
                .includes(narrativeFilter.toLowerCase()));
          const originatorMatch =
            !originatorFilter ||
            (item["Originator Name"] &&
              item["Originator Name"]
                .toLowerCase()
                .includes(originatorFilter.toLowerCase()));
          const compartmentMatch =
            !compartmentFilter ||
            (item["COMPARTMENT"] &&
              item["COMPARTMENT"]
                .toLowerCase()
                .includes(compartmentFilter.toLowerCase()));
          const openOnlyMatch = !openOnlyFilter || item["Status"] !== "X";
          return (
            narrativeMatch && originatorMatch && compartmentMatch && openOnlyMatch
          );
        });
  
        if (filteredData.length > 0) {
          filteredCards.push({ data: filteredData, vessel: dataset[i].vessel });
        }
      }
  
      console.log(selectedTrades);
      setSearched(filteredCards);
    }
  
    function handleViewTrialCard(value, e) {
      e.stopPropagation();
      // navigate("viewTrialCard", { state: { data: value } });
      updateParentState(({data: value, tab: "viewtc"}))
    }
  
    const selectTrades = useMemo(
      () => Array.from(selectedTrades).join(" || ").replaceAll("_", " "),
      [selectedTrades]
    );
  
    function clearFilters() {
      setSelectedTrades([]);
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
  
    const getArrayFromLocalStorage = () => {
      const storedArray = localStorage.getItem('cards');
      if (storedArray) {
        setTest(JSON.parse(storedArray));
      }
    };
  
    useEffect(() => {
      const totalCount = searched.reduce(
        (sum, item) => sum + item.data.length,
        0
      );
      setTotalTrialCards(totalCount);
  
      // getArrayFromLocalStorage()
    }, [searched]);
  
    return (
      <div>
        <Card>
          <CardHeader>Search Trial Card</CardHeader>
          <CardBody>
            <div>
              <div className="input-container-1column">
                <div className="input-container-3column">
                  <Dropdown backdrop="blur" shouldBlockScroll={false}>
                    <DropdownTrigger>
                      <Button variant="bordered" className="capitalize">
                        {selectTrades ? selectTrades : "Trades"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Select Trades"
                      variant="flat"
                      closeOnSelect={false}
                      selectionMode="multiple"
                      selectedKeys={selectedTrades}
                      onSelectionChange={setSelectedTrades}>
                      {trades.map((value) => (
                        <DropdownItem
                          description={value.Code + ", POC: " + value.POC}
                          key={value.Code}>
                          {value.Trade}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
  
                  <Input
                    label="Originator"
                    onChange={(e) => setOriginatorFilter(e.target.value)}
                  />
                  <Input
                    label="Compartment"
                    onChange={(e) => setCompartmentFilter(e.target.value)}
                  />
                  <Input
                    label="Narrative Includes"
                    onChange={(e) => setNarrativeFilter(e.target.value)}
                  />
                  <Switch
                    isSelected={openOnlyFilter}
                    onValueChange={setOpenOnlyFilter}>
                    {openOnlyFilter ? "Show Only Open" : "Show All"}
                  </Switch>
  
                  <div>
                    <Button color="danger" onClick={() => clearFilters()}>
                      Clear Filters
                    </Button>
                    <Button color="danger" onClick={() => setSearched([])}>
                      Clear Search
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => handleMultipleFilter()}>
                      Search
                    </Button>
                    <Button onClick={() => console.log(test)} >Test</Button>
                  </div>
                </div>
              </div>
  
              <div className="input-container-4column">
                {searched.map((value, index) =>
                  value.data.map((item, index) => (
                    <Card>
                      <CardHeader className="justify-between">
                        <div className="flex gap-5" style={{ display: "flex" }}>
                          <div>{item["Trial Card #"]}</div>
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
                          <p>{value.vessel}</p>
                          <p>{item["Dept"]}</p>
                          <p>
                            {item["Corrective Action"] ? (
                              <p color="green">CA Provided</p>
                            ) : (
                              <p color="red">*No Corrective Action*</p>
                            )}
                          </p>
                          {item.Status == "X" ? (
                            <Typography fontWeight="bold" color="red">
                              *Closed*
                            </Typography>
                          ) : (
                            <Typography fontWeight="bold" color="green">
                              *Open*
                            </Typography>
                          )}
                          <div className="overflow-visible py-2">
                            {renderItemVesselImage(value.vessel)}
                          </div>
                        </div>
                      </CardBody>
                      <CardFooter>
                        {"Created On: " + item["Created On"]}
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
  