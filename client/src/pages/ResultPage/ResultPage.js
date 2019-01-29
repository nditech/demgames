import React from 'react';
import congoUrl from '../../images/congratulations.png';
import './styles.scss';

export const ResultPage = (props) => (
	<div className="result-page-container">
		<div className="game-type-help">
			<div className="back-module-container">
				<p className="result-module-name">{props.location.state.moduleName}</p>
			</div>
		</div>
		<div className="congratulation-message-container">
			<img src={congoUrl} alt="congratulations-icon" />
			<p>Congratulations !</p>
			<p>You have finished level {props.location.state.level}</p>
		</div>
		<img src={props.location.state.image} alt="icon" />
		<p className="score-message">{props.location.state.message}</p>

		<a className="back-to-all-levels-link" href="/">
			Back to all Levels
		</a>
		<a className="back-to-all-levels-link" href="/">
			<button className={`retry-level`}>Retry Level {props.location.state.level}</button>
		</a>
	</div>
);
