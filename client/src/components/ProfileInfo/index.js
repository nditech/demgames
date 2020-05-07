import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileUrl from "../../images/profile.png";
import { connect } from "react-redux";
import moment from "moment";
import { config } from "../../settings";
import { ToastContainer, toast } from "react-toastify";
import { updatePlayer } from "../List/utility";
import "./styles.scss";
import PropTypes from "prop-types";
import DialogBox from "../DialogBox/DialogBox";

import {
  fetchGameData,
  fetchScores,
  fetchAuthDetails,
  clearAuthDetails,
  fetchCohorts
} from "./action";
import { fetchScoreDetail, updateRouteDetail, setPlayersDetails } from "../../pages/LandingPage/actions";


const ProfileInfo = (props) => {
  
  const [popupState, setPopupState] = useState({
    showMessage: false,
    confirmButtonValue: "Update",
    messageTitle: "",
    messageDescription: "",
    onConfirm: "",
    isConfirmation: true,
    title: "Player detail",
    messageBox: false,
    edit: false,
    create: false,
    onDelete: null,
    removeMessage: false
  });

  const {
    showMessage,
    confirmButtonValue,
    messageTitle,
    messageDescription,
    onConfirm,
    isConfirmation,
    title,
    messageBox,
    edit,
    create,
    onDelete,
    removeMessage
  } = popupState;

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


  const [playerData, setPlayerData] = useState({
    player: [{}],
    selectedPlayer: props.selectedPlayer
  });

  let profileProgressData = null;
  let userEmail = props.player.player_email;

  const { player, selectedPlayer } = playerData;

  console.log("player email----", props.player.player_email);
  console.log(JSON.stringify(props.cohortData));
  
  const editPlayerFields = {
    id: props.selectedPlayer.id,
    values: [
      {
        key: "firstname",
        type: "text",
        title: "First Name",
        value: props.selectedPlayer.firstname?props.selectedPlayer.firstname:"",
        editable: true
      },
      {
        key: "middlename",
        type: "text",
        title: "Middle Name",
        value: props.selectedPlayer.middlename?props.selectedPlayer.middlename:"",
        editable: true
      },
      {
        key: "lastname",
        type: "text",
        title: "Last Name",
        value: props.selectedPlayer.lastname?props.selectedPlayer.lastname:"",
        editable: true
      },
      {
        key: "gender",
        type: "dropdown",
        title: "Gender",
        options: [
          { id: "female", title: "Female" },
          { id: "male", title: "Male" },
          { id: "other", title: "Other" }
        ],
        editable: true,
        value: props.selectedPlayer.gender? props.selectedPlayer.gender:"Female",
      },
      {
        key: "dateofbirth",
        type: "date",
        title: "Date of Birth",
        value: props.selectedPlayer.dateOfBirth? props.selectedPlayer.dateofbirth: props.selectedPlayer.dateofbirth,
        editable: true
      },
      {
        key: "program",
        type: "text",
        title: "Program",
        value: props.selectedPlayer.program? props.selectedPlayer.program:"",
        editable: true
      },
      {
        key: "city",
        type: "text",
        title: "City",
        value: props.selectedPlayer.city? props.selectedPlayer.city:"",
        editable: true
      },      
      {
        key: "country",
        type: "text",
        title: "Country",
        value: props.selectedPlayer.country? props.selectedPlayer.country:"",
        editable: true
      }
    ]
  };

  const onCancel = () => {
      setPopupState({...popupState, showMessage: false });
  };

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
        console.log("Complete profile data of P-->", email, JSON.stringify(data));
        //selectedPlayer=data.Player;
        console.log("Complete player data of P from store-->", email, JSON.stringify(props.authDetail))
        profileProgressData = data;
        
        console.log("profile data of P-->", email, JSON.stringify(data));
        setPlayerProgress;
      })
      .catch(err => console.log(err));
  };

    const setPlayerProgress = data => {
      console.log("Data from SeT Player "+data); 
      let filteredData = data.map(item => {
         return {
           gameName: item["Game.caption"],
           score: item.score,
           cohort: item["Cohort.name"],
           cohort_id: item["Cohort.id"],
           playdate: item.playstartdate,
           level:item.difficulty_level
         };
       });
       console.log("filter data", filteredData);
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
          playdate: item.playstartdate,
          level:item.difficulty_level
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
    //getPlayers(userEmail);
  }, []);

  console.log("progress data", progressData);
  
  const editPlayer = (data = "", id) => {
    console.log("Dialogbox data", id, data);
    console.log("Dialogbox date"+ props.selectedPlayer.dateofbirth + data.dateofbirth);
    updatePlayer(data, id, function() {
      setPopupState({ ...popupState, showMessage: false });
      //setPlayerData({ ...playerData, selectedPlayer: selectedPlayer });
      getPlayers(props.selectedPlayer.email);
    });
   
  };

  const callEditProfile = ()=>  {
    //const textPlayer = [{}];
    const selected_player = player.find(item => {
        return item.email === props.player.player_email;
    });
  
    setPlayerData({...playerData, selectedPlayer: props.selectedPlayer });
    setPopupState({
        showMessage: true,
        confirmButtonValue: "Update",
        messageTitle: "Updating the player title",
        messageDescription: "Updating the player",
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


  const getPlayers = (email) => {
    // console.log(this.props.auth);
    //const url = config.baseUrl + "/users";
    fetch(config.baseUrl + "/user/findOne/" + email, {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type": "Application/json",
          Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log("user data from api below --V");
      console.log(data);
      if (data.email) {
        /*  setPlayersData({...playersData, user: data,noOfPlayers: numberOfPlayers }); */
        props.setPlayers(data);
      }
    })
    .catch(err => console.log(err));
    console.log("Pooled data"+JSON.stringify(props.selectedPlayer));
  };
  

  return (
    <Fragment>
      <
          DialogBox
            confirmButtonValue={confirmButtonValue}
            showMessage={showMessage}
            messageTitle={messageTitle}
            messageDescription={messageDescription}
            onConfirm={onConfirm}
            isConfirmation={isConfirmation}
            onCancel={onCancel}
            title={title}
            data={editPlayerFields}
            messageBox={messageBox}
            edit={edit}
            create={create}
            onDelete={onDelete}
            removeMessage={removeMessage}
            hasChoices={false}
      />

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
                  <div>
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
                  </div>    
                  <div className = "float-center" onClick = {callEditProfile}>
                      <button className = "btn btn-info btn-sm" >
                        Edit Profiles
                      </button>
                  </div>                   
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
                            <th>Cohort</th>
                            <th>Game</th>
                            <th>Diff. Level</th>                            
                            <th>Max. Score</th>
                            <th>Play Date</th>                            
                          </tr>
                        </thead>
                        <tbody>
                          {progressData &&
                            progressData.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.cohort}</td>
                                  <td>{item.gameName}</td>
                                  <td>{item.level}</td>
                                  <td>{item.score}</td>
                                  <td>
                                    {moment(item.playdate).format(
                                      "Do MMM YYYY"
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
  authDetail: state.authDetail,
  gameData: state.gameData,
  cohortData: state.gameData.cohortData,
  scoreDetail : state.scoreDetail,
  selectedPlayer: state.authDetail.selectedPlayer
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = dispatch => {
  return {
    getGameData: gameData => dispatch(fetchGameData(gameData)),
    getScores: scores => dispatch(fetchScores(scores)),
    getCohorts:cohortData=>dispatch(fetchCohorts(cohortData)),
    setAuth: authDetail => dispatch(fetchAuthDetails(authDetail)),
    clearAuth: authDetail => dispatch(clearAuthDetails(authDetail)),
    setScoreDetail: scoreDetail => dispatch(fetchScoreDetail(scoreDetail)),
    setPlayers: selectedPlayer=>dispatch(setPlayersDetails(selectedPlayer))
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
  setPlayers: PropTypes.func,
  selectedPlayer: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);