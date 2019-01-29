import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import lockIconUrl from '../../images/lock.png';
import { connect } from 'react-redux';

class LevelCard extends Component {
	constructor(props) {
		super(props);
		this.state = { scores: [ 0, 0, 0, 0 ] };
	}

	render() {
		const { scores } = this.state;
		const { level, parScore, linkedLevel, description, totalScore, questions, moduleName } = this.props;
		const lock = level > 1 && scores[level - 2] < parScore;

		return (
			<Fragment>
				<Link
					className={`link-lock link-lock-${lock}`}
					to={{
						pathname: `level/${level}/questions`,
						state: {
							questions: questions,
							level: level,
							moduleName: moduleName,
							parScore: parScore
						}
					}}
				>
					<button className={`level-card card-lock-${lock}`} type="button">
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
			</Fragment>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return { scores: state.scores };
// };

// export default connect(mapStateToProps)(LevelCard);

export default LevelCard;
