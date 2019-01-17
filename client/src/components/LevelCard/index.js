import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import lockIconUrl from '../../images/lock.png';

export const LevelCard = (props) => {
	let scores = [ 80, 0, 0, 0 ];
	const { level, parScore, linkedLevel, description, totalScore } = props;
	const lock = level > 1 && scores[level - 2] < parScore;

	return (
		<Link className={`link-lock-${lock}`} to={{ pathname: '/questions' }}>
			<button className={`level-card card-lock-${lock}`} type="button" disabled={true}>
				{level > 1 &&
				scores[level - 2] < parScore && (
					<div className="lock-icon-container">
						<img className="lock-icon" src={lockIconUrl} alt="lock-icon" />
					</div>
				)}
				<div className="level-label-score">
					<p className="level-label">Level {level}</p>
					<p className="level-score">
						Score: {scores[level - 1]}/{totalScore}
					</p>
				</div>

				<p className="level-description">Two line {description}</p>

				{level > 1 && (
					<p className="level-unlcok-rule">
						Need {parScore} in Level {linkedLevel} to unlock.
					</p>
				)}
			</button>
		</Link>
	);
};
