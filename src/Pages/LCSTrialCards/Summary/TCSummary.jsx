import { Button, Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const TCSummary = ({ Cards }) => {
  const [cards, setCards] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [loaded, setLoaded] = useState(false)

  function generateSummary() {
    const currentVessels = Cards.filter(
      (value) =>
        value.vessel === "LCS 27" ||
        value.vessel === "LCS 29" ||
        value.vessel === "LCS 31"
    );

    let currentCards = [];

    console.log(currentVessels);

    for (let i = 0; i < currentVessels.length; i++) {
      const totalCards = currentVessels[i].data.length;
      const searchingHull = currentVessels[i];

      // get amount of cards open in current vessel
      let cardsOpen = 0;
      let cardsClosed = 0;
      let weEngineering = 0;
      for (let t = 0; t < searchingHull.data.length; t++) {
        const card = searchingHull.data[t]["Date Closed"];
        if (searchingHull.data[t]["Lead Trade"] === 592) {
          weEngineering += 1;
        }
        if (card) {
          cardsClosed += 1;
        } else {
          cardsOpen += 1;
        }
      }

      const percentComplete = (
        (cardsClosed / currentVessels[i].data.length) *
        100
      ).toFixed(2);

      currentCards.push({
        vessel: currentVessels[i].vessel,
        cardsOpen: cardsOpen,
        cardsClosed: cardsClosed,
        totalCards: currentVessels[i].data.length,
        percentComplete: percentComplete,
        weEngineering: weEngineering,
      });
    }

    setCards(currentCards);
    setLoaded(true)
  }

  function findCompartments() {
    var byCompartment = [];
  }

  useEffect(() => {
    generateSummary();
  }, []);

  return (
    <div>
      <div className="input-container-3column">
        {loaded ? (
          cards.map((value) => (
            <div>
              <Card>
                <CardHeader>{value.vessel}</CardHeader>
                <CardBody>
                  <div>
                    <div>
                      <p>{"Cards Closed: " + value.cardsClosed}</p>
                      <p>{"Cards Open: " + value.cardsOpen}</p>
                      <p>{"Total: " + value.totalCards}</p>
                      <p>{"WE: " + value.weEngineering}</p>
                      <p>
                        {"Percent Complete: " + value.percentComplete + "%"}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <div className="input-container-1column">
            <Card className=" space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
            <Card className=" space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
            <Card className=" space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          </div>
        )}
      </div>
      <div className="input-container-1column">
        {showAll ? <div></div> : <div></div>}
      </div>
    </div>
  );
};
