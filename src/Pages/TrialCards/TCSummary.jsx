import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const TCSummary = ({ Cards }) => {
  const [cards, setCards] = useState("");

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
      let weEngineering = 0
      for (let t = 0; t < searchingHull.data.length; t++) {
        const card = searchingHull.data[t]["Date Closed"];
        if(searchingHull.data[t]["Dept"] === 592) {
            weEngineering += 1
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
        weEngineering: weEngineering
      });
    }

    setCards(currentCards);
  }

  useEffect(() => {
    generateSummary();
  }, []);

  return (
    <div>
      <div className="input-container-3column">
        {cards.length > 0 ? (
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
          <div></div>
        )}
      </div>
    </div>
  );
};
