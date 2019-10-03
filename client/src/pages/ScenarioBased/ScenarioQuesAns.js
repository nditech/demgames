import React, { Fragment } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { Card } from '../../components/Card';
import arrowBackUrl from '../../images/back.png';
import correctAnsUrl from '../../images/correct.png';
import infoUrl from '../../images/info.png';
import oopsUrl from '../../images/oops.png';
import hurreyUrl from '../../images/hurrey.png';
import ProgressBar from '../../components/ProgressBar';
import { connect } from 'react-redux';
import { fetchScores } from '../LandingPage/actions';
import './styles.scss';
import GameInfo from '../../components/GameInfo';
import PropTypes from 'prop-types';
import AnswerInfoPopup from '../../components/AnswerInfoPopup';
import Auth from '../../Auth';

const auth0=new Auth();

export class ScenarioQuesAns extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			answerClick: false,
			questionId: 1,
			showAnswer: false,
			selectedAnswer: [],
			answerCorrect: true,
			parScoreStatus: false,
			showCorrectAns: false,
			currentQuestionScore: 0,
			totalScore:0,
			click: false,
			selectedCard: null,
			answerClicked: 0,
			clickedOptions: [],
			moduleScenario: true,
			selectedOption: 0,
			id: 1,
			conclusionReached: false,
			options:[],
			questionStatement:'',
			linkedQuestion: null,
			redirect:false,
			gameId: this.props.match.params.moduleId,
			levelId: this.props.match.params.levelId,
		};
	}

	handleAnswerClick = (linkedQuestion, optionId,score) => {
		this.setState((prevState) => ({
			selectedCard: optionId,
			linkedQuestion: linkedQuestion,
			currentQuestionScore:score,
			answerClick: true
		}));
		console.log('linked quest : ', linkedQuestion);

	};
		
	
	handleScenarioProceed = () => {
		console.log('state linked question: ', this.state);
		debugger;
		if(this.state.linkedQuestion === null){
			this.setState({
				redirect:true,
				totalScore:this.state.currentQuestionScore+this.state.totalScore
			});
		} else{
			const url = `http://localhost:9000/scenario_question/${this.state.linkedQuestion}`;
			fetch(url, {
				method: 'GET',
				headers: {
					authorization: "Bearer "+auth0.getAccessToken(),
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
				.then(res => res.json())
				.then((data) => {
					this.setState({
						questionStatement: data.question_statement,
						options: data.options ,
						totalScore:this.state.currentQuestionScore+this.state.totalScore,
						});
				  console.log('linked question data data',data);
				})
				.catch((error) => console.log(error));
		}

		

	}
	
	componentWillMount(){
		console.log('props -- > ', this.props);
	}

	componentDidMount(){
		const url = `http://localhost:9000/initial_scenario_question/${this.props.match.params.moduleId}/${this.props.match.params.levelId}`;
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: "Bearer "+auth0.getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
					questionStatement: data.question_statement,
					options: data.options 
					});
              console.log('first question data data',data);
            })
            .catch((error) => console.log(error));
	}

	render() {
		console.log('total score: ', this.state.totalScore);
		const {
			answerClick,
			questionId,
			showCorrectAns,
			selectedCard,
			redirect
		} = this.state;

		return (
			<Fragment>
				<div className="question-main-container">
					<div className="game-type-help">
						<div className="back-module-container">
							<button className="back-button">
								<Link to={`/module/scenario/${this.props.match.params.moduleId}/levels`}>
									<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
								</Link>
							</button>

							<p className="questions-page-module-name">
							</p>
						</div>
						<img className="info-icon" src={infoUrl} alt="info-icon" />
					</div>
					<Fragment>

						{redirect && (
							<Redirect
								to={{
									pathname: '/results',
									state: {
										moduleId: this.state.gameId,
										moduleScenario: true,
										totalScore: this.state.totalScore,
										open: true,
										level: this.state.levelId,
										image:hurreyUrl
									}
								}}
							/>
						)}

						{!showCorrectAns &&
							questionId != null && (
								<div>
									<div className="level-question-detail">
										<span>Level {'1'} </span>
									</div>
									<div className="questions-container">
										<p className={`question-label question-label-${'blue'}`}>
												{this.state.questionStatement}
										</p>
									</div>
									<div className="answer-container">
										<div className="options-card-container">
												{this.state.options && this.state.options.map(option => {
													return (
													<Card
														key={option.id}
														option={option.choicestatement}
														selectedCard={selectedCard === option.id}
														handleClick={()=>this.handleAnswerClick(option.linked_question, option.id,option.weight)}
														moduleColor={'blue'}
													/>)
												})}
													
												{/* ))} */}
										</div>
									</div>
									{(answerClick) && (
										<button
											className={`next-page-button next-page-button-${true}`}
											onClick={this.handleScenarioProceed}
										>
											Proceed
									</button>
									)} 
								</div>
							)}
					</Fragment>
				</div>
			</Fragment>
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

ScenarioQuesAns.propTypes = {
	gameData: PropTypes.object,
	match: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioQuesAns);
