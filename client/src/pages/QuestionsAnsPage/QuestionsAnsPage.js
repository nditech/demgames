import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../../components/Card';
import arrowBackUrl from '../../images/back.png';
import infoUrl from '../../images/info.png';
import correctAnsUrl from '../../images/correct.png';
import wrongAnsUrl from '../../images/wrong.png';
import oopsUrl from '../../images/oops.png';
import hurreyUrl from '../../images/hurrey.png';
import AnswerInfoPopup from '../../components/AnswerInfoPopup';
import CorrectAnswerInfo from '../../components/CorrectAnswerInfo';
import ProgressBar from '../../components/ProgressBar';
import { connect } from 'react-redux';
import './styles.scss';
import GameInfo from '../../components/GameInfo';
import PropTypes from 'prop-types';

class QuestionsAnsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			answerClick: false,
			questionId: 1,
			showAnswer: false,
			selectedAnswer: [],
			answerCorrect: true,
			parScoreStatus: true,
			showCorrectAns: false,
			currentScore: 0,
			click: false,
			selectedCard: null,
			answerClicked: 0
		};
		this.handleClick = this.handleClick.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handleInfoPageClick = this.handleInfoPageClick.bind(this);
		this.showRightAnswer = this.showRightAnswer.bind(this);
		this.hideRightAnswer = this.hideRightAnswer.bind(this);
		this.getCorrectAnswer = this.getCorrectAnswer.bind(this);
		this.getProgress = this.getProgress.bind(this);
		this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
	}

	// handleUpdateScore = (newScore) => {
	// 	let data = { score: newScore };
	// 	return fetch(
	// 		config.baseUrl +
	// 			`/api/module/${this.props.match.params.moduleId}/level/${this.props.match.params.levelId}/update-score`,
	// 		{
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(data)
	// 		}
	// 	)
	// 		.then((response) => {
	// 			if (response.status >= 200 && response.status < 300) {
	// 				console.log('Update score success');
	// 				console.log(response.json());
	// 			} else {
	// 				console.log('Update score fail');
	// 			}
	// 		})
	// 		.catch((status, err) => {
	// 			console.log(err);
	// 		});
	// };

	showRightAnswer() {
		this.setState({ showCorrectAns: true });
	}
	hideRightAnswer() {
		this.setState({ showCorrectAns: false });
		this.nextQuestion();
	}

	checkCorrectAnswer() {
		const correctAns = this.getCorrectAnswer();
		const selectedValue = this.state.selectedAnswer;
		selectedValue.sort();
		correctAns.sort();
		if (JSON.stringify(selectedValue) === JSON.stringify(correctAns)) {
			this.setState((prevState) => ({
				answerCorrect: true,
				currentScore: prevState.currentScore + 10
			}));
		} else {
			this.setState((prevState) => ({
				answerCorrect: false,
				currentScore: prevState.currentScore - 10
			}));
		}
	}

	nextQuestion() {
		this.setState((prevState) => ({
			questionId: prevState.questionId + 1,
			selectedAnswer: []
		}));
	}

	handleNextClick() {
		this.setState({ answerClick: false });
	}

	handleInfoPageClick() {
		this.setState((prevState) => ({
			showAnswer: !prevState.showAnswer,
			selectedCard: null,
			answerClicked: 0
		}));
		this.handleNextClick();
		this.handleClickOpen();
		this.checkCorrectAnswer();
	}

	handleClick() {
		this.setState((prevState) => ({ showAnswer: !prevState.showAnswer }));
		this.handleNextClick();
	}

	getCorrectAnswer() {
		const { questionId } = this.state;
		let moduleId = this.props.match.params.moduleId;
		let level = parseInt(this.props.match.params.levelId);
		let questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
			var correctAns = questionId <= totalQuestion ? questions[questionId - 1].correct_answer : null;
			return correctAns;
		}
	}

	getProgress() {
		const { questionId } = this.state;
		let moduleId = this.props.match.params.moduleId;
		let level = parseInt(this.props.match.params.levelId);

		let questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
			var progress = (questionId - 1) / totalQuestion * 100;
			return progress;
		}
	}

	handleInfoOpen = () => {
		this.setState({ infoOpen: true });
	};

	handleInfoClose = () => {
		this.setState({ infoOpen: false });
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState((prevState) => ({
			open: false,
			showAnswer: !prevState.showAnswer
		}));

		this.checkParScoreStatus();
	};

	checkAnsClicked = (answerClicked) => {
		let moduleId = this.props.match.params.moduleId;
		let level = parseInt(this.props.match.params.levelId);
		let questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;
		const { questionId } = this.state;
		let correctAnsLength = questions[questionId - 1].correct_answer.length;
		if (this.state.answerClicked === correctAnsLength) {
			this.setState({ answerClick: true });
		}
	};

	handleAnswerClick = (correctAns, key) => (e) => {
		const selectedValue = key;
		const { selectedAnswer } = this.state;
		selectedAnswer.push(selectedValue);
		this.setState(
			(prevState) => ({
				answerClicked: prevState.answerClicked + 1,
				selectedAnswer: selectedAnswer,
				selectedCard: key
			}),
			() => {
				this.checkAnsClicked(this.state.answerClicked);
			}
		);
	};

	checkParScoreStatus = () => {
		let moduleId = this.props.match.params.moduleId;
		let level = parseInt(this.props.match.params.levelId);

		const { currentScore } = this.state;
		const parScores = this.getParScores();
		let currentLevelNewScores = this.props.gameData.scores[moduleId - 1];
		let prevScore = currentLevelNewScores[level - 1];
		if (prevScore + currentScore < parScores[level]) {
			this.setState({ parScoreStatus: false });
		}
	};

	getModuleNames = () => {
		const gameData = this.props.gameData.gameData;
		const moduleNames = [];
		gameData.map((modules) => {
			moduleNames.push(modules.name);
		});
		return moduleNames;
	};

	getTotalQuestions = () => {
		let moduleId = this.props.match.params.moduleId;
		let level = parseInt(this.props.match.params.levelId);

		let questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
		}
		return totalQuestion;
	};

	getParScores = () => {
		let moduleId = this.props.match.params.moduleId;
		const parScores = this.props.gameData.gameData[moduleId - 1].levels.map((level) => level.par_score);
		return parScores;
	};

	render() {
		const {
			answerClick,
			questionId,
			showAnswer,
			answerCorrect,
			open,
			parScoreStatus,
			showCorrectAns,
			currentScore,
			selectedAnswer,
			infoOpen,
			selectedCard
		} = this.state;

		let moduleId = parseInt(this.props.match.params.moduleId);
		let level = parseInt(this.props.match.params.levelId);
		const totalQuestion = this.getTotalQuestions();
		const correctAns = this.getCorrectAnswer();
		const progress = this.getProgress();
		const moduleNames = this.getModuleNames();
		const backUrl = `/module/${moduleId}/levels`;
		const questions = this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions;
		const parScores = this.getParScores();
		return (
			<Fragment>
				<div className="question-container">
					<div className="game-type-help">
						<div className="back-module-container">
							<button className="back-button">
								<a href={backUrl}>
									<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
								</a>
							</button>

							<p className="questions-page-module-name">
								{moduleNames[this.props.match.params.moduleId - 1]}
							</p>
						</div>
						<img className="info-icon" src={infoUrl} alt="info-icon" onClick={this.handleInfoOpen} />
					</div>
					<Fragment>
						{totalQuestion > 0 &&
						questionId > totalQuestion && (
							<Redirect
								to={{
									pathname: '/results',
									state: {
										moduleId: moduleId,
										parScoreStatus: parScoreStatus,
										currentScore: currentScore,
										moduleName: moduleNames[moduleId - 1],
										level: level,
										image: parScoreStatus ? hurreyUrl : oopsUrl,
										messageOne: parScoreStatus
											? `Hurrey! You have scored  ${currentScore > 0 ? currentScore : 0}/100.`
											: `Oh! You have scored only  ${currentScore > 0 ? currentScore : 0}/100.`,
										messageTwo: parScoreStatus
											? `You are in top 100 in the rank.`
											: `You need to earn ${parScores[level]}/100 for Level ${level}.`,
										buttonMessage: !parScoreStatus
											? `Retry Level ${level}`
											: `Continue Level ${level + 1}`
									}
								}}
							/>
						)}

						{!showCorrectAns ? (
							totalQuestion > 0 &&
							questionId <= totalQuestion && (
								<div>
									<div className="level-question-detail">
										<span>Level {level} :</span>
										<span className="question-number-status">
											Question {questionId} out of {totalQuestion}
										</span>
									</div>
									<div className="progress-bar-container">
										<ProgressBar progress={progress} />
									</div>
									<div className="questions-container">
										<p className="question-label">
											{questions && questions.length > 0 && questions[questionId - 1].question}
										</p>
									</div>
									<div className="answer-container">
										{!showAnswer ? <p className="select-label">Select the right answer.</p> : null}
										{questions &&
											questions.length > 0 &&
											questions[questionId - 1].options.map((option, key) => (
												<Card
													key={key}
													option={option}
													correct_answer={questions[questionId - 1].correctAns}
													answerClick={answerClick}
													selectedCard={key === selectedCard}
													handleClick={this.handleAnswerClick(correctAns, key)}
												/>
											))}
									</div>

									{answerClick && (
										<button
											className={`next-page-button next-page-button-${answerClick}`}
											onClick={this.handleInfoPageClick}
										>
											Proceed
										</button>
									)}
								</div>
							)
						) : (
							<CorrectAnswerInfo
								correctAns={correctAns}
								selectedAnswer={selectedAnswer}
								hideRightAnswer={this.hideRightAnswer}
								moduleId={moduleId}
								level={level}
								questionId={questionId}
								totalQuestion={totalQuestion}
							/>
						)}
					</Fragment>
					{answerCorrect ? (
						<AnswerInfoPopup
							open={open}
							message={'Your answer is correct'}
							answerStatus={true}
							handleClose={this.handleClose}
							imageUrl={correctAnsUrl}
							nextQuestion={this.nextQuestion}
						/>
					) : (
						<AnswerInfoPopup
							open={open}
							message={'Oh! Seems like you selected the wrong answer.'}
							answerStatus={false}
							handleClose={this.handleClose}
							imageUrl={wrongAnsUrl}
							showRightAnswer={this.showRightAnswer}
							nextQuestion={this.nextQuestion}
						/>
					)}
				</div>
				{infoOpen && <GameInfo open={infoOpen} handleClose={this.handleInfoClose} />}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return { gameData: state.gameData };
};

QuestionsAnsPage.propTypes = {
	gameData: PropTypes.object,
	match: PropTypes.object
};

export default connect(mapStateToProps, null)(QuestionsAnsPage);

// export default QuestionsAnsPage;
