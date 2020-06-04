import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "./styles.scss";
import SliderArrow from "./SliderArrow";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <SliderArrow to="prev" />,
  nextArrow: <SliderArrow to="next" />,
};
export const Gamebox = ({
  games, activeGame, handleGameBoxClick, deleteGame,
}) => (
  <div className="list-games-wrapper">
    <div className="list-games-container">
      <Slider {...settings}>
        {games.length > 0 ? (
          games.map(({ caption, id }, index) => (
            <div className={`gamebox-wrapper ${activeGame === id ? "active" : ""}`}>
              <div
                role="button"
                tabIndex={0}
                className={`gamebox ${activeGame === id ? "active" : ""}`}
                onClick={() => handleGameBoxClick(index)}
              >
                <span role="button" tabIndex={0} className="game-delete" onClick={(e) => { e.stopPropagation(); deleteGame(id); }}>
                  x
                </span>
                <div className="game-title">{caption}</div>
              </div>
              {activeGame === id && <hr />}
            </div>
          ))
        ) : null}
      </Slider>
    </div>
  </div>
);

Gamebox.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeGame: PropTypes.number.isRequired,
  handleGameBoxClick: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
};
