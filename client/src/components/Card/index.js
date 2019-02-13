<<<<<<< HEAD
import React, { Component } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { answerClick, option, selectedCard } = this.props;
		return (
			<button
				className={`card-button card-button-${answerClick} card-button-${selectedCard} color-change-${selectedCard} ${this
					.props.color}`}
				type="button"
				onClick={this.props.handleClick}
			>
				{option}
			</button>
		);
	}
}

Card.prototypes = {
	answerClick: PropTypes.bool,
	option: PropTypes.string,
	selectedCard: PropTypes.bool
};

export default Card;
=======
export * from './LevelCard';
export * from './Card';
export * from './CardGroup';
export * from './ModuleCard';
>>>>>>> aa7ca6fc4f47f1526063ddf8aa9e44c8b78c6dbc
