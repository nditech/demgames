import React, { Component } from 'react';
import congoUrl from '../../images/congratulations.png';
import './styles.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ResultPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			level,
			moduleId,
			image,
			moduleName,
			messageOne,
			messageTwo,
			messageThree,
			moduleScenario,
			parScoreStatus,
			expression
		} = this.props.location.state;

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
				<p className="score-message">{expression}</p>
				<p className="score-message">{messageOne}</p>
				<p className="score-message">{messageTwo}</p>
				<img className="graph-icon" src={image} alt="icon" />
				<p className="score-message">{messageThree}</p>
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
	return { 
		//player_given_name:this.props.
		gameData: state.gameData 
	};
};

ResultPage.propTypes = {
	getScores: PropTypes.func,
	location: PropTypes.object,
	gameData: PropTypes.object
};

export default connect(mapStateToProps, null)(ResultPage);

// export default ResultPage;
