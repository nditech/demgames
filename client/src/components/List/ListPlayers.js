import React, { useEffect, useState } from "react";
import ListTable from "../ListTable";
import Icon from "@material-ui/core/Icon";
import Auth from "../../Auth";
import { config } from "../../settings";
import DialogBox from "../DialogBox/DialogBox";
import { updatePlayer, deletePlayer } from "./utility";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//const auth0 = new Auth();

const ListPlayers = () => {
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

  const [playerData, setPlayerData] = useState({
    player: [{}],
    selectedPlayer: {
      id: "",
      firstname: ""
    }
  });

  const { player, selectedPlayer } = playerData;

  const editPlayerFields = {
    id: selectedPlayer.id,
    values: [
      {
        key: "program",
        type: "text",
        title: "Program",
        value: selectedPlayer.program ? selectedPlayer.program : "",
        editable: true
      },
      {
        key: "gender",
        type: "dropdown",
        title: "Gender",
        options: [
          { id: "female", title: "female" },
          { id: "male", title: "male" },
          { id: "other", title: "other" }
        ],
        editable: true,
        value: selectedPlayer.gender ? selectedPlayer.gender : "female"
      },
      {
        key: "country",
        type: "text",
        title: "Country",
        value: selectedPlayer.country ? selectedPlayer.country : "",
        editable: true
      },
      {
        key: "city",
        type: "text",
        title: "City",
        value: selectedPlayer.city ? selectedPlayer.city : "",
        editable: true
      },
      {
        key: "lastname",
        type: "text",
        title: "Last Name",
        value: selectedPlayer.lastname ? selectedPlayer.lastname : "",
        editable: true
      },
      {
        key: "firstname",
        type: "text",
        title: "First Name",
        value: selectedPlayer.firstname ? selectedPlayer.firstname : "",
        editable: true
      },
      {
        key: "middlename",
        type: "text",
        title: "Middle Name",
        value: selectedPlayer.middlename ? selectedPlayer.middlename : "",
        editable: true
      },
      {
        key: "dateofbirth",
        type: "date",
        title: "Date of Birth",
        value: selectedPlayer.dateofbirth ? selectedPlayer.dateofbirth : "",
        editable: true
      }
    ]
  };

  const columns = [
    {
      name: "Sl. No.",
      selector: "sl",
      sortable: true
    },
    {
      name: "Id",
      selector: "id",
      sortable: true
    },
    {
      name: "First Name",
      selector: "firstname",
      sortable: true
    },
    {
      name: "Last Name",
      selector: "lastname",
      sortable: true
    },
    {
      name: "User name",
      selector: "username",
      sortable: true
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true
    },
    {
      name: "Country",
      selector: "country",
      sortable: true
    },
    {
      name: "Program",
      selector: "program",
      sortable: true
    },
    {
      name: "Date of Birth",
      selector: "dateofbirth",
      sortable: true
    }
  ];

  const leadershipcolumns = [
    {
      name: "ID",
      selector: "id",
      sortable: true
    },
    {
      name: "First Name",
      selector: "firstname",
      sortable: true
    },
    {
      name: "Last Name",
      selector: "lastname",
      sortable: true
    },
    {
      name: "Rank",
      selector: "rank",
      sortable: true
    },
    {
      name: "Score",
      selector: "score",
      sortable: true
    }
  ];

  const cohortleadershipcolumns = [
    {
      name: "ID",
      selector: "id",
      sortable: true
    },
    {
      name: "First Name",
      selector: "firstname",
      sortable: true
    },
    {
      name: "Last Name",
      selector: "lastname",
      sortable: true
    },
    {
      name: "Rank",
      selector: "rank",
      sortable: true
    },
    {
      name: "Score",
      selector: "score",
      sortable: true
    }
  ];

  const [playersData, setPlayersData] = useState({
    user: [{}],
    globalleadership: [{}],
    cohortleadership: [{}],
    noOfPlayers: 0,
    selectedPlayer: { id: "", firstname: "", lastname: "" }
  });
  const [cohort, setCohort] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  // const []

  const { user, globalleadership, cohortleadership, noOfPlayers } = playersData;

  const getPlayers = () => {
    // console.log(this.props.auth);
    const url = config.baseUrl + "/users";
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
        let numberOfPlayers = data.length;
        console.log("api data -->", JSON.stringify(data));
        data.map((item, index) => {
          item.sl = index + 1;
        });
        setPlayersData({
          ...playersData,
          user: data,
          noOfPlayers: numberOfPlayers
        });
      })
      .catch(err => console.log(err));
    console.log(user);
  };

  const getCohort = () => {
    // console.log(this.props.auth);
    const url = config.baseUrl + "/listCohort";
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
        console.log("api data -->", JSON.stringify(data));
        setCohort(data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPlayers();
    getCohort();
  }, []);
  // console.log(cohort, "suyash");
  const handleLeaderShip = (type, id) => {
    let api;
    switch (type) {
      case "all":
        api = config.baseUrl + "/users";
        break;
      case "global":
        api = config.baseUrl + "/list_leaderBoard";
        break;
      case "cohort":
        console.log(id);
        api = config.baseUrl + `/list_cohort_leaderBoard/${id ? id : "1"}`;
        break;
      default:
        break;
    }
    fetch(api, {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "Application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("api data -->", data);

        if (type === "global") {
          let objArray = [];
          data.map((item, index) => {
              let obj = {};
              obj.sl = index + 1;
              obj.id = item.Player.id;
              obj.firstname = item.Player.firstname;
              obj.lastname = item.Player.lastname;
              obj.rank = item.rank;
              obj.score = item.score;
              objArray.push(obj);
          });
          setPlayersData({ ...playersData, globalleadership: objArray });
        }
        if (type === "cohort") {
          let objArray = [];
          data.map((item, index) => {
              let obj = {};
              obj.sl = index + 1;
              obj.id = item.Player.id;
              obj.firstname = item.Player.firstname;
              obj.lastname = item.Player.lastname;
              obj.rank = item.rank;
              obj.score = item.score;
              //obj.cohort = item.cohort;
              objArray.push(obj);
          });
          setPlayersData({ ...playersData, cohortleadership: objArray });
        }

        if (type === "all") {
          data.map((item, index) => {
            item.sl = index + 1;
          });
          setPlayersData({ ...playersData, user: data });
        }

        console.log("playerrrrrr ---- ", playersData);
      })
      .catch(err => console.log(err));
  };

  const deleteHandle = playerId => {
    console.log("cohort id: ", playerId);
    var r = window.confirm(
      "Are you sure you want to delete player with id = " + playerId
    );

    if (r === true) {
      deletePlayer(playerId, function() {
        getPlayers();
      });
    } else {
      return;
    }
  };

  const editHandle = id => {
    // alert("inside edit handle and the player id is -- " + id);

    const selected_player = user.find(item => {
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

  const onCancel = () => {
    setPopupState({ ...popupState, showMessage: false });
  };

  const editPlayer = (data = "", id) => {
    console.log("Dialogbox data", id, data);
    updatePlayer(data, id, function() {
      setPopupState({ ...popupState, showMessage: false });
      getPlayers();
    });
  };

  // const getPlayers = () => {
  //   const url = config.baseUrl + "/users";
  //   fetch(url, {
  //     method: "get",
  //     headers: {
  //       authorization: "Bearer " + localStorage.getItem("access_token"),
  //       "Content-Type": "Application/json",
  //       Accept: "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("cohort api data -->", JSON.stringify(data));
  //       setCohortData({ ...playerData, player: data });
  //     })
  //     .catch(err => console.log(err));
  // };

  // useEffect(() => {
  //   getPlayers();
  // }, []);

  return (
    <>
      <DialogBox
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
      <div className="player-header">
        <div className="playerbox-wrapper">
          <div className="playerbox">
            <div className="playerbox-title">Total Number of Players</div>
            <div className="playerbox-value">{noOfPlayers}</div>
          </div>
        </div>
        <div className="graph"></div>
      </div>
      <div className="detail-box">
        <div className="tab-container">
          <div
            className={`tab ${activeTab === 1 ? "active" : ""}`}
            onClick={() => {
              setActiveTab(1);
              handleLeaderShip("all");
            }}
          >
            All Players
          </div>
          <div
            className={`tab ${activeTab === 2 ? "active" : ""}`}
            onClick={() => {
              setActiveTab(2);
              handleLeaderShip("global");
            }}
          >
            Global Leadership
          </div>
          <div
            className={`tab ${activeTab === 3 ? "active" : ""}`}
            onClick={() => {
              
              setActiveTab(3);
              handleLeaderShip("cohort", 2);
              console.log(JSON.stringify(this.props));
            }}
          >
            Cohort Leadership
          </div>
          {/* <div className='tab-option'>
                  <Icon color="primary" style={{color:"#0d9eea"}}>add_box</Icon>
                  <span className="tab-icons-details">Add Player</span>
                </div> */}
          <div className="listing-players">
            {activeTab === 3 && (
              <div className="cohort-dropdown">
                <span className="cohort-dropdown-title">Choose Cohort</span>
                <select
                  className="cohort-dropdown-value"
                  onChange={(e) => {
                            console.log(e.target.value  + "Value");
                            handleLeaderShip("cohort", 2);
                          } 
                        }
                >
                  {cohort.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
                
              </div>
            )}
            <ListTable
              tableData={{
                          columns:
                            activeTab === 1 ? columns : activeTab === 2 ? leadershipcolumns : cohortleadershipcolumns,
                            confirmMsg: "Are you sure you want to delete the player",
                            hasActionBtns: true,

                          data:
                            activeTab === 1 ? user : activeTab === 2 ? globalleadership : cohortleadership,
                            callbackAfterDelete: getPlayers,
                            deleteHandle: deleteHandle,
                            editHandle: editHandle
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

//export default ListPlayers;


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


const mapDispatchToProps = dispatch => {
  // console.log(cohortData);
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
 
 ListPlayers.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPlayers);
