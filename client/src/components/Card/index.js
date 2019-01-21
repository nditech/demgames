import React, { Component } from 'react';
import './styles.scss';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			click: false
		};
		this.changeColor = this.changeColor.bind(this);
	}

	changeColor() {
		this.setState({ click: true });
	}

	render() {
		const { answerClick, option } = this.props;
		const { click } = this.state;
		return (
			<button
				className={`card-button card-button-${answerClick} color-change-${click}`}
				type="button"
				value={option}
				onClick={this.props.handleClick}
				onMouseDown={this.changeColor}
			>
				{option}
			</button>
		);
	}
}

export default Card;
