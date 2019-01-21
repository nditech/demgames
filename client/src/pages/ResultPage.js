import React from 'react';

import arrowBackUrl from '../images/back.png';
import infoUrl from '../images/info.png';
import congoUrl from '../images/congratulations.png';

export const ResultPage = (props) => (
	<div className="result-page-container">
		<div className="game-type-help">
			<div className="back-module-container">
				<button className="back-button">
					<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
				</button>
				<p className="result-module-name">{props.location.state.moduleName}</p>
			</div>
			<img className="info-icon" src={infoUrl} alt="info-icon" />
		</div>
		<div style={{ backgroundColor: '#f3f6f9', padding: '1em' }}>
			<img src={congoUrl} alt="congratulations-icon" />
			<p>Congratulations !</p>
			<p>You have finished level 1</p>
		</div>
		<img src={props.location.state.image} alt="icon" />
		<p>{props.location.state.message}</p>

		<a href="/" style={{ color: 'black', fontWeight: 'bold' }}>
			Back to Levels
		</a>
		<a href="/" style={{ color: 'black', fontWeight: 'bold' }}>
			<button className={`retry-level`}>Retry Level 1</button>
		</a>
	</div>
);
