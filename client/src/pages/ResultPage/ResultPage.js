import React, { Component } from 'react';
import congoUrl from '../../images/congratulations.png';
import './styles.scss';
import { fetchScores } from '../LandingPage/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class ResultPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// //Checks if current score + previous score is less than parScore and return parScoreStatus.
	// checkParScoreStatus = () => {
	// 	let moduleId = this.props.match.params.moduleId;
	// 	let level = parseInt(this.props.match.params.levelId);
	// 	const { currentScore } = this.state;
	// 	const parScores = this.getParScores();
	// 	let currentLevelNewScores = this.props.gameData.scores[moduleId - 1];
	// 	let prevScore = currentLevelNewScores[level - 1];
	// 	if (prevScore + currentScore < parScores[level]) {
	// 		this.setState({ parScoreStatus: false });
	// 	} else {
	// 		this.setState({ parScoreStatus: true });
	// 	}
	// };

	handleUpdateScore = () => {
		const { currentScore, level, moduleId, totalScore } = this.props.location.state;
		let newScore = currentScore;
		let currentLevelNewScores = this.props.gameData.scores[moduleId - 1];
		let prevScore = currentLevelNewScores[level - 1];

		currentLevelNewScores[level - 1] =
			newScore > 0 ? (prevScore + newScore <= totalScore ? prevScore + newScore : totalScore) : prevScore;

		this.props.gameData.scores[moduleId - 1] = currentLevelNewScores;
		this.props.getScores(this.props.gameData.scores);
	};
	// //Get list of parScores for a module.
	// getParScores = () => {
	// 	let moduleId = this.props.match.params.moduleId;
	// 	const parScores = this.props.gameData.gameData[moduleId - 1].levels.map((level) => level.par_score);
	// 	return parScores;
	// };

	componentDidMount() {
		this.handleUpdateScore();
		// this.checkParScoreStatus();
	}

	render() {
		const {
			level,
			moduleId,
			image,
			moduleName,
			messageOne,
			messageTwo,
			moduleScenario,
			parScoreStatus
		} = this.props.location.state;
		console.log(parScoreStatus);
		const totalLevels = this.props.gameData.gameData[moduleId - 1].levels.length;

		const backToLevelUrl = `/module/${moduleId}/levels`;
		const retryLevelUrl = `/module/${moduleScenario ? 'scenario/' : ''}${moduleId}/level/${level}/questions`;
		const nextLevelUrl = `/module/${moduleScenario ? 'scenario/' : ''}${moduleId}/level/${level + 1}/questions`;
		return (
			<div className="result-page-container">
				<div>
					<div className="game-type-help">
						<div className="result-back-module-container">
							<p className="result-page-module-name">{moduleName}</p>
						</div>
					</div>
					<div className="congratulation-message-container">
						<img src={congoUrl} alt="congratulations-icon" />
						<p className="congratulations-label">Congratulations!</p>
						<p className="level-finish-label">You have finished level {level}</p>
					</div>
				</div>
				<p className="score-message">{messageOne}</p>
				<img className="graph-icon" src={image} alt="icon" />
				<p className="score-message">{messageTwo}</p>
				<div>
					<a className="back-to-all-levels-link" href={backToLevelUrl}>
						Back to all Levels
					</a>
				</div>
				{!parScoreStatus ? (
					<a className="retry-levels-link" href={retryLevelUrl}>
						<button className={`retry-level`}>Retry Level {level}</button>
					</a>
				) : level + 1 <= totalLevels ? (
					<a className="back-to-all-levels-link" href={nextLevelUrl}>
						<button className={`retry-level`}>Move To Level {level + 1}</button>
					</a>
				) : (
					<a className="back-to-all-levels-link" href="/">
						<button className={`retry-level`}>Modules</button>
					</a>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { gameData: state.gameData };
};
const mapDispatchToProps = (dispatch) => {
	return {
		getScores: (scores) => dispatch(fetchScores(scores))
	};
};

ResultPage.propTypes = {
	getScores: PropTypes.func,
	location: PropTypes.object,
	gameData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);

// export default ResultPage;
