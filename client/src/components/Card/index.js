import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

export const Card = (props) => (
	<button
		className={`card-button card-button-${props.moduleColor} card-button-${props.answerClick} card-button-${props.selectedCard} color-change-${props.moduleColor}-${props.selectedCard} ${props.color}`}
		type="button"
		onClick={props.handleClick}
	>
		{props.option}
	</button>
);

Card.prototypes = {
	answerClick: PropTypes.bool,
	option: PropTypes.string,
	selectedCard: PropTypes.bool
};
