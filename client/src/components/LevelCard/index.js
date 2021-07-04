import React, { Component } from 'react';
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
      showScore,
      moduleColor,
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
  level: PropTypes.number.isRequired,
  currentScore: PropTypes.number,
  parScore: PropTypes.number,
  linkedLevel: PropTypes.number,
  description: PropTypes.string,
  totalScore: PropTypes.number,
  moduleId: PropTypes.string.isRequired,
  prevLevelScore: PropTypes.number,
  moduleColor: PropTypes.string.isRequired,
  moduleType: PropTypes.string.isRequired,
  showScore: PropTypes.bool,
};

LevelCard.defaultProps = {
  showScore: true,
  currentScore: null,
  parScore: null,
  linkedLevel: null,
  description: null,
  totalScore: null,
  prevLevelScore: null,
};

export default LevelCard;
