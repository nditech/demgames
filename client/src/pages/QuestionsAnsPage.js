import React, { Fragment } from 'react';
import { Card } from '../components/Card';
import arrowBackUrl from '../images/back.png';

import '../styles.scss';

class QuestionsAnsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answerClick: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({ answerClick: true });
	}

	render() {
		const { answerClick } = this.state;
		const { questions, level, moduleName } = this.props.location.state;
		const questionId = this.props.match.params.questionId;
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
						<p className="help-label">Help</p>
					</div>
					<div className="level-question-detail">
						<span>Level {level} :</span>
						<span>
							Question {questionId} out of {questions.length}
						</span>
					</div>
					<div style={{ backgroundColor: ' gainsboro' }}>
						<div className="progress-bar" />
					</div>
					<div className="question">
						<p>{questions[questionId - 1].question}</p>
					</div>
				</div>
				<div>
					<p className="select-label">Select the right answer</p>
					{questions[questionId].options.map((option, key) => (
						<Card
							key={key}
							option={option}
							correct_answer={questions.correct_answer}
							answerClick={answerClick}
							handleClick={this.handleClick}
						/>
					))}
				</div>
				{answerClick && <button className="next-page-button">Next Page</button>}
			</Fragment>
		);
	}
}

export default QuestionsAnsPage;
