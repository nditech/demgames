import React, { Fragment } from 'react';
import './styles.scss';

export const Card = (props) => (
	<button
		className={`card-button card-button-${props.answerClick}`}
		type="button"
		value={props.option}
		onClick={props.handleClick}
	>
		{props.option}
	</button>
);
