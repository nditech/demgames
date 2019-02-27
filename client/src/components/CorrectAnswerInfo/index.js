import React, { Fragment, Component } from 'react';
import './styles.scss';
import { Card } from '../Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CorrectAnswerInfo extends Component {
	render() {
		const {
			level,
			questionId,
			moduleId,
			totalQuestion,
			correctAns,
			selectedAnswer,
			hideRightAnswer,
			moduleColor
		} = this.props;
		const selectedAnsList = [];
		selectedAnsList.push(
			selectedAnswer.map((correct) => {
				return this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions[questionId - 1].options[
					correct
				];
			})
		);

		let strSelectedAns = '';
		selectedAnsList[0].map((val) => {
			return (strSelectedAns = strSelectedAns.concat(val + '\n'));
		});

		const correctAnsList = [];
		correctAnsList.push(
			correctAns.map((correct) => {
				return this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions[questionId - 1].options[
					correct
				];
			})
		);

		let strCorrectAns = '';
		correctAnsList[0].map((val) => {
			return (strCorrectAns = strCorrectAns.concat(val + '\n'));
		});

		return (
			<div className="correct-ans-info-container">
				<div className="level-question-detail">
					<span>Level {level} :</span>
					<span className="question-number-status">
						Question {questionId} out of {totalQuestion}
					</span>
				</div>
				<p className="answer">Your answer</p>
				<Card option={strSelectedAns} moduleColor={moduleColor} />
				<p className="answer">Correct answer</p>
				<Card option={strCorrectAns} moduleColor={moduleColor} />
				<button className={`next-page-button result-next-page-button`} onClick={hideRightAnswer}>
					Proceed
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { gameData: state.gameData };
};

export default connect(mapStateToProps, null)(CorrectAnswerInfo);

CorrectAnswerInfo.propTypes = {
	level: PropTypes.number,
	questionId: PropTypes.number,
	moduleId: PropTypes.number,
	totalQuestion: PropTypes.number,
	correctAns: PropTypes.array,
	selectedAnswer: PropTypes.array,
	hideRightAnswer: PropTypes.func,
	gameData: PropTypes.object
};

// export default CorrectAnswerInfo;
