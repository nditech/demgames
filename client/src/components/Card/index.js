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
				className={`card-button card-button-${answerClick} color-change-${selectedCard} ${this.props.color}`}
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
