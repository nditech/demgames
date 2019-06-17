import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../css/LevelCard.scss';
import {lockImg} from '../img';

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
			moduleColor
		} = this.props;
		const lock = level > 1 && prevLevelScore < parScore;
		return (
			<Link
				className={`link-lock link-lock-${lock}`}
				to={{
					pathname: `/module/${moduleName === 'Finding flaws in Argument'
						? 'scenario/'
						: ''}${moduleId}/level/${level}/questions/`
				}}
			>
				<button className={`level-card level-card-${moduleColor} card-lock-${lock}`} type="button">
					{level > 1 &&
					prevLevelScore < parScore && (
						<div className="lock-icon-container">
							<img className="lock-icon" src={lockImg} alt="lock-icon" />
						</div>
					)}
					<div className="level-label-score">
						<p className="level-label">Level {level}</p>
						<p className="level-score">
							Score: {currentScore}/{totalScore}
						</p>
					</div>

					<p className="level-description"> {description}</p>

					{level > 1 &&
					prevLevelScore < parScore && (
						<p className="level-unlock-rule">
							Need {parScore} in Level {linkedLevel} to unlock.
						</p>
					)}
				</button>
			</Link>
		);
	}
}

export default LevelCard;
