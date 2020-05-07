import React, { Component, Fragment } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { type } from 'os';
import { connect } from "react-redux";

/*
class ModuleCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
*/
export const ModuleCard = (props) => (
//	render() {
//		return (
			<Link
				className="module-card-link"
				to={{
					pathname: `/${props.routeDetail.name}/module/${props.moduleType==='scenario'?`scenario/${props.gameId}`:props.moduleId}/levels`,
					
					item:{moduleType:props.moduleType,
						style: props.style
					},
					state: { style: props.style}
				}}

				params={{ 
					moduleType:props.moduleType,
					style: props.style
				}}
			>
				<button className={`module-card  ${props.style}`}>
					<p>{
							props.moduleName
						}
					</p>
				</button>
//			</Link>
//		);
//	}
)
//}
/*
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
*/
ModuleCard.propTypes = {
	moduleId: PropTypes.number,
	moduleName: PropTypes.string,
	style: PropTypes.string,
	moduleType:PropTypes.string,
	routeDetail: PropTypes.object
/*	getGameData: PropTypes.func,
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
*/
};

//export default connect(mapStateToProps, mapDispatchToProps)(ModuleCard);