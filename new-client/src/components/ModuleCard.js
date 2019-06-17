import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ModuleCard.scss';

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
