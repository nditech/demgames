import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileUrl from "../../images/profile.png";
import { connect } from "react-redux";
import moment from "moment";
import { config } from "../../settings";
import { ListPlayers } from "./../List/ListPlayers";
import { updatePlayer } from "../List//utility";
import "./styles.scss";
import PropTypes from "prop-types";

const ProfileInfo = props => {
  let profileProgressData = null;
  console.log("player email", props.player.player_email);
  let userEmail = props.player.player_email;

  const [profileData, setProfileData] = useState({
    progressData: [],
    cohortRank: "0",
    globalRank: "0",
    cohorts: [],
    players: []
  });

  const {
    progressData,
    cohortRank,
    globalRank,
    cohorts,
    players
  } = profileData;

  const getPlayerProfile = async (email, setPlayerProgress) => {
    const url = config.baseUrl + `/user/get_profile/${email}`;
    await fetch(url, {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "Application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        profileProgressData = data;
        console.log("profile data of P-->", email, JSON.stringify(data));
        setPlayerProgress(data);
      })
      .catch(err => console.log(err));
  };

    const setPlayerProgress = data => {
       let filteredData = data.map(item => {
         return {
           gameName: item["Game.caption"],
           score: item.score,
           cohort: item["Cohort.name"],
           cohort_id: item["Cohort.id"],
           playdate: item.playstartdate
         };
       });
       console.log("fil data", filteredData);
       setProfileData({ ...profileData, progressData: filteredData });
    };

  const getCohort = async userEmail => {
    const url = config.baseUrl + `/listCohort`;
    await fetch(url, {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "Application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("cohortsss data -->", JSON.stringify(data));
        getRank(data[0].id, data);
      })
      .catch(err => console.log(err));
  };

  const setRank = (rankObject, cohorts, changeCohort = false) => {
    let filteredData = progressData;
    if (!changeCohort) {
      filteredData = profileProgressData.map(item => {
        return {
          gameName: item["Game.caption"],
          score: item.score,
          cohort: item["Cohort.name"],
          cohort_id: item["Cohort.id"],
          playdate: item.playstartdate
        };
      });
    }
    setProfileData({
      ...profileData,
      progressData: filteredData,
      cohortRank: rankObject.cohort_rank,
      globalRank: rankObject.global_rank,
      cohorts: cohorts
    });
  };

  const getRank = (cohortId, cohorts, changeCohort = false) => {
    console.log("selected cohort id: ", cohortId);
    const url = config.baseUrl + `/get_cohort_rank/${userEmail}/${cohortId}`;
    fetch(url, {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "Application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("rank data of -->", JSON.stringify(data));
        setRank(data, cohorts, changeCohort);
      })
      .catch(err => console.log(err));
  };

  const handleCohortChange = e => {
    let cohortId = e.target.value;
    getRank(cohortId, cohorts, true);
    console.log("coh id: ", cohortId);
  };

  useEffect(() => {
    getPlayerProfile(userEmail);
    getCohort(userEmail);
  }, []);

  console.log("progress data", progressData);

  const editHandle = id => {
    //alert("inside edit handle and the player id is -- " + id);
    alert(JSON.stringify(props.player));
    const selected_player = players.find(item => {
      return item.id === id;
    });

    setPlayerData({ ...playerData, selectedPlayer: selected_player });
    setPopupState({
      showMessage: true,
      confirmButtonValue: "Update",
      messageTitle: "",
      messageDescription: "",
      onConfirm: editPlayer,
      isConfirmation: true,
      title: "Player detail",
      messageBox: false,
      edit: true,
      create: false,
      onDelete: null,
      removeMessage: false
    });
  };

  return (
    <Fragment>
      <div className="profile-page">
        <div className="container profile-content">
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow pt-5">
                <img
                  className="card-img-top img-fluid rounded p-1"
                  src={`${props.player.player_picture || profileUrl}`}
                />
                <div className="card-body">
                  <h4 className="card-title text-primary">{`${props.player
                    .player_given_name || ""} ${props.player
                    .player_family_name || ""}`}</h4>
                  <p className="card-text mb-1 mt-3 text-secondary">
                    {"Email : "}
                    {props.player.player_email || ""}
                  </p>
                  <p className="card-text mt-0 text-secondary">
                    {"User Name : "}
                    {props.player.player_username || ""}
                  </p>

                  <Link
                    disabled={true}
                    className="btn btn-primary w-100 mt-3"
                    to={<ListPlayers />}
                  >
                    Edit Profiles
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-8 text-center">
              <div className="row card-row">
                <div className="col-md-6 shadow bg-primary text-white">
                  <select
                    name="cohorts"
                    className="custom-select mt-3"
                    onChange={e => handleCohortChange(e)}
                  >
                    {cohorts.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="card-body text-center">
                    <h2>Cohort Rank</h2>
                  </div>
                  <div className="text-center mb-4">
                    <h3>{cohortRank}</h3>
                  </div>
                </div>

                <div className="col-md-6 shadow bg-primary text-white">
                  <div className="card-body text-center">
                    <h2>Global Rank</h2>
                  </div>
                  <div className="text-center mb-4">
                    <h3>{globalRank}</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="shadow progress-status">
                    <div className="jumbotron">
                      <h1>Your Progress</h1>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Game</th>
                            <th>Score</th>
                            <th>Cohort</th>
                            <th>Play Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {progressData &&
                            progressData.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.gameName}</td>
                                  <td>{item.score}</td>
                                  <td>{item.cohort}</td>
                                  <td>
                                    {moment(item.playdate).format(
                                      "Do MMM YYYY, h:mm:ss a"
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  player: state.authDetail.authDetail,
  player_given_name: state.authDetail.authDetail.player_given_name,
  player_picture: state.authDetail.authDetail.player_picture,
  player_family_name:  state.authDetail.authDetail.player_family_name,
  player_given_name:  state.authDetail.authDetail.player_given_name,
  player_email:  state.authDetail.authDetail.player_email,
  gameData: state.gameData,
  cohortData: state.gameData.cohortData,
  scoreDetail : state.scoreDetail
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = dispatch => {
 // console.log(scoreDetail);
 // console.log(cohortData+"cohortData");
  return {
    getGameData: gameData => dispatch(fetchGameData(gameData)),
    getScores: scores => dispatch(fetchScores(scores)),
    getCohorts:cohortData=>dispatch(fetchCohorts(cohortData)),
    setAuth: authDetail => dispatch(fetchAuthDetails(authDetail)),
    clearAuth: authDetail => dispatch(clearAuthDetails(authDetail)),
    setScoreDetail: scoreDetail => dispatch(fetchScoreDetail(scoreDetail))
  };
};

ProfileInfo.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
//export default connect(mapStateToProps, null)(ProfileInfo);


