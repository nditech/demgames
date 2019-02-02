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
import { FETCH_CURRENT_SCORES } from '../LevelsPage/constants';

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
			click: false,
			selectedCard: null
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
		this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
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
		let data = { score: newScore };
		return fetch(
			config.baseUrl +
				`/api/module/${this.props.match.params.moduleId}/level/${this.props.match.params.levelId}/update-score`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}
		)
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					console.log('Update score success');
					console.log(response.json());
				} else {
					console.log('Update score fail');
				}
			})
			.catch((status, err) => {
				console.log(err);
			});
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

	checkCorrectAnswer() {
		const correctAns = this.getCorrectAnswer();

		const scores = this.props.levelsData.currentScores;
		const selectedValue = this.state.selectedAnswer;
		if (selectedValue === correctAns) {
			scores[0] += 10;
			this.props.getCurrentScores(scores);
			this.setState((prevState) => ({
				answerCorrect: true,
				currentScore: prevState.currentScore + 10
			}));
		} else {
			scores[0] -= 10;
			this.props.getCurrentScores(scores);
			this.setState((prevState) => ({
				answerCorrect: false,
				currentScore: prevState.currentScore - 10
			}));
		}
		console.log(this.props.levelsData.currentScores);
	}
	handleAnswerClick = (correctAns, key) => (e) => {
		const selectedValue = e.target.value;
		this.setState({ answerClick: true, selectedAnswer: selectedValue, selectedCard: key });
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
		this.setState((prevState) => ({ showAnswer: !prevState.showAnswer, selectedCard: null }));
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
			infoOpen,
			selectedCard
		} = this.state;
		let level = parseInt(this.props.match.params.levelId);
		let questions = this.props.questionsData.questions[0];
		var totalQuestion = 0;
		if (questions && questions.length > 0) {
			totalQuestion = questions.length;
		}
		const correctAns = this.getCorrectAnswer();
		const progress = this.getProgress();
		const moduleNames = this.props.moduleData.moduleNames;
		console.log('currentScore', currentScore);
		const backUrl = `/module/${this.props.match.params.moduleId}/levels`;
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
						questionId > totalQuestion &&
						this.handleUpdateScore(currentScore) && (
							<Redirect
								to={{
									pathname: '/results',
									state: {
										moduleName: moduleNames[this.props.match.params.moduleId - 1],
										level: level,
										image: parScoreStatus ? hurreyUrl : oopsUrl,
										messageOne: parScoreStatus
											? `Hurrey! You have scored  ${currentScore > 0 ? currentScore : 0}/100.`
											: `Oh! You have scored only  ${currentScore > 0 ? currentScore : 0}/100.`,
										messageTwo: parScoreStatus
											? `You are in top 100 in the rank.`
											: `You need to earn ${this.props.levelsData.parScores[
													level
												]}/100 for Level ${level}.`,
										buttonMessage: !parScoreStatus
											? `Retry Level ${level}`
											: `Continue Level ${level + 1}`
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
								<div className="questions-container">
									<p className="question-label">
										{questions && questions.length > 0 && questions[questionId - 1].question}
									</p>
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
	return { questionsData: state.questionsData, moduleData: state.moduleData, levelsData: state.levelsData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		// onCorrectAns: () => dispatch({ type: 'CORRECT_ANS', val: 0 }),
		// onWrongAns: () => dispatch({ type: 'WRONG_ANS', val: 0 }),
		getQuestions: (questions) => dispatch({ type: FETCH_QUESTIONS, val: questions }),
		getCurrentScores: (currentScores) => dispatch({ type: FETCH_CURRENT_SCORES, val: currentScores })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsAnsPage);

// export default QuestionsAnsPage;
