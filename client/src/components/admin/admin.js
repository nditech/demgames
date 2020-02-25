// Bootstrap
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { Component, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddChoices from "../Add/AddChoices";
import Auth from "../../Auth";
//import notfound from './NotFound';
import DialogBox from "../DialogBox/DialogBox";
import { Header } from "../Header";
import ListGames from "../List/ListGames";
import ListPlayers from "../List/ListPlayers";
import ListCohorts from "../List/ListCohorts";
import Register from "../Add/Register";
import classnames from "classnames";
import Icon from "@material-ui/core/Icon";
import { config } from "../../settings";
import PropTypes from "prop-types";

const auth0 = new Auth();

const auth = new Auth();
const headerTabs = ["games", "players", "cohort"];
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameAdded: false,
      openAddGameModal: false,
      gameData: {},
      score: 0,
      email: this.props.email || null,
      id: null,
      given_name: this.props.given_name,
      family_name: this.props.family_name,
      picture: this.props.picture,
      gender: this.props.gender,
      dateofbirth: this.props.dateofbirth,
      total: 0,
      program_rank: null,
      total_rank: null,
      activeTab: "games",
      activeGameTab: "list",
      activePlayerTab: "list",
      activeQuestionTab: "list",
      activeChoiceTab: "list",
      cohorts: [{ id: "", title: "Select Cohort" }],
      cohortData:{id:0, name:"",logo:""}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.email !== null) {
      const encodedValue = encodeURIComponent(this.state.email);
      console.log("auth ------------------", auth0.getAccessToken());
      fetch(config.baseUrl + `/users`, {
        method: "get",
        headers: {
          authorization: "Bearer " + auth0.getAccessToken(),
          "Content-Type": "Application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(this.state)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            play_id: data[0].play_id,
            player_id: data[0].player_id,
            game_id: data[0].game_id,
            username: data[0].username,
            score: data[0].score,
            total: data[0].total,
            gender: data[0].gender,
            dateofbirth: data[0].dateofbirth,
            city: data[0].city,
            country: data[0].country,
            program: data[0].program,
            program_rank: data[0].program_rank,
            total_rank: data[0].total_rank,
            email: data[0].email
          });
        })
        .catch(error => console.log(error));
    }
    const data = {
        id: "1",
        values: [
          {
            type: "text",
            title: "Game",
            value: "Desiging a argument"
          },
          {
            type: "text",
            title: "Level",
            value: "1"
          },
          {
            type: "text",
            title: "Question",
            value:
              "text question ihsihds ajsijacif njhkf i jhf sjjah hhi dwkhbci  hiuhi onhsiubdhi h ih huho",
            multiline: true,
            editable: true
          },
          {
            type: "options",
            title: "answers",
            value: ["test1", "test2", "test3", "test4"]
          },
          {
            type: "choice",
            title: "Current choice",
            value: "B",
            key: "answers"
          }
        ]
      },
      fields = [
        {
          type: "text",
          title: "Game",
          value: "Desiging a argument"
        },
        {
          type: "text",
          title: "Level",
          value: "1"
        },
        {
          type: "text",
          title: "Question",
          multiline: true,
          editable: true,
          value: ""
        },
        {
          type: "options",
          title: "answers",
          value: ["", "", "", ""]
        },
        {
          type: "choice",
          title: "Correct choice",
          value: "",
          editable: true,
          key: "answers"
        }
      ];
    this.setState({ data, fields });
  }

  handleChange(e) {
    e.preventDefault();
    const sc = e.target.value;
    this.setState({
      score: sc
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      total: Number(this.state.score) + Number(this.state.total)
    });

    const url = config.baseUrl + "/updateplayerscore";
    fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer " + auth0.getAccessToken(),
        "Content-Type": "Application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state),
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  addGameFields = [
    {
      key: "Title",
      type: "text",
      title: "Title",
      value: "",
      editable: true
    },
    {
      key: "Description",
      type: "text",
      title: "Description",
      value: "",
      multiline: true,
      editable: true
    },
    {
      key: "cohort_id",
      type: "dropdown",
      title: "Cohort",
      options: [{ id: "", title: "Select Cohort" }],
      value: "",
      editable: true
    },
    {
      key: "gametype",
      type: "dropdown",
      title: "Game Type",
      options: [
        { id: "", title: "Select Game Type" },
        { id: "multiplechoice", title: "Multiple Choice" },
        { id: "scenario", title: "Scenario" }
      ],
      value: "",
      editable: true
    },
    {
      key: "style",
      type: "dropdown",
      title: "Style",
      options: [
        { id: "", title: "Select Game Color" },
        { id: "green", title: "Green" },
        { id: "blue", title: "Blue" },
        { id: "orange", title: "Orange" }
      ],
      value: "",
      editable: true
    },
    {
      key: "par_score",
      type: "text",
      title: "par_score",
      value: "",
      multiline: true,
      editable: true
    }
  ];

  toggleGame(tab) {
    if (this.state.activeGameTab !== tab) {
      const url = config.baseUrl + `/listCohort/`;
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
          for (let i = 0; i < this.addGameFields.length; i++) {
            if (this.addGameFields[i].key === "cohort_id") {
              let newGameCohorts = [{ id: "", title: "Select Cohort" }];
              data.map(item => {
                newGameCohorts.push({
                  id: item.id,
                  title: item.name
                });
              });
              this.addGameFields[i].options = newGameCohorts;
            }
          }
          console.log("cohorts data -->", JSON.stringify());
          this.setState({
            fields: this.addGameFields,
            // showMessage:true,
            confirmButtonValue: "ADD",
            messageTitle: "",
            messageDescription: "",
            onConfirm: this.addGameCb,
            isConfirmation: true,
            title: "ADD GAME",
            messageBox: false,
            edit: false,
            create: true,
            onDelete: null,
            removeMessage: false,
            cohorts: data,
            showMessage: true
          });
        })
        .catch(err => console.log(err));
    }
  }
  addGameCb = (data = "") => {
    const addGameForm = {
      caption: data.Title,
      gamedescription: data.Description,
      gametype: data.gametype,
      cohort_id: data.cohort_id,
      style: data.style,
      par_score: data.par_score
    };
    console.log(addGameForm);
    console.log("game added. ", data);
    const url = config.baseUrl + "/registergame";
    fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer " + auth0.getAccessToken(),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addGameForm)
    })
      .then(res => {
        if (res.status == 400) {
          throw new Error();
        }
        return res.json();
      })
      .then(data => {
        // alert("paused admin");
        this.setState({ showMessage: false, gameAdded: true });
        toast.info("Successfully Added !", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error =>
        toast.error("Sorry..there is some technical issue", {
          position: toast.POSITION.TOP_CENTER
        })
      );
  };
  editGame = (game, id) => {
    console.log(game, id);
    const data = {
      id,
      values: [
        {
          key: "Title",
          type: "text",
          title: "Title",
          value: game[0].value,
          editable: true
        },
        {
          key: "Description",
          type: "text",
          title: "Description",
          value: game[1].value,
          multiline: true,
          editable: true
        }
      ]
    };
    this.setState(
      {
        data,
        // showMessage:true,
        confirmButtonValue: "UPDATE",
        messageTitle: "",
        messageDescription: "",
        onConfirm: this.editGameCb,
        isConfirmation: true,
        title: "EDIT GAME",
        messageBox: false,
        edit: true,
        create: false,
        onDelete: null,
        removeMessage: false
      },
      () => {
        this.setState({
          // activeGameTab:tab
          showMessage: true
        });
      }
    );
  };
  editGameCb = (data, id) => {
    // debugger;
    const editGameForm = {
      id,
      caption: data.Title,
      gamedescription: data.Description
    };
    console.log(editGameForm);
    console.log("game edited. ", data);
    const url = config.baseUrl + "/Updategame";
    fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer " + auth0.getAccessToken(),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editGameForm)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ showMessage: false, editedDetals: editGameForm });
      })
      .catch(error => console.log(error));
  };

  togglePlayer(tab) {
    if (this.state.activePlayerTab !== tab) {
      this.setState({
        activePlayerTab: tab
      });
    }
  }
  toggleQuestion(tab) {
    if (this.state.activeQuestionTab !== tab) {
      this.setState({
        activeQuestionTab: tab
      });
    }
  }
  toggleChoice(tab) {
    if (this.state.activeChoiceTab !== tab) {
      this.setState({
        activeChoiceTab: tab
      });
    }
  }

  editQuestion = (data = "", id) => {
    console.log(data);
    console.log("Question saved successfully. " + data + " " + id);
  };
  editPopup = () => {
    this.setState({
      showMessage: true,
      confirmButtonValue: "Update",
      messageTitle: "",
      messageDescription: "",
      onConfirm: this.editQuestion,
      isConfirmation: true,
      title: "Question detail",
      messageBox: false,
      edit: true,
      create: false,
      onDelete: null,
      removeMessage: false,
      isRemove: false
    });
  };
  saveQuestion = (data = "") => {
    console.log(data);
    console.log("Question saved successfully. " + data);
  };
  addItemPopup = () => {
    this.setState({
      showMessage: true,
      confirmButtonValue: "Save",
      messageTitle: "",
      messageDescription: "",
      onConfirm: this.saveQuestion,
      isConfirmation: true,
      title: "Question detail",
      messageBox: false,
      edit: false,
      create: true,
      onDelete: null,
      removeMessage: false,
      isRemove: false
    });
  };
  viewPopup = () => {
    this.setState({
      showMessage: true,
      confirmButtonValue: "Edit",
      messageTitle: "",
      messageDescription: "",
      onConfirm: this.editPopup,
      isConfirmation: true,
      title: "Question detail",
      messageBox: false,
      edit: false,
      create: false,
      onDelete: this.onDelete,
      removeMessage: false,
      isRemove: false
    });
  };
  onDelete = () => {
    this.setState({
      showMessage: true,
      confirmButtonValue: "Remove",
      messageTitle: "",
      messageDescription: "",
      onConfirm: this.remove,
      isConfirmation: true,
      title: "Question detail",
      messageBox: false,
      edit: false,
      create: false,
      removeMessage:
        "Are you sure you want to delete question Q1 from level 1?",
      isRemove: true
    });
  };
  remove = () => {
    const { id } = this.state.data;
    console.log("Remove data " + id);
  };
  onCancel = () => {
    this.setState({ showMessage: false });
  };

  handleGameStatus = () => {
    this.setState({ gameAdded: false });
  };

  render() {
    console.log(this.props, "PROPS");
    const {
      showMessage,
      confirmButtonValue,
      messageTitle,
      messageDescription,
      onConfirm,
      isConfirmation,
      title,
      data,
      messageBox,
      edit,
      create,
      fields,
      onDelete,
      removeMessage,
      isRemove
    } = this.state;
    return (
      <Router>
        <Fragment>
          <ToastContainer enableMultiContainer />
          <DialogBox
            confirmButtonValue={confirmButtonValue}
            showMessage={showMessage}
            messageTitle={messageTitle}
            messageDescription={messageDescription}
            onConfirm={onConfirm}
            isConfirmation={isConfirmation}
            onCancel={this.onCancel}
            title={title}
            data={create ? fields : data}
            messageBox={messageBox}
            edit={edit}
            create={create}
            onDelete={onDelete}
            removeMessage={removeMessage}
            isRemove={isRemove}
          />
          <Header
            headerTabs={headerTabs}
            activeTab={this.state.activeTab}
            toggleTab={this.toggle.bind(this)}
            name={this.props.player_given_name}
            image={this.props.player_picture}
          />
          <div
            style={{
              backgroundColor: "#f7f7f7",
              padding: "20px 50px 50px 50px"
            }}
          >
            <div className="containers">
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="games">
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        flex: 1,
                        fontFamily: "Roboto",
                        fontSize: "18px",
                        fontWeight: "normal",
                        fontStyle: "normal",
                        fontStretch: "normal",
                        lineHeight: 1.33,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#707070"
                      }}
                    >
                      All Games
                    </div>
                    <div style={{ flex: 1, textAlign: "right" }}>
                      <Icon
                        color="primary"
                        onClick={() => this.toggleGame("addNew")}
                        style={{ color: "#0d9eea" }}
                      >
                        add_box
                      </Icon>
                      <span
                        style={{
                          verticalAlign: "super",
                          paddingLeft: "20px",
                          fontFamily: "Roboto",
                          fontSize: "13px",
                          fontWeight: 300,
                          fontStyle: "normal",
                          fontStretch: "normal",
                          lineHeight: 1.38,
                          letterSpacing: "normal",
                          textAlign: "right",
                          color: "#707070"
                        }}
                      >
                        Add Game
                      </span>
                    </div>
                  </div>
                  <ListGames
                    editGame={this.editGame}
                    gameAdded={this.state.gameAdded}
                    handleGameStatus={this.handleGameStatus}
                  />
                </TabPane>
                <TabPane tabId="players">
                  <Row>
                    <Col sm="12">
                      <TabContent activeTab={this.state.activePlayerTab}>
                        <TabPane tabId="list">
                          <Row>
                            <Col sm="12">
                              <ListPlayers />
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="addNew">
                          <Row>
                            <Col sm="12">
                              <Register />
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="cohort">
                  <Row>
                    <Col sm="12">
                      <TabContent activeTab={this.state.activePlayerTab}>
                        <TabPane tabId="list">
                          <Row>
                            <Col sm="12">
                              <ListCohorts />
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="addNew">
                          <Row>
                            <Col sm="12">
                              <Register />
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="choices">
                  <Row>
                    <Col sm="12">
                      <Nav pills className="float-right pill-tabs">
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeChoiceTab === "list"
                            })}
                            onClick={() => {
                              this.toggleChoice("list");
                            }}
                          >
                            {" "}
                            List Choices{" "}
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeChoiceTab === "addNew"
                            })}
                            onClick={() => {
                              this.toggleChoice("addNew");
                            }}
                          >
                            {" "}
                            Add New Choice{" "}
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeChoiceTab}>
                        <TabPane tabId="list">
                          <Row>
                            <Col sm="12">{/* <ListChoices /> */}</Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="addNew">
                          <Row>
                            <Col sm="12">
                              <AddChoices />
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

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
 
 Admin.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
