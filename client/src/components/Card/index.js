import React, { Component } from 'react';
import './styles.scss';

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
				value={option}
				onClick={this.props.handleClick}
			>
				{option}
			</button>
		);
	}
}

export default Card;
