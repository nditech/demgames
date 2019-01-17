import React from 'react';
import './styles.scss';

export const Card = (props) => (
	<button className="card-button" type="button" value={props.option}>
		Option {props.option}
	</button>
);
