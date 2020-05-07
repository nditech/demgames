import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import lockIconUrl from '../../images/lock.png';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class LevelCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount(){
		console.log(this.props.type);
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
			showScore=true,
			moduleColor,
			player_email,
			moduleType
		} = this.props;
		const lock = level > 1 && prevLevelScore < parScore;
		return (
			<Link
				className={`link-lock link-lock-${lock}`}
				to={{
					pathname: `/${this.props.scoreDetail.routeDetail.name}/module/${moduleType === 'scenario'
						? 'scenario/'
						:''}${moduleId}/level/${level}/questions/`,
					state: { moduleColor: moduleColor}
					
				}}
				
			>
				<button className={`level-card level-card-${moduleColor} card-lock-${lock}`} type="button">
					{level > 1 &&
					prevLevelScore < parScore && (
						<div className="lock-icon-container">
							<img className="lock-icon" src={lockIconUrl} alt="lock-icon" />
						</div>
					)}
					<div className="level-label-score">
						<p className="level-label">Level {level}</p>
						{showScore&&<p className="level-score">
							Score: {currentScore}/{totalScore}
						</p>}
					</div>

					<p className="level-description"> {description}</p>

					{level > 1 &&
					prevLevelScore < parScore && (
					//prevLevelScore/100 < parScore && (	
						<p className="level-unlock-rule">
							Need {parScore} in Level {linkedLevel} to unlock.
						</p>
					)}
				</button>
			</Link>
		);
	}
}

const mapStateToProps = state => ({
	gameData: state.gameData,
	cohortData: state.gameData.cohortData,
	scoreDetail : state.scoreDetail,
	routeDetail : state.scoreDetail.routeDetail
});

const mapDispatchToProps = dispatch => {
	return {
			getGameData: gameData => dispatch(fetchGameData(gameData)),
			getScores: scores => dispatch(fetchScores(scores)),
			getCohorts:cohortData=>dispatch(fetchCohorts(cohortData)),
			setAuth: authDetail => dispatch(fetchAuthDetails(authDetail)),
			clearAuth: authDetail => dispatch(clearAuthDetails(authDetail)),
			setScoreDetail: scoreDetail => dispatch(fetchScoreDetail(scoreDetail)),
			updateRoute: routeDetail => dispatch(updateRouteDetail(routeDetail))
	};
};

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
	getGameData: PropTypes.func,
    getScores: PropTypes.func,
    gameData: PropTypes.object,
    authDetail: PropTypes.object,
    setAuth: PropTypes.func,
    clearAuth: PropTypes.func,
    scoreDetail: PropTypes.object,
    cohortData: PropTypes.object,
    getCohorts: PropTypes.func,
    routeDetail: PropTypes.object,
    updateRoute: PropTypes.func
};

//export default LevelCard;
export default connect(mapStateToProps, mapDispatchToProps)(LevelCard);