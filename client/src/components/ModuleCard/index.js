import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

export const ModuleCard = (props) => (
	<Link
		to={{
			pathname: `/modules/${props.moduleId}/levels`,
			state: { levels: props.levels, moduleName: props.moduleName }
		}}
	>
		<button className={`module-card ${props.style}`}>
			<p>{props.moduleName}</p>
		</button>
	</Link>
);
