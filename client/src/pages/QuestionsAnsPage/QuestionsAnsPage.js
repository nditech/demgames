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
import { CorrectAnswerInfo } from '../../components/CorrectAnswerInfo';
import ProgressBar from '../../components/ProgressBar';
import { connect } from 'react-redux';
import { config } from '../../settings';
import './styles.scss';
import GameInfo from '../../components/GameInfo';
import { FETCH_QUESTIONS } from './constants';

class QuestionsAnsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			answerClick: false,
			questionId: 1,
			showAnswer: false,
			selectedAnswer: '',
			answerCorrect: true,
			parScoreStatus: false,
			showCorrectAns: false,
			currentScore: 0,
			click: false
		};
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handleInfoPageClick = this.handleInfoPageClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.showRightAnswer = this.showRightAnswer.bind(this);
		this.hideRightAnswer = this.hideRightAnswer.bind(this);
		this.handleInfoOpen = this.handleInfoOpen.bind(this);
		this.handleInfoClose = this.handleInfoClose.bind(this);
		this.getCorrectAnswer = this.getCorrectAnswer.bind(this);
		this.getProgress = this.getProgress.bind(this);
	}
	componentWillMount() {
		fetch(
			config.baseUrl +
				`/api/module/${this.props.match.params.moduleId}/level/${this.props.match.params.levelId}/questions`
		)
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					response.json().then((res) => {
						const questions = res.filter((modules) => modules !== null);
						this.props.getQuestions(questions);
					});
				} else if (response.status === 404) {
					console.log('Not Found');
				}
			})
			.catch((err) => console.log(err));
	}

	handleUpdateScore = (newScore) => {
		const { currentScore } = this.state;
		console.log('handleUpdateScore', currentScore);
		let data = { score: newScore };
		return fetch(config.baseUrl + '/api/module/1/level/1/update-score', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				if (response.status >= 200 && response.status < 300) {
					console.log('success');
				} else {
					console.log('fail');
				}
			})
			.catch((status, err) => {
				console.log(err);
			});
		return true;
	};

	showRightAnswer() {
		this.setState({ showCorrectAns: true });
	}
	hideRightAnswer() {
		this.setState({ showCorrectAns: false });
		this.nextQuestion();
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
		this.setState({ open: false });
	};

	handleAnswerClick = (correctAns) => (e) => {
		const selectedValue = e.target.value;
		this.setState({ answerClick: true, selectedAnswer: selectedValue });

		if (selectedValue === correctAns) {
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
	};

	nextQuestion() {
		this.setState((prevState) => ({
			questionId: prevState.questionId + 1
		}));
	}

	handleNextClick() {
		this.setState({ answerClick: false });
	}

	handleInfoPageClick() {
		this.setState((prevState) => ({ showAnswer: !prevState.showAnswer }));
		this.handleNextClick();
		this.handleClickOpen();
	}

	handleClick() {
		this.setState((prevState) => ({ showAnswer: !prevState.showAnswer }));
		this.handleNextClick();
	}

	getCorrectAnswer() {
		const { questionId } = this.state;
		let questions = this.props.questionsData.questions[0];
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
			var correctAns =
				questionId <= totalQuestion
					? questions[questionId - 1].options[questions[questionId - 1].correct_answer - 1]
					: null;
			return correctAns;
		}
	}

	getProgress() {
		const { questionId } = this.state;
		let questions = this.props.questionsData.questions[0];
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
			var progress = (questionId - 1) / totalQuestion * 100;
			return progress;
		}
	}
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
			infoOpen
		} = this.state;
		let level = parseInt(this.props.match.params.levelId);
		let questions = this.props.questionsData.questions[0];
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
		}
		const correctAns = this.getCorrectAnswer();
		const progress = this.getProgress();
		console.log('currentScore', currentScore);
		// let questions = this.props.questionsData.questions[0];
		// let level = parseInt(this.props.match.params.levelId);
		// var totalQuestion = 0;
		// if (questions && questions.length > 0) {
		// 	totalQuestion = questions.length;
		// 	var correctAns =
		// 		questionId <= totalQuestion
		// 			? questions[questionId - 1].options[questions[questionId - 1].correct_answer - 1]
		// 			: null;
		// 	var progress = (questionId - 1) / totalQuestion * 100;
		// }
		return (
			<Fragment>
				<div className="question-container">
					<div className="game-type-help">
						<div className="back-module-container">
							<button className="back-button">
								<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
							</button>

							{/* <p>{moduleName}</p> */}
						</div>
						<img className="info-icon" src={infoUrl} alt="info-icon" onClick={this.handleInfoOpen} />
					</div>
					<Fragment>
						{totalQuestion > 0 &&
						questionId > totalQuestion &&
						this.handleUpdateScore(currentScore) && (
							<Redirect
								to={{
									pathname: '/results',
									state: {
										// moduleName: moduleName,
										level: level,
										image: parScoreStatus ? hurreyUrl : oopsUrl,
										message: parScoreStatus
											? `Hurrey! You have scored  ${currentScore > 0
													? currentScore
													: 0}/100 You are in top 100 in the rank.`
											: `Oh! You have scored only  ${currentScore > 0
													? currentScore
													: 0}/100 You need to earn /100 for Level ${level + 1}.`
									}
								}}
							/>
						)}

						{totalQuestion > 0 && questionId <= totalQuestion && !showCorrectAns ? (
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
								<div className="question">
									<p>{questions && questions.length > 0 && questions[questionId - 1].question}</p>
								</div>
								<div className="answer-container">
									{!showAnswer ? <p className="select-label">Select the right answer</p> : null}
									{questions &&
										questions.length > 0 &&
										questions[questionId - 1].options.map((option, key) => (
											<Card
												key={key}
												option={option}
												correct_answer={questions[questionId - 1].correctAns}
												answerClick={answerClick}
												handleClick={this.handleAnswerClick(correctAns)}
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
						) : (
							<CorrectAnswerInfo
								correctAns={correctAns}
								selectedAnswer={selectedAnswer}
								hideRightAnswer={this.hideRightAnswer}
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
	return { questionsData: state.questionsData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		// onCorrectAns: () => dispatch({ type: 'CORRECT_ANS', val: 0 }),
		// onWrongAns: () => dispatch({ type: 'WRONG_ANS', val: 0 }),
		getQuestions: (questions) => dispatch({ type: FETCH_QUESTIONS, val: questions })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsAnsPage);

// export default QuestionsAnsPage;
