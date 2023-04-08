import "./latest.styles.scss";
import Card from "../card/Card.component";
import RightArrow from "../../assets/img/svg/arrow.svg";
import { useState } from "react";
const cardDetails = [
  {
    id: 1,
    title: "Grilled  Tomatoes at Home",
    imageUrl:
      "https://raw.githubusercontent.com/trial-pyth/git-tutorial/master/img/svg/card1.svg",
  },
  {
    id: 2,
    title: "Snacks for Travel",
    imageUrl:
      "https://raw.githubusercontent.com/trial-pyth/git-tutorial/master/img/svg/card2.svg",
  },
  {
    id: 3,
    title: "Post-workout Recipes",
    imageUrl:
      "https://raw.githubusercontent.com/trial-pyth/git-tutorial/master/img/svg/card3.svg",
  },
  {
    id: 4,
    title: "How To Grill Corn",
    imageUrl:
      "https://raw.githubusercontent.com/trial-pyth/git-tutorial/master/img/svg/card4.svg",
  },
  {
    id: 5,
    title: "Crunchwrap Supreme",
    imageUrl:
      "https://raw.githubusercontent.com/trial-pyth/git-tutorial/master/img/svg/card5.svg",
  },
  {
    id: 6,
    title: "Broccoli Cheese Soup",
    imageUrl:
      "https://raw.githubusercontent.com/trial-pyth/git-tutorial/master/img/svg/card6.svg",
  },
];

// cardDetails.map((card) => console.log(card));

const Latest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // console.log(window.innerWidth);

  // console.log(Boolean(currentIndex));
  // console.log(Boolean(!currentIndex));

  // console.log(currentIndex);
  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  return (
    <main className="latest">
      <div className="title">Latest Articles</div>
      <section
        className="slider"
        style={{
          transform: `translateX(-${
            currentIndex * Math.min(window.innerWidth, 1440)
          }px)`,
        }}
      >
        <div className="slider-section">
          {cardDetails.slice(0, 3).map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        <div className="slider-section">
          {cardDetails.slice(3, 6).map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className="controller">
        <button
          onClick={prevSlide}
          className="button-controller-left"
          disabled={Boolean(!currentIndex)}
        >
          <img src={RightArrow} alt="" />
        </button>
        <span className="slider-number">{currentIndex + 1}/2</span>
        <button
          onClick={nextSlide}
          disabled={Boolean(currentIndex)}
          className="button-controller-right"
        >
          <img src={RightArrow} alt="" />
        </button>
      </section>
    </main>
  );
};

export default Latest;
