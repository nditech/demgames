import React, { Fragment } from 'react';
import arrowBackUrl from '../../images/back.png';
import infoUrl from '../../images/info.png';
import './styles.scss';
import Card from '../Card';

export const CorrectAnswerInfo = () => (
	<Fragment>
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div className="back-module-container">
				<button className="back-button">
					<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
				</button>

				<p>Designing an Argument</p>
			</div>{' '}
			<div>
				<img className="info-icon" src={infoUrl} alt="info-icon" />
			</div>
		</div>

		<div className="level-question-detail">
			<span>Level {1} :</span>
			<span className="question-number-status">
				Question {1} out of {4}
			</span>
		</div>
		<p className="answer">Your answer</p>
		{/* <Card option={selectedAnswer} /> */}
		<Card option={'Selected Answer'} color={'blue'} />
		<p className="answer">Correct answer</p>
		{/* <Card
			// option={questions[questionId - 1].options[questions[questionId - 1].correct_answer - 1]}
			color={'green'}
		/> */}
		<Card option={'Correct Answer'} color={'green'} />
		{/* <button className={`next-page-button result-next-page-button`} onClick={this.handleInfoPageClick}> */}
		<button className={`next-page-button result-next-page-button`}>Proceed Next</button>
	</Fragment>
);
