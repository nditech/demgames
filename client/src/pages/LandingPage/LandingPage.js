import React from "react";
import NdiLogoUrl from "../../images/ndiLogo.png";
import infoUrl from "../../images/info.png";
import profileUrl from "../../images/profile.png";
import { ModuleCard } from "../../components/ModuleCard";
import "../../commonStyles.scss";
import "./styles.scss";
import { config } from "../../settings";
import { connect } from "react-redux";
import {
  fetchGameData,
  fetchScores,
  fetchAuthDetails,
  clearAuthDetails,
  fetchCohorts
} from "./actions";
import PropTypes from "prop-types";
import GameInfo from "../../components/GameInfo";
import * as jwtDecode from "jwt-decode";
import Auth from "../../Auth";
import { bindActionCreators } from "redux";
//import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import profile from "../../components/ProfileInfo";
import admin from "../../components/admin/admin";
import UpdatePlayer from "../../components/Update/UpdateProfile";
import { fetchScoreDetail } from "../../components/ProfileInfo/action";
import { da } from "date-fns/locale";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import store from "../../store";

const auth0 = new Auth();

const cohortData = {
  id:0,
  name: "",
  logo: ""
};

const authDetail = {
  player_given_name: "",
  player_family_name: "",
  player_email: "",
  player_username: "",
  player_picture: "",
  player_gender: ""
};

const scoreDetail = {
  current: 0,
  score: 0,
  play_id: "null",
  player_id: "null",
  game_id: null,
  program: null,
  total: 0,
  program_rank: null,
  total_rank: null
};

global.fetch = require("node-fetch");

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      color: "blue",
      cohortData:{
        id:0,
        name:"",
        logo:""
      }
    };

    this.colorChange = this.colorChange.bind(this);
    //this.handleLogIn=this.handleLogIn.bind(this);
  }

  //Fetch complete game data.
  componentWillMount() {
    
    let cohort_name = auth0.getCohort().split("/landingpage")[0].split("/")[1];
    console.log("Cohort Name from "+cohort_name);
    cohortData.id=0;
    cohortData.name="default";
    cohortData.logo="imagedata/ndi1.png";
    console.log(cohortData);
    
    const url = config.baseUrl + "/listCohort/";
      fetch(url+ cohort_name, {
      //fetch(config.baseUrl + "/user/findOne/" + authDetail.player_email,  {
        method: "get",
        headers: {
         // authorization: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type": "Application/json",
          Accept: "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
            if(data.length==0)
            {
              console.log("Data Length is not 0");
              console.log(JSON.stringify(data));
            }
            else
            {
              cohortData.id=data[0].id,
              cohortData.name=data[0].name,
              cohortData.logo=data[0].logo,
              console.log("Data Returned Back" + this.props.getCohorts(cohortData));
            }
        })
        .catch(err => console.log(err));

    if (this.props.match) {
      console.log(this.props.match.params);
      cohortData.name = this.props.match.params.cohortName
        ? this.props.match.params.cohortName
        : "default";
    }
    // fetch('./moduleData.json')
    fetch(config.baseUrl + `/api/v2/game/${cohortData.name}`, {
      method: "get",
      headers: {
        authorization: "Bearer " + auth0.getAccessToken(),
        "Content-Type": "Application/json",
        Accept: "application/json"
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then(res => {
          this.props.getGameData(res.gameData);
          const scores = this.getScores();
          this.props.getScores(scores);
        });
      } else if (response.status === 404) {
        console.log("Not Found");
      }
    })
    .catch(err => console.log(err));

    //auth0.handleAuthentication();
    if (auth0.isAuthenticated() === true) {
      authDetail.player_given_name = auth0.getProfile().given_name;
      authDetail.player_family_name = auth0.getProfile().family_name;
      authDetail.player_picture = auth0.getProfile().picture;
      authDetail.player_username =
        auth0.getProfile().nickname || auth0.getProfile().username;
      authDetail.player_email = auth0.getProfile().email;
      authDetail.player_picture = auth0.getProfile().picture;
      authDetail.player_gender = auth0.getProfile().gender;
      authDetail.player_dateOfBirth = auth0.getProfile().dateOfBirth;

      console.log("auth details below: ----------------- ");
      console.log(auth0.getProfile());
      console.log(auth0.getProfile()["http://demGames.net/roles"]);
      console.log(authDetail);
      console.log(auth0.getProfile());

      this.props.setAuth(authDetail);

      fetch(config.baseUrl + "/user/findOne/" + authDetail.player_email,  {
        method: "get",
        headers: {
          authorization: "Bearer " + auth0.getAccessToken(),
          "Content-Type": "Application/json",
          Accept: "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log("user data from api below --V");
          console.log(data);

          if (!data.email) {
            console.log("email not found --V");

            fetch(config.baseUrl + "/registerplayer/"+ cohort_name, {
              method: "post",
              headers: {
                authorization: "Bearer " + auth0.getAccessToken(),
                "Content-Type": "Application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                firstName: authDetail.player_given_name||authDetail.player_firstname,
                email: authDetail.player_email,
                userName: authDetail.player_username,
                lastName: authDetail.player_lastname||authDetail.player_family_name,
                dateOfBirth: authDetail.player_dateOfBirth
              })
            })
              .then(res => res.json())
              .then(data => {
                console.log("New player registered  ---V");
                console.log(data);
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.props.clearAuth(authDetail);
    }

    if (auth0.isAuthenticated() === true) {
      fetch(config.baseUrl + "/users", {
        method: "get",
        headers: {
          "Content-Type": "Application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(auth0.getProfile())
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          scoreDetail.current = data[0].current;
          scoreDetail.game_id = data[0].game_id;
          scoreDetail.play_id = data[0].id;
          scoreDetail.player_id = data[0].player_id;
          scoreDetail.score = data[0].score;
          scoreDetail.total = data[0].total;
          scoreDetail.total_rank = data[0].total_rank;
          scoreDetail.program = data[0].program;
          scoreDetail.program_rank = data[0].program_rank;
          console.log(scoreDetail);
          this.props.setScoreDetail(scoreDetail);
        })
        .catch(error => console.log(error));
    }
  }
  //Fetch scores for each levels of each module.
  getScores = () => {
    const allScores = [];
    this.props.gameData.gameData.map(modules => {
      allScores.push(
        modules.levels.map(level => {
          return level.current_score;
        })
      );
    });
    return allScores;
  };

  //Handle info icon click to open info dialog box.
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  //Handle info dialog box close.
  handleClose = () => {
    this.setState({ open: false });
  };

  //handle Login in action
  handleLogIn = () => {
    if (!auth0.isAuthenticated()) {
      auth0.login();
    }
  };

  //handle Logout in action
  handleLogOut = () => {
    if (auth0.isAuthenticated()) {
      authDetail.player_given_name = "";
      authDetail.player_family_name = "";
      authDetail.player_email = "";
      authDetail.player_username = "";
      authDetail.player_picture = "";
      authDetail.player_gender = "";
      console.log(authDetail);
      this.props.clearAuth(authDetail);
      auth0.logout();
    }
  };

  // colorChange = (color) => {

  //   alert(color);

  // }

  colorChange = color => {
    this.setState({ color: color });
  };

  render() {
    // console.log(auth0.getProfile()["http://demGames.net/roles"]&&auth0.getProfile()["http://demGames.net/roles"][0]==="admin");
    const gameData = this.props.gameData.gameData;
    const { open } = this.state;
    return (
      <div className="landing-page-wrapper">
        <div className="landing-page-container">
          <div className="game-title-container">
            <p className="game-title">DemGames </p>
          </div>
          <div className="game-type-card-container">
            {gameData.length > 0 &&
              gameData.map((modules, key) => (
                <ModuleCard
                  key={modules.id}
                  moduleId={modules.id}
                  gameId={modules.game_id}
                  moduleName={modules.name}
                  levels={modules.levels}
                  style={modules.style}
                  moduleType={modules.type}
                  player_email={
                    this.props.player_email === null
                      ? "default"
                      : this.props.player_email
                  }
                />
              ))}
          </div>
        </div>
        {open && <GameInfo open={open} handleClose={this.handleClose} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  
  player_given_name: state.authDetail.authDetail.player_given_name,
  player_picture: state.authDetail.authDetail.player_picture,
  gameData: state.gameData,
  cohortData:state.cohortData
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = dispatch => {
  console.log(scoreDetail);
  console.log(cohortData+"cohortData");
  return {
    getGameData: gameData => dispatch(fetchGameData(gameData)),
    getScores: scores => dispatch(fetchScores(scores)),
    getCohorts:cohortData=>dispatch(fetchCohorts(cohortData)),
    setAuth: authDetail => dispatch(fetchAuthDetails(authDetail)),
    clearAuth: authDetail => dispatch(clearAuthDetails(authDetail)),
    setScoreDetail: scoreDetail => dispatch(fetchScoreDetail(scoreDetail))
  };
};

LandingPage.propTypes = {
  getGameData: PropTypes.func,
  getScores: PropTypes.func,
  gameData: PropTypes.object,
  authDetail: PropTypes.object,
  setAuth: PropTypes.func,
  clearAuth: PropTypes.func,
  scoreDetail: PropTypes.object,
  cohortData: PropTypes.object,
  getCohorts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
