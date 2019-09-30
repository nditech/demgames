// Bootstrap
import {
  Button,
  Card,
  CardText,
  CardTitle,
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

import AddChoices from "../Add/AddChoices";
import AddGame from "../Add/AddGame";
import AddQuestion from "../Add/AddQuestion";
import Auth from "../../Auth";
//import notfound from './NotFound';
import Callback from "../../pages/LandingPage/callback";
import DialogBox from "../DialogBox/DialogBox";
import { Header } from "../Header";
// import ListQuestions from '../List/ListQuestions';
import ListChoices from "../List/ListChoices";
import ListGames from "../List/ListGames";
import ListPlayers from "../List/ListPlayers";
import ListQuestions from "../List/ListQuestions";
import Register from "../Add/Register";
import RemoveChoice from "../Remove/RemoveChoice";
import RemovePlayer from "../Remove/RemovePlayer";
import UpdateChoice from "../Update/UpdateChoice";
import UpdateGame from "../Update/UpdateGame";
import UpdatePlayer from "../../components/Update/UpdateProfile";
import UpdateQuestion from "../Update/UpdateQuestion";
import classnames from "classnames";
import removequestion from "../Remove/RemoveQuestion";
import Icon from "@material-ui/core/Icon";

const auth0=new Auth();

//import NotFound from '../../pages/Landin';

const headerTabs = ["games", "players"];
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameAdded:false,
      openAddGameModal: false,
      gameData: {},
      score: 0,
      email: this.props.email || null,
      id: null,
      given_name: this.props.given_name,
      family_name: this.props.family_name,
      picture: this.props.picture,
      gender: this.props.gender,
      total: 0,
      program_rank: null,
      total_rank: null,
      activeTab: "games",
      activeGameTab: "list",
      activePlayerTab: "list",
      activeQuestionTab: "list",
      activeChoiceTab: "list"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.email !== null) {
      const encodedValue = encodeURIComponent(this.state.email);
      console.log("auth ------------------",auth0.getAccessToken());
      fetch(`http://localhost:9000/selectPlayerProfile`, {
        method: "post",
        headers: {
          authorization: "Bearer "+auth0.getAccessToken(),
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

    const url = "http://localhost:9000/updateplayerscore";
    fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer "+auth0.getAccessToken(),
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
  toggleGame(tab) {
    const fields = [
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
      }
    ];
    this.setState(
      {
        fields,
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
        removeMessage: false
      },
      () => {
        if (this.state.activeGameTab !== tab) {
          this.setState({
            // activeGameTab:tab
            showMessage: true
          });
        }
      }
    );
  }
  addGameCb = (data = "") => {
    const addGameForm = {
      caption: data.Title,
      gamedescription: data.Description,
      gametype: data.gametype
    };
    console.log(data);
    console.log("game added. ", data);
    const url = "http://localhost:9000/registergame";
    fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer "+auth0.getAccessToken(),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addGameForm)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ showMessage: false, gameAdded:true });
        alert(data.message);
      })
      .catch(error => console.log(error));
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
    const url = "http://localhost:9000/Updategame";
    fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer "+auth0.getAccessToken(),
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
  // removePopup = () => {
  //   this.setState({
  //     showMessage: true,
  //     confirmButtonValue: "Remove",
  //     messageTitle: "",
  //     messageDescription:
  //       "Are you sure you want to delete question Q1 from level 1?",
  //     onConfirm: this.remove,
  //     isConfirmation: true,
  //     title: "Remove Question",
  //     messageBox: true,
  //     edit: false,
  //     create: false,
  //     onDelete: null,
  //     removeMessage: false,
  //     isRemove: true
  //   });
  // };
  handleGameStatus=()=>{
    this.setState({gameAdded:false});
  }

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
              {/* <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === 'games' })} onClick={() => { this.toggle('games'); }} >
                                    Games
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === 'players' })} onClick={() => { this.toggle('players'); }} >
                                    Players
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === 'questions' })} onClick={() => { this.toggle('questions'); }} >
                                    Questions
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === 'choices' })} onClick={() => { this.toggle('choices'); }} >
                                    Choices
                                </NavLink>
                            </NavItem>
                        </Nav> */}
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
                  {/* <Row>
                  <Col sm="12">
                    <Nav pills className="float-right pill-tabs">
                      <NavItem>
                                                <NavLink className={classnames({ active: this.state.activeGameTab === 'list' })} onClick={() => { this.toggleGame('list'); }} > List Games </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: this.state.activeGameTab === 'addNew' })} onClick={() => { this.toggleGame('addNew'); }} > Add New Game </NavLink>
                                            </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeGameTab}>
                      <TabPane tabId="list">
                        <Row>
                          <Col sm="12">
                            <ListGames editGame={this.editGame} copyGameCb={this.copyGameCb}/>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="addNew">
                        <Row>
                          <Col sm="12">
                            <AddGame />
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row> */}
                </TabPane>
                <TabPane tabId="players">
                  <Row>
                    <Col sm="12">
                      {/* <Nav pills className="float-right pill-tabs"> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activePlayerTab === "list"
                          })}
                          onClick={() => {
                            this.togglePlayer("list");
                          }}
                        >
                          {" "}
                          List Players{" "}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activePlayerTab === "addNew"
                          })}
                          onClick={() => {
                            this.togglePlayer("addNew");
                          }}
                        >
                          {" "}
                          Add New Player{" "}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activePlayerTab === "popup"
                          })}
                          onClick={() => {
                            this.editPopup();
                          }}
                        >
                          Edit Item
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activePlayerTab === "popup"
                          })}
                          onClick={() => {
                            this.addItemPopup();
                          }}
                        >
                          add Item
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activePlayerTab === "popup"
                          })}
                          onClick={() => {
                            this.viewPopup();
                          }}
                        >
                          View Item
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activePlayerTab === "popup"
                          })}
                          onClick={() => {
                            this.removePopup();
                          }}
                        >
                          Delete Item
                        </NavLink>
                      </NavItem>
                    </Nav> */}
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
                {/* <TabPane tabId="questions">
                                <Row>
                                    <Col sm="12">
                                        <Nav pills className="float-right pill-tabs">
                                            <NavItem>
                                                <NavLink className={classnames({ active: this.state.activeQuestionTab === 'list' })} onClick={() => { this.toggleQuestion('list'); }} > List Questions </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: this.state.activeQuestionTab === 'addNew' })} onClick={() => { this.toggleQuestion('addNew'); }} > Add New Question </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeQuestionTab}>
                                            <TabPane tabId="list">
                                                <Row>
                                                    <Col sm="12">
                                                        <ListQuestions />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="addNew">
                                                <Row>
                                                    <Col sm="12">
                                                        <AddQuestion />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </Col>
                                </Row>
                            </TabPane> */}
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

              {/* <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                            <ul className="navbar-nav">
                                <li className="nav-item"><Link className="nav-link" to="/list">List players</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/listgames">List games</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/listquestions">List questions</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/listchoices">List choices</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/UpdatePlayer">Update player</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/registerplayer">Register new player</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/addgame">Add game</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/addchoices">Add choices</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/addquestion">Add question</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/removeplayer">Remove player</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/removechoice">Remove choice</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/removequestion">Remove question</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/updategame">Update game</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/updatequestion">Update question</Link> </li>
                                <li className="nav-item"><Link className="nav-link" to="/updatechoice">Update choice</Link> </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/list" component={ListPlayers} />
                            <Route path="/UpdatePlayer" component={UpdatePlayer} />
                            <Route path="/registerplayer" component={Register} />
                            <Route path="/addgame" component={AddGame} />
                            <Route path="/addchoices" component={AddChoices} />
                            <Route path="/addquestion" component={AddQuestion} />
                            <Route path="/listquestions" component={ListQuestions} />
                            <Route path="/listchoices" component={ListChoices} />
                            <Route path="/listgames" component={ListGames} />
                            <Route path="/removeplayer" component={RemovePlayer} />
                            <Route path="/removechoice" component={RemoveChoice} />
                            <Route path="/removequestion" component={removequestion} />
                            <Route path="/updategame" component={UpdateGame} />
                            <Route path="/updatequestion" component={UpdateQuestion} />
                            <Route path="/updatechoice" component={UpdateChoice} />
                        </Switch> */}
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  player_given_name: state.authDetail.authDetail.player_given_name,
  player_picture: state.authDetail.authDetail.player_picture,
  gameData: state.gameData
});

export default connect(mapStateToProps)(Admin);
