import React from 'react';
import './styles.scss';

export const Card = (props) => (
	<button
		className={`card-button card-button-${props.answerClick} ${props.color}`}
		type="button"
		value={props.option}
		onClick={props.handleClick}
	>
		{props.option}
	</button>
);
