import React from "react";
import NdiLogoUrl from "../../images/ndiLogo.png";
import "./styles.scss";
import profileUrl from "../../images/profile.png";
import Icon from "@material-ui/core/Icon";

export const Header = ({ headerTabs, toggleTab, activeTab, name, image }) => {
  console.log(name,image,"header");
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <img className="company-logo" src={NdiLogoUrl} alt="ndi-logo" />
          </div>
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
        <div className="header-right">
          <div className="header-search">
            <div className="header-searchbox">
              <Icon className="search-icon">search</Icon>
              <input className="header-input" placeholder="search"></input>
            </div>
          </div>
          <div className="header-toolbar">
            <div className="header-options">
              <Icon>search</Icon>
              <Icon>search</Icon>
              <Icon>notifications</Icon>
            </div>
            <div className="header-profile-info">
              <div>{name}</div>
              <Icon>keyboard_arrow_down</Icon>
              <img style={{borderRadius:"100%"}} className="profile-icon" src={image||profileUrl} alt="Log out" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
