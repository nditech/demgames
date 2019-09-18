import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ModuleCard = (props) => (
	<Link
		className="module-card-link"
		to={{
			pathname: `/module/${props.moduleId}/levels`
		}}
	>
		<button className={`module-card  ${props.style}`}>
			<p>{props.moduleName}</p>
		</button>
	</Link>
);

ModuleCard.propTypes = {
	moduleId: PropTypes.number,
	moduleName: PropTypes.string,
	style: PropTypes.string
};
