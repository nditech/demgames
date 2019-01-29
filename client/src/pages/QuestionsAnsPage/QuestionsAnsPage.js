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
import './styles.scss';

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
	}

	showRightAnswer() {
		this.setState({ showCorrectAns: true });
	}
	hideRightAnswer() {
		this.setState({ showCorrectAns: false });
		this.nextQuestion();
	}

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
			// this.props.onCorrectAns();
			this.setState({
				answerCorrect: true
				// currentScore: this.props.scores[this.props.location.state.level - 1]
			});
		} else {
			// this.props.onWrongAns();
			this.setState({
				answerCorrect: false
				// currentScore: this.props.scores[this.props.location.state.level - 1]
			});
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

	render() {
		const {
			answerClick,
			questionId,
			showAnswer,
			answerCorrect,
			open,
			parScoreStatus,
			showCorrectAns,
			selectedAnswer,
			currentScore,
			click
		} = this.state;
		const { questions, level, moduleName, parScore } = this.props.location.state;
		const totalQuestion = questions.length;
		const correctAns =
			questionId <= totalQuestion
				? questions[questionId - 1].options[questions[questionId - 1].correct_answer - 1]
				: null;
		const progress = (questionId - 1) / totalQuestion * 100;

		return (
			<Fragment>
				<div className="question-container">
					<div className="game-type-help">
						<div className="back-module-container">
							<button className="back-button">
								<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
							</button>

							<p>{moduleName}</p>
						</div>
						<img className="info-icon" src={infoUrl} alt="info-icon" />
					</div>
					<Fragment>
						{questionId <= totalQuestion ? !showCorrectAns ? (
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
									<p>{questions[questionId - 1].question}</p>
								</div>
								<div className="answer-container">
									{!showAnswer ? <p className="select-label">Select the right answer</p> : null}
									{questions[questionId - 1].options.map((option, key) => (
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
						) : (
							<Redirect
								to={{
									pathname: '/results',
									state: {
										moduleName: moduleName,
										level: level,
										image: parScoreStatus ? hurreyUrl : oopsUrl,
										message: parScoreStatus
											? `Hurrey! You have scored  ${currentScore}/100 You are in top 100 in the rank.`
											: `Oh! You have scored only  ${currentScore}/100 You need to earn ${parScore}/100 for Level ${level +
													1}.`
									}
								}}
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
			</Fragment>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return { scores: state.scores };
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onCorrectAns: () => dispatch({ type: 'CORRECT_ANS' }),
// 		onWrongAns: () => dispatch({ type: 'WRONG_ANS' })
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(QuestionsAnsPage);

export default QuestionsAnsPage;
