import React from "react";
import NdiLogoUrl from "../../../../client/src/images/ndiLogo.png";
import "./styles.scss";
import profileUrl from "../../images/profile.png";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";

export const Header = ({ headerTabs, toggleTab, activeTab, name, image }) => {
  console.log(name, image, "header");
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="header-left">
          <div className="header-buttons">
            {headerTabs.map(data => (
              <button
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
        {/* <div className="header-right">
          <div className="header-search">
            <div className="header-searchbox">
              <Icon className="search-icon">search</Icon>
              <input className="header-input" placeholder="search"></input>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
