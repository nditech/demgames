import React from 'react';
import { Card } from '../components/Card';
import '../styles.scss';

class QuestionsAnsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { options, answers } = this.state;
		return (
			<div className="questions-ans-page-container">
				<div className="question-container">
					<div className="game-type-help">
						<p>Designing an Argument</p>
						<p className="help-label">Help</p>
					</div>
					<div className="level-question-detail">
						<span>Level 1 :</span>
						<span>Question 1 out of 10</span>
					</div>
					<div style={{ backgroundColor: ' gainsboro' }}>
						<div className="progress-bar" />
					</div>
					<div className="question">
						<p>Resolution</p>
					</div>
				</div>
				<div>
					<p className="select-label">Select the right answer</p>
					{options.map((option, key) => <Card key={key} option={option} answers={answers} />)}
				</div>
			</div>
		);
	}
}

export default QuestionsAnsPage;
