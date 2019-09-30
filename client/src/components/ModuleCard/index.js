import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { type } from 'os';

export const ModuleCard = (props) => (
	<Link
		className="module-card-link"
		to={{
			pathname: `/module/${props.moduleId}/levels`,
			item:{moduleType:props.moduleType}
		}}

		params={{ moduleType:props.moduleType }}
	>
		<button className={`module-card  ${props.style}`}>
			<p>{props.moduleName}</p>
		</button>
	</Link>
	
);

ModuleCard.propTypes = {
	moduleId: PropTypes.number,
	moduleName: PropTypes.string,
	style: PropTypes.string,
	moduleType:PropTypes.string
};
