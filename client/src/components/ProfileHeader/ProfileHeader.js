import React from "react";
// import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Dropdown, Image } from "semantic-ui-react";
import profileUrl from "../../images/profile.png";
import { connect } from "react-redux";
import { clearAuthDetails } from "../../pages/LandingPage/actions";
import Auth from "../../Auth";
const auth0 = new Auth();

const authDetail = {
  player_given_name: "",
  player_family_name: "",
  player_email: "",
  player_username: "",
  player_picture: "",
  player_gender: ""
};

const ProfileHeader = props => {
  console.log("auth detail: ", props);
  let trigger;
  let options = [];

  //handle Login in action
  const handleLogIn = () => {
    if (!auth0.isAuthenticated()) {
      auth0.login();
    }
  };

  //handle Logout in action
  const handleLogOut = () => {
    if (auth0.isAuthenticated()) {
      authDetail.player_given_name = "";
      authDetail.player_family_name = "";
      authDetail.player_email = "";
      authDetail.player_username = "";
      authDetail.player_picture = "";
      authDetail.player_gender = "";
      console.log(authDetail);
      props.clearAuth(authDetail);
      auth0.logout();
    }
  };

  const handleAdmin = () => {
    props.history.push("/admin");
  };

  const handleProfile = () => {
    console.log("profile clicked");
    props.history.push("/profile");
  };
  if (auth0.isAuthenticated()) {
    trigger = (
      <span>
        <Image avatar src={`${props.player.player_picture || profileUrl}`} />{" "}
        {`${props.player.player_given_name || ""} ${props.player
          .player_family_name || ""}`}
      </span>
    );
    options = [
      {
        key: "profile",
        text: "Profile",
        icon: "user",
        onClick: handleProfile
      },
      {
        key: "sign-out",
        text: "Sign Out",
        icon: "sign out",
        onClick: handleLogOut
      }
    ];

    if (
      auth0.getProfile() &&
      auth0.getProfile()["http://demGames.net/roles"] &&
      auth0.getProfile()["http://demGames.net/roles"][0] === "admin"
    ) {
      options.unshift({
        key: "adminPage",
        text: "Admin Page",
        icon: "settings",
        onClick: handleAdmin
      });
    }
  } else {
    trigger = (
      <span>
        <Image avatar src={profileUrl} /> {`Hello. Sign In`}
      </span>
    );
    options = [
      {
        key: "login",
        text: "Login / Sign Up",
        icon: "user",
        onClick: handleLogIn
      }
    ];
  }
  return (
    <Dropdown
      trigger={trigger}
      options={options}
      pointing="top left"
      icon={null}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    clearAuth: authDetail => dispatch(clearAuthDetails(authDetail))
  };
};

const mapStateToProps = state => ({
  player: state.authDetail.authDetail,
  gameData: state.gameData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileHeader));
