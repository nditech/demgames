import React, { Component, Fragment } from "react";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import ListPlayers from "../List/ListPlayers";
import UpdatePlayer from "../../components/Update/UpdateProfile";
import Register from "../Add/Register";
import AddGame from "../Add/AddGame";
import AddChoices from "../Add/AddChoices";
import AddQuestion from "../Add/AddQuestion";
import ListQuestions from "../List/ListQuestions";
import ListChoices from "../List/ListChoices";
import ListGames from "../List/ListGames";
import RemovePlayer from "../Remove/RemovePlayer";
import removequestion from "../Remove/RemoveQuestion";
import RemoveChoice from "../Remove/RemoveChoice";
import UpdateGame from "../Update/UpdateGame";
import UpdateQuestion from "../Update/UpdateQuestion";
import UpdateChoice from "../Update/UpdateChoice";
// Bootstrap
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
//import NotFound from '../../pages/Landin';

import Auth from "../../Auth";
//import notfound from './NotFound';
import Callback from "../../pages/LandingPage/callback";

const auth = new Auth();

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      fetch(`http://localhost:9000/selectPlayerProfile`, {
        method: "post",
        headers: {
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
    if (this.state.activeGameTab !== tab) {
      this.setState({
        activeGameTab: tab
      });
    }
  }
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

  render() {
    return (
      <Router>
        <Fragment>
          <div className="container">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "games"
                  })}
                  onClick={() => {
                    this.toggle("games");
                  }}
                >
                  Games
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "players"
                  })}
                  onClick={() => {
                    this.toggle("players");
                  }}
                >
                  Players
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "questions"
                  })}
                  onClick={() => {
                    this.toggle("questions");
                  }}
                >
                  Questions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "choices"
                  })}
                  onClick={() => {
                    this.toggle("choices");
                  }}
                >
                  Choices
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="games">
                <Row>
                  <Col sm="12">
                    <Nav pills className="float-right pill-tabs">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeGameTab === "list"
                          })}
                          onClick={() => {
                            this.toggleGame("list");
                          }}
                        >
                          {" "}
                          List Games{" "}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeGameTab === "addNew"
                          })}
                          onClick={() => {
                            this.toggleGame("addNew");
                          }}
                        >
                          {" "}
                          Add New Game{" "}
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeGameTab}>
                      <TabPane tabId="list">
                        <Row>
                          <Col sm="12">
                            <ListGames />
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
                </Row>
              </TabPane>
              <TabPane tabId="players">
                <Row>
                  <Col sm="12">
                    <Nav pills className="float-right pill-tabs">
                      <NavItem>
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
                    </Nav>
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
              <TabPane tabId="questions">
                <Row>
                  <Col sm="12">
                    <Nav pills className="float-right pill-tabs">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeQuestionTab === "list"
                          })}
                          onClick={() => {
                            this.toggleQuestion("list");
                          }}
                        >
                          {" "}
                          List Questions{" "}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeQuestionTab === "addNew"
                          })}
                          onClick={() => {
                            this.toggleQuestion("addNew");
                          }}
                        >
                          {" "}
                          Add New Question{" "}
                        </NavLink>
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
                          <Col sm="12">
                            <ListChoices />
                          </Col>
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
        </Fragment>
      </Router>
    );
  }
}

export default Admin;
