import React, { useEffect, useState } from "react";
import ListTable from "../ListTable";
import { config } from "../../settings";
import DialogBox from "../DialogBox/DialogBox";
import { updatePlayer, deletePlayer } from "./utility";

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
    removeMessage: false,
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
    removeMessage,
  } = popupState;

  const [playerData, setPlayerData] = useState({
    player: [{}],
    selectedPlayer: { id: "", name: "" },
  });

  const { selectedPlayer } = playerData;

  const editPlayerFields = {
    id: selectedPlayer.id,
    values: [
      {
        key: "program",
        type: "text",
        title: "Program",
        value: selectedPlayer.program ? selectedPlayer.program : "",
        editable: true,
      },
      {
        key: "gender",
        type: "dropdown",
        title: "gender",
        options: [{ id: "male", title: "male" }, { id: "female", title: "female" }],
        editable: true,
        value: "male",
      },
      {
        key: "country",
        type: "text",
        title: "Country",
        value: selectedPlayer.country ? selectedPlayer.country : "",
        editable: true,
      },

    ],
  };

  const columns = [
    {
      name: "Sl. No.",
      selector: "sl",
      sortable: true,
    },
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "lastname",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "firstname",
      sortable: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
    },
    {
      name: "Country",
      selector: "country",
      sortable: true,
    },
    {
      name: "Program",
      selector: "program",
      sortable: true,
    },
  ];

  const leadershipcolumns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Rank",
      selector: "rank",
      sortable: true,
    },
    {
      name: "Score",
      selector: "score",
      sortable: true,
    },
  ];

  const [playersData, setPlayersData] = useState({
    user: [{}],
    globalleadership: [{}],
    cohortleadership: [{}],
    noOfPlayers: 0,
    selectedPlayer: { id: "", name: "" },
  });
  const [cohort, setCohort] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  // const []

  const {
    user, globalleadership, cohortleadership, noOfPlayers,
  } = playersData;

  const getPlayers = () => {
    const url = `${config.baseUrl}/users`;
    fetch(url, {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        const numberOfPlayers = data.length;
        data.map((item, index) => {
          item.sl = index + 1;
        });
        setPlayersData({
          ...playersData,
          user: data,
          noOfPlayers: numberOfPlayers,
        });
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };
  const getCohort = () => {
    const url = `${config.baseUrl}/listCohort`;
    fetch(url, {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setCohort(data);
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };

  useEffect(() => {
    // getPlayers();
    getCohort();
  }, []);
  const handleLeaderShip = (type, id) => {
    let api;
    switch (type) {
      case "all":
        api = `${config.baseUrl}/users`;
        break;
      case "global":
        api = `${config.baseUrl}/list_leaderBoard`;
        break;
      case "cohort":
        api = `${config.baseUrl}/list_cohort_leaderBoard/${id || "1"}`;
        break;
      default:
        break;
    }
    fetch(api, {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (type === "global") {
          const objArray = [];
          data.map((item, index) => {
            const obj = {};
            obj.sl = index + 1;
            obj.id = item.Player.id;
            obj.name = item.Player.firstname;
            obj.rank = item.rank;
            obj.score = item.score;
            objArray.push(obj);
          });
          setPlayersData({ ...playersData, globalleadership: objArray });
        }
        if (type === "cohort") {
          const objArray = [];
          data.map((item, index) => {
            const obj = {};
            obj.sl = index + 1;
            obj.id = item.Player.id;
            obj.name = item.Player.firstname;
            obj.rank = item.rank;
            obj.score = item.score;
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
      })
      .catch(err => console.log(err)); // eslint-disable-line
  };

  const deleteHandle = playerId => {
    const r = window.confirm( // eslint-disable-line
      `Are you sure you want to delete player with id = ${playerId}`,
    );
    if (r === true) {
      deletePlayer(playerId, () => {
        getPlayers();
      });
    } else {

    }
  };

  const editHandle = id => {
    // alert("inside edit handle and the player id is -- " + id);

    const selected_player = user.find(item => item.id === id);

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
      removeMessage: false,
    });
  };

  const onCancel = () => {
    setPopupState({ ...popupState, showMessage: false });
  };

  const editPlayer = (data = "", id) => {
    updatePlayer(data, id, () => {
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
        <div className="graph" />
      </div>
      <div className="detail-box">
        <div className="tab-container">
          <div
            role="button"
            tabIndex={0}
            className={`tab ${activeTab === 1 ? "active" : ""}`}
            onClick={() => {
              setActiveTab(1);
              handleLeaderShip("all");
            }}
          >
            All Players
          </div>
          <div
            role="button"
            tabIndex={0}
            className={`tab ${activeTab === 2 ? "active" : ""}`}
            onClick={() => {
              setActiveTab(2);
              handleLeaderShip("global");
            }}
          >
            Global Leadership
          </div>
          <div
            role="button"
            tabIndex={0}
            className={`tab ${activeTab === 3 ? "active" : ""}`}
            onClick={() => {
              setActiveTab(3);
              handleLeaderShip("cohort");
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
                  onChange={e => handleLeaderShip("cohort", e.target.value)}
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
                  activeTab === 1
                    ? columns
                    : activeTab === 2
                      ? leadershipcolumns
                      : leadershipcolumns,
                confirmMsg: "Are you sure you want to delete the player",
                hasActionBtns: true,
                data:
                  activeTab === 1
                    ? user
                    : activeTab === 2
                      ? globalleadership
                      : cohortleadership,
                callbackAfterDelete: getPlayers,
                deleteHandle,
                editHandle,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPlayers;
