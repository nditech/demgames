import React from 'react';

import arrowBackUrl from '../images/back.png';
import infoUrl from '../images/info.png';

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
		<p>Congratulations !</p>
		<p>You have finished level 1</p>
		<p>Oh you have scored only 30/100</p>
		<p>You need to earn 70/100 for level2 </p>
	</div>
);
