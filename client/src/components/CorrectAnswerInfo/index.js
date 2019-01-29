import React, { Fragment } from 'react';
import './styles.scss';
import Card from '../Card';

export const CorrectAnswerInfo = (props) => (
	<Fragment>
		<div className="level-question-detail">
			<span>Level {props.level} :</span>
			<span className="question-number-status">
				Question {props.questionId} out of {props.totalQuestion}
			</span>
		</div>
		<p className="answer">Your answer</p>
		<Card option={props.selectedAnswer} color={'blue'} />
		<p className="answer">Correct answer</p>
		<Card option={props.correctAns} color={'green'} />
		<button className={`next-page-button result-next-page-button`} onClick={props.hideRightAnswer}>
			Proceed
		</button>
	</Fragment>
);
