import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <button type="submit" className={`module-card  ${props.style}`}>
      <p>{props.moduleName}</p>
    </button>
  </Link>

);

ModuleCard.propTypes = {
  moduleId: PropTypes.number.isRequired,
  moduleName: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  moduleType: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
};
