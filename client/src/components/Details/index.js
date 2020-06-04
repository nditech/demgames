import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export const Details = ({ data }) => (
  <div className="details-container">
    {data && data.map((d) => (
      <div className="details-box">

        <div className="details-key">
          {d.key}
        </div>
        <div className="details-seprator">:</div>
        <div className="details-value">
          {d.value}
        </div>
      </div>
    ))}
  </div>
);

Details.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

Details.defaultProps = {
  data: null,
};
