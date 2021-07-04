import React from "react";
import PropTypes from 'prop-types';
import LevelCard from "../../components/LevelCard";
import "../../commonStyles.scss";
import "../LevelsPage/styles.scss";
import Auth from "../../Auth";
import { config } from "../../settings";

const auth0 = new Auth();

class ScenarioLevels extends React.Component {
  state = { levels: 0, game: {} };

  componentDidMount() {
    const url = `${config.baseUrl}/level_by_game/${this.props.match.params.moduleId}`;
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${auth0.getAccessToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ levels: data.length, game: data.game });
      })
      .catch(error => console.log(error)); // eslint-disable-line
  }

  getLevelComponents() {
    const elements = [];
    for (let x = 0; x < this.state.levels; x++) {
      elements.push(
        <LevelCard
          key={x}
          level={x + 1}
          moduleId={this.props.match.params.moduleId}
          showScore={false}
          moduleType="scenario"
          moduleColor={this.state.game.style === null ? "orange" : this.state.game.style}
        />,
      );
    }
    return elements;
  }

  render() {
    return (
      <div className="landing-page-wrapper">
        <div className="landing-page-container">
          <p className="game-title">
            {' '}
            {this.state.game.caption}
          </p>
          <div className="game-type-card-container">
            {this.getLevelComponents()}
          </div>
        </div>
      </div>
    );
  }
}

ScenarioLevels.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      moduleId: PropTypes.string,
    }),
  }).isRequired,
};

export default ScenarioLevels;
