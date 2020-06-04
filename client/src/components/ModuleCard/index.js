import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { type } from 'os';

export const ModuleCard = (props) => (

  <Link
    className="module-card-link"
    to={{
		  pathname: `/module/${props.moduleType === 'scenario' ? `scenario/${props.gameId}` : props.moduleId}/levels`,
		  item: {
        moduleType: props.moduleType,
		    style: props.style,
		  },
		  state: { style: props.style },
    }}

    params={{
		  moduleType: props.moduleType,
		  style: props.style,
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
  style: PropTypes.string,
  moduleType: PropTypes.string,
};
