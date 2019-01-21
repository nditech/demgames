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
			questionId: 1
		};
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
	}
	handleAnswerClick() {
		this.setState({ answerClick: true });
	}

	nextQuestion() {
		this.setState((prevState) => ({
			questionId: prevState.questionId + 1
		}));
	}

	handleNextClick() {
		this.setState({ answerClick: false });
	}

	handleClick() {
		this.nextQuestion();
		this.handleNextClick();
	}

	render() {
		const { answerClick, questionId } = this.state;
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
									<p className="select-label">Select the right answer</p>
									{questions[questionId - 1].options.map((option, key) => (
										<Card
											key={key}
											option={option}
											correct_answer={questions[questionId - 1].correctAns}
											answerClick={answerClick}
											handleClick={this.handleAnswerClick}
										/>
									))}
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
