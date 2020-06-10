import React from 'react';
import PropTypes from 'prop-types';
import "./styles.scss";

export const Header = ({
  headerTabs, toggleTab, activeTab,
}) => (
  <div className="header-wrapper">
    <div className="header-container">
      <div className="header-left">
        <div className="header-buttons">
          {headerTabs.map(data => (
            <button
              key={data}
              type="submit"
              className={`header-button ${
                activeTab.toLowerCase() === data.toLowerCase() ? "active" : ""
              }`}
              onClick={() => toggleTab(data)}
            >
              {data}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  headerTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};
