import React from "react";
import Slider from "react-slick";
import "./styles.scss";
import SliderArrow from "./SliderArrow";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <SliderArrow to="prev" />,
  nextArrow: <SliderArrow to="next" />,
};
export const Gamebox = ({ games, activeGame, handleGameBoxClick, deleteGame }) => {
  console.log(games, "games");
  return (
    <div className="list-games-wrapper">
      <div className="list-games-container">
        <Slider {...settings}>
          {games.length > 0 ? (
            games.map(({ caption, id }, index) => (
              <div className={`gamebox-wrapper ${activeGame === id ? "active" : ""}`}>
              <div
                className={`gamebox ${activeGame === id ? "active" : ""}`}
                onClick={() => handleGameBoxClick(index)}
              >
                <span className="game-delete" onClick={(e)=>{e.stopPropagation(); deleteGame(id)}}>x</span>
                <div className="game-title">{caption}</div>
              </div>
              {activeGame === id && <hr />}
              </div>
            ))
          ) :null}
        </Slider>
      </div>
    </div>
  );
};
