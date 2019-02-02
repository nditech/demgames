import React from 'react';
import congoUrl from '../../images/congratulations.png';
import './styles.scss';

export const ResultPage = (props) => (
	<div className="result-page-container">
		<div className="game-type-help">
			<div className="result-back-module-container">
				<p className="result-page-module-name">{props.location.state.moduleName}</p>
			</div>
		</div>
		<div className="congratulation-message-container">
			<img src={congoUrl} alt="congratulations-icon" />
			<p style={{ margin: '20px 0 0 0 ' }}>Congratulations !</p>
			<p style={{ margin: '0' }}>You have finished level {props.location.state.level}</p>
		</div>
		<p className="score-message">{props.location.state.messageOne}</p>
		<img src={props.location.state.image} alt="icon" />

		<p className="score-message">{props.location.state.messageTwo}</p>

		<a className="back-to-all-levels-link" href="/module/1/levels">
			Back to all Levels
		</a>
		<a className="back-to-all-levels-link" href="/module/1/level/1/questions/">
			<button className={`retry-level`}>Retry Level {props.location.state.level}</button>
		</a>
	</div>
);
