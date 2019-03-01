import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Card } from '../../components/Card';
import arrowBackUrl from '../../images/back.png';
import infoUrl from '../../images/info.png';
import oopsUrl from '../../images/oops.png';
import hurreyUrl from '../../images/hurrey.png';
import ProgressBar from '../../components/ProgressBar';
import { connect } from 'react-redux';
import './styles.scss';
import GameInfo from '../../components/GameInfo';
import PropTypes from 'prop-types';

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
			currentScore: 0,
			click: false,
			selectedCard: null,
			answerClicked: 0,
			clickedOptions: [],
			moduleScenario: true,
			selectedOption: 0,
			scenario: true,
			id: 1
		};
	}
	//Change the questionId to next linked question and renders the next linked question.
	nextQuestion = () => {
		let moduleId = parseInt(this.props.match.params.moduleId);
		let level = parseInt(this.props.match.params.levelId);
		const { questionId, selectedOption } = this.state;
		const questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;

		const nextQuestionId =
			questions && questionId != null && questions[questionId - 1].options[selectedOption].linked_question;

		this.setState((prevState) => ({
			questionId: nextQuestionId,
			selectedAnswer: []
		}));
	};

	//Handles option click and changes the answerClick state and hides the proceed next button.
	handleNextClick = () => {
		this.setState({ answerClick: false });
	};

	handleClick = () => {
		this.setState((prevState) => ({ showAnswer: !prevState.showAnswer }));
		this.handleNextClick();
	};

	//Return progress for current level.
	getProgress = () => {
		const { id } = this.state;
		let moduleId = parseInt(this.props.match.params.moduleId);
		let level = parseInt(this.props.match.params.levelId);

		let questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
			var progress = (id - 1) / totalQuestion * 100;
			return progress;
		}
	};

	//Renders game info dialog box.
	handleInfoOpen = () => {
		this.setState({ infoOpen: true });
	};

	//Hide game info dialog box.
	handleInfoClose = () => {
		this.setState({ infoOpen: false });
	};

	handleAnswerClick = (key) => (e) => {
		const { clickedOptions } = this.state;
		clickedOptions.push(key);
		const selectedValue = key;

		let { selectedAnswer } = this.state;
		// selectedAnswer.push(selectedValue);
		selectedAnswer = [];
		selectedAnswer.push(selectedValue);

		this.setState((prevState) => ({
			answerClicked: prevState.answerClicked + 1,
			selectedAnswer: selectedAnswer,
			selectedCard: key,
			selectedOption: key,
			answerClick: true
		}));
	};

	//Get list of module names.
	getModuleNames = () => {
		const gameData = this.props.gameData.gameData;
		const moduleNames = [];
		gameData.map((modules) => {
			return moduleNames.push(modules.name);
		});
		return moduleNames;
	};

	//Returns number of questions for current level.
	getTotalQuestions = () => {
		let moduleId = parseInt(this.props.match.params.moduleId);
		let level = parseInt(this.props.match.params.levelId);
		let questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
		}
		return totalQuestion;
	};

	//Handle proceed button for scenario type.
	handleScenarioProceed = () => {
		const { questionId, selectedOption } = this.state;
		const moduleId = parseInt(parseInt(this.props.match.params.moduleId));
		const level = parseInt(this.props.match.params.levelId);
		const questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;

		const nextQuestionId = questionId !== null && questions[questionId - 1].options[selectedOption].linked_question;
		if (nextQuestionId === null) {
			this.setState(
				{
					redirect: true,
					currentScore: questions[questionId - 1].score,
					open: true
				},
				() => {
					this.checkParScoreStatus();
				}
			);
		}
		this.setState((prevState) => ({
			selectedCard: null,
			answerClicked: 0,
			clickedOptions: [],
			questionId: 10,
			id: prevState.id + 1
		}));
		this.handleNextClick();
		this.nextQuestion();
	};

	//Checks if current score + previous score is less than parScore and return parScoreStatus.
	checkParScoreStatus = () => {
		let moduleId = parseInt(this.props.match.params.moduleId);
		let level = parseInt(this.props.match.params.levelId);
		const { currentScore } = this.state;
		const parScores = this.getParScores();
		let currentLevelNewScores = this.props.gameData.scores[moduleId - 1];
		let prevScore = currentLevelNewScores[level - 1];
		if (prevScore + currentScore < parScores[level]) {
			this.setState({ parScoreStatus: false });
		} else {
			this.setState({ parScoreStatus: true });
		}
	};

	//Get list of parScores for a module.
	getParScores = () => {
		let moduleId = parseInt(this.props.match.params.moduleId);
		const parScores = this.props.gameData.gameData[moduleId - 1].levels.map((level) => level.par_score);
		return parScores;
	};

	render() {
		const {
			answerClick,
			questionId,
			showAnswer,
			open,
			parScoreStatus,
			showCorrectAns,
			currentScore,
			infoOpen,
			clickedOptions,
			moduleScenario,
			selectedCard,
			id,
			scenario,
			redirect
		} = this.state;

		const moduleId = parseInt(parseInt(this.props.match.params.moduleId));
		const level = parseInt(this.props.match.params.levelId);
		const totalQuestion = this.getTotalQuestions();
		const moduleNames = this.getModuleNames();
		const progress = this.getProgress();
		const parScores = this.getParScores();
		const backUrl = `/module/${moduleId}/levels`;
		const questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;
		const emptyOption = questionId !== null && questions[questionId - 1].options[0].option === '';
		const moduleColor = this.props.gameData.gameData[moduleId - 1].style;
		const totalScore = this.props.gameData.gameData[moduleId - 1].levels[level - 1].total_score;

		return (
			<Fragment>
				<div className="question-main-container">
					<div className="game-type-help">
						<div className="back-module-container">
							<button className="back-button">
								<a href={backUrl}>
									<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
								</a>
							</button>

							<p className="questions-page-module-name">
								{moduleNames[parseInt(this.props.match.params.moduleId) - 1]}
							</p>
						</div>
						<img className="info-icon" src={infoUrl} alt="info-icon" onClick={this.handleInfoOpen} />
					</div>
					<Fragment>
						{redirect && (
							<Redirect
								to={{
									pathname: '/results',
									state: {
										moduleId: moduleId,
										moduleScenario: moduleScenario,
										parScoreStatus: parScoreStatus,
										totalScore: totalScore,
										currentScore: currentScore,
										moduleName: moduleNames[moduleId - 1],
										open: open,
										scenario: scenario,
										level: level,
										image: parScoreStatus ? hurreyUrl : oopsUrl,
										messageOne: parScoreStatus
											? `Scenario Ends.`
											: `Oh! You have scored only  ${currentScore > 0
													? currentScore
													: 0}/${totalScore}.`,
										messageTwo: parScoreStatus
											? `You are in top 100 in the rank.`
											: `You need to earn ${parScores[level]}/${totalScore} for Level ${level}.`,
										buttonMessage: !parScoreStatus
											? `Retry Level ${level}`
											: `Continue Level ${level + 1}`
									}
								}}
							/>
						)}

						{!showCorrectAns &&
						questionId != null && (
							<div>
								<div className="level-question-detail">
									<span>Level {level} </span>
									<span className="question-number-status">
										Question {id} out of {totalQuestion}
									</span>
								</div>
								<div className="progress-bar-container">
									<ProgressBar progress={progress} />
								</div>
								<div className="questions-container">
									<p className={`question-label question-label-${moduleColor}`}>
										{questions &&
											questions.length > 0 &&
											questionId != null &&
											questions[questionId - 1].question}
									</p>
								</div>
								<div className="answer-container">
									{!emptyOption && !showAnswer && <p className="select-label">Select any option.</p>}
									<div className="options-card-container">
										{!emptyOption &&
											questions &&
											questions.length > 0 &&
											questionId != null &&
											questions[questionId - 1].options.map((option, key) => (
												<Card
													key={key}
													option={moduleScenario ? option.option : option}
													answerClick={answerClick}
													// selectedCard={clickedOptions.includes(key)}
													selectedCard={selectedCard === key}
													handleClick={this.handleAnswerClick(key)}
													moduleColor={moduleColor}
												/>
											))}
									</div>
								</div>
								{/* Either option is clicked or question option is empty render proceed button */}
								{(emptyOption || answerClick) && (
									<button
										className={`next-page-button next-page-button-${true}`}
										onClick={moduleScenario ? this.handleScenarioProceed : this.handleProceedNext}
									>
										Proceed
									</button>
								)}
							</div>
						)}
					</Fragment>
				</div>
				{infoOpen && <GameInfo open={infoOpen} handleClose={this.handleInfoClose} />}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return { gameData: state.gameData };
};

ScenarioQuesAns.propTypes = {
	gameData: PropTypes.object,
	match: PropTypes.object
};

export default connect(mapStateToProps, null)(ScenarioQuesAns);
