import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Card } from '../components/Card';
import arrowBackUrl from '../images/back.png';
import infoUrl from '../images/info.png';
import '../styles.scss';

class QuestionsAnsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answerClick: false,
			questionId: 1,
			showAnswer: false,
			selectedAnswer: ''
		};
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handleInfoPageClick = this.handleInfoPageClick.bind(this);
	}
	handleAnswerClick(e) {
		this.setState({ answerClick: true, selectedAnswer: e.target.value });
	}

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
		this.nextQuestion();
		this.handleNextClick();
	}

	handleClick() {
		this.setState((prevState) => ({ showAnswer: !prevState.showAnswer }));
		this.handleNextClick();
	}

	render() {
		const { answerClick, questionId, showAnswer, selectedAnswer } = this.state;
		const { questions, level, moduleName } = this.props.location.state;
		const totalQuestion = questions.length;
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
						{questionId <= totalQuestion ? (
							<div>
								<div className="level-question-detail">
									<span>Level {level} :</span>
									<span className="question-number-status">
										Question {questionId} out of {totalQuestion}
									</span>
								</div>
								<div style={{ backgroundColor: ' gainsboro' }}>
									<div className="progress-bar" />
								</div>
								<div className="question">
									<p>{questions[questionId - 1].question}</p>
								</div>
								<div className="answer-container">
									{!showAnswer ? <p className="select-label">Select the right answer</p> : null}
									{!showAnswer ? (
										questions[questionId - 1].options.map((option, key) => (
											<Card
												key={key}
												option={option}
												correct_answer={questions[questionId - 1].correctAns}
												answerClick={answerClick}
												handleClick={this.handleAnswerClick}
											/>
										))
									) : (
										<Fragment>
											<p>Your answer</p>
											<Card option={selectedAnswer} />
											<p>Correct answer</p>
											<Card
												option={
													questions[questionId - 1].options[
														questions[questionId - 1].correct_answer - 1
													]
												}
												color={'green'}
											/>
											<button
												className={`next-page-button result-next-page-button`}
												onClick={this.handleInfoPageClick}
											>
												Proceed Next
											</button>
										</Fragment>
									)}
								</div>

								{answerClick && (
									<button
										className={`next-page-button next-page-button-${answerClick}`}
										onClick={this.handleClick}
									>
										Proceed Next
									</button>
								)}
							</div>
						) : (
							<Redirect to={{ pathname: '/results', state: { moduleName: moduleName } }} />
						)}
					</Fragment>
				</div>
			</Fragment>
		);
	}
}

export default QuestionsAnsPage;
