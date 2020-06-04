import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import PropTypes from 'prop-types';
import lockIconUrl from '../../images/lock.png';

class LevelCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      level,
      currentScore,
      parScore,
      linkedLevel,
      description,
      totalScore,
      moduleId,
      prevLevelScore,
      moduleName,
      showScore = true,
      moduleColor,
      player_email,
      moduleType,
    } = this.props;
    const lock = level > 1 && prevLevelScore < parScore;
    return (
      <Link
        className={`link-lock link-lock-${lock}`}
        to={{
				  pathname: `/module/${moduleType === 'scenario'
				    ? 'scenario/'
				    : ''}${moduleId}/level/${level}/questions/`,
				  state: { moduleColor },
        }}
      >
        <button className={`level-card level-card-${moduleColor} card-lock-${lock}`} type="button">
          {level > 1
					&& prevLevelScore < parScore && (
						<div className="lock-icon-container">
  <img className="lock-icon" src={lockIconUrl} alt="lock-icon" />
						</div>
          )}
          <div className="level-label-score">
            <p className="level-label">
              Level
              {level}
            </p>
            {showScore && (
            <p className="level-score">
              Score:
              {' '}
              {currentScore}
              /
              {totalScore}
            </p>
            )}
          </div>

          <p className="level-description">
            {' '}
            {description}
          </p>

          {level > 1
					&& prevLevelScore < parScore && (
						<p className="level-unlock-rule">
  Need
  {' '}
  {parScore}
  {' '}
  in Level
  {linkedLevel}
  {' '}
  to unlock.
						</p>
          )}
        </button>
      </Link>
    );
  }
}

LevelCard.propTypes = {
  level: PropTypes.number,
  currentScore: PropTypes.number,
  parScore: PropTypes.number,
  linkedLevel: PropTypes.number,
  description: PropTypes.string,
  totalScore: PropTypes.number,
  moduleId: PropTypes.number,
  prevLevelScore: PropTypes.number,
  moduleColor: PropTypes.string,
  moduleType: PropTypes.string,
};

export default LevelCard;
