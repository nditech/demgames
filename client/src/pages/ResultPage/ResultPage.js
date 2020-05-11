import React, { Component } from 'react';
import congoUrl from '../../images/congratulations.png';
import './styles.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { config } from '../../settings';
import { da } from 'date-fns/locale';
import Auth from '../../Auth';

const auth0=new Auth();
class ResultPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount(){
		console.log('results props --> ',this.props);
	};

	componentDidMount(){
		
		console.log(JSON.stringify(this.props.location.state.finishedScore));
		
		console.log(this.props.match.params.moduleId);

		console.log(this.props.gameData.gameData);

		var game_id = this.props.location.state.gameId;
		var cohort_id = 1;
		var temp_cohort = auth0.getCohort();

		temp_cohort = temp_cohort.split("/")[1];
		console.log(temp_cohort);


		for(var game of this.props.gameData.gameData){
			
			if(this.props.location.state.moduleScenario){
				var mod = parseInt(this.props.location.state.moduleId);
				if(game.game_id === parseInt(this.props.location.state.moduleId)){
					//game_id = game.game_id;
					cohort_id = game.cohort_id ? game.cohort_id:1;
					continue;
				}
			}
			else if(game.id === this.props.location.state.moduleId){
                                //game_id = game.game_id;
                                cohort_id = game.cohort_id ? game.cohort_id:1;
                                console.log(game.game_id + "  ----  " + game.id);
                                console.log("cohort _ id " + game.cohort_id)
                                continue;
                        }

		}
                console.log("Finished Score: ", this.props.location.state.finishedScore);

		fetch(config.baseUrl + '/updatePlay',{
			method: 'post',
			headers: {
					authorization: "Bearer "+auth0.getAccessToken(),
					"Content-Type":"Application/json",
					"Accept":"application/json"
			},
			body:JSON.stringify({
				player_email:this.props.player_email,
				game_id:game_id,
				cohort_id:cohort_id,
				score:this.props.location.state.finishedScore
			})
		})
		.then((res) => {
			 res.json();
		})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => console.log(err));

	}

	render() {
		const {
			level,
			moduleId,
			gameId,
			image,
			moduleName,
			messageOne,
			messageTwo,
			messageThree,
			moduleScenario,
			parScoreStatus,
			expression
		} = this.props.location.state;

		var totalLevels =1;
		if(moduleScenario){

		} else {
			totalLevels= this.props.gameData.gameData[moduleId - 1].levels.length;
		}
		const backToLevelUrl = `/module/${moduleScenario?'scenario/' + gameId:moduleId}/levels`;
		const retryLevelUrl = `/module/${moduleScenario ? 'scenario/' + gameId:moduleId}/level/${level}/questions`;
		const nextLevelUrl = `/module/${moduleScenario ? 'scenario/' + gameId:moduleId}/level/${level + 1}/questions`;
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
					<a className="back-to-all-levels-link" href={auth0.getCohort() !=null ? auth0.getCohort() : "/"}>
						<button className={`retry-level`}>All Games</button>
					</a>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { 
		player_given_name:state.authDetail.authDetail.player_given_name,
		player_picture:state.authDetail.authDetail.player_picture,
		player_email:state.authDetail.authDetail.player_email,
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
