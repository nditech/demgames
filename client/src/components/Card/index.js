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

Card.propTypes = {
  answerClick: PropTypes.bool,
  option: PropTypes.string,
  selectedCard: PropTypes.bool,
  moduleColor: PropTypes.string,
  color: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

Card.defaultProps = {
  answerClick: null,
  option: null,
  selectedCard: null,
  color: null,
  moduleColor: null,
};
