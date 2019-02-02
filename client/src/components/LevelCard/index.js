import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import lockIconUrl from '../../images/lock.png';
import { connect } from 'react-redux';

class LevelCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { level, currentScore, parScore, linkedLevel, description, totalScore, moduleId } = this.props;
		const lock = level > 1 && currentScore < parScore;
		console.log(currentScore);
		return (
			<Fragment>
				<Link
					className={`link-lock link-lock-${lock}`}
					to={{
						pathname: `/module/${moduleId}/level/${level}/questions/`
					}}
				>
					<button className={`level-card card-lock-${lock}`} type="button">
						{level > 1 &&
						currentScore[level - 1] < parScore && (
							<div className="lock-icon-container">
								<img className="lock-icon" src={lockIconUrl} alt="lock-icon" />
							</div>
						)}
						<div className="level-label-score">
							<p className="level-label">Level {level}</p>
							<p className="level-score">
								Score: {currentScore}/{totalScore}
							</p>
						</div>

						<p className="level-description">Two line {description}</p>

						{level > 1 && (
							<p className="level-unlock-rule">
								Need {parScore} in Level {linkedLevel} to unlock.
							</p>
						)}
					</button>
				</Link>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return { levelsData: state.levelsData };
};

export default connect(mapStateToProps, null)(LevelCard);

// export default LevelCard;
