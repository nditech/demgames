import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card } from "../../components/Card";
import oopsUrl from "../../images/oops.png";
import hurreyUrl from "../../images/hurrey.png";
import { fetchScores } from "../LandingPage/actions";
import "./styles.scss";
import Auth from "../../Auth";
import { config } from "../../settings";

const auth0 = new Auth();

export class ScenarioQuesAns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      answerClick: false,
      questionId: 1,
      showAnswer: false,
      selectedAnswer: [],
      answerCorrect: true,
      parScoreStatus: false,
      showCorrectAns: false,
      currentQuestionScore: 0,
      currentScore: 0,
      totalScore: 0,
      click: false,
      selectedCard: null,
      answerClicked: 0,
      clickedOptions: [],
      moduleScenario: true,
      selectedOption: 0,
      id: 1,
      conclusionReached: false,
      options: [],
      questionStatement: "",
      linkedQuestion: null,
      redirect: false,
      gameId: this.props.match.params.moduleId,
      levelId: this.props.match.params.levelId,
      moduleId: null,
    };
  }

  getModuleId = () => {
    let moduleId = null;
    const gameId = this.props.match.params.moduleId;
    const gameDataArray = this.props.gameData.gameData;
    for (const module of gameDataArray) {
      if (module.game_id == gameId) {
        moduleId = parseInt(module.id, 10);
      }
    }
    return (moduleId);
  }

  // Get list of parScores for a module.
  getParScores = () => {
    const moduleId = this.getModuleId();
    const level = this.props.match.params.levelId;
    const currentLevel = this.props.gameData.gameData[moduleId - 1].levels[level - 1];
    const parScores = currentLevel.par_score > 0 ? currentLevel.par_score : 0;
    return parScores;
  };

  handleAnswerClick = (linkedQuestion, optionId, score) => {
    this.setState(() => ({
      selectedCard: optionId,
      linkedQuestion,
      currentQuestionScore: score,
      answerClick: true,
    }));
  };

  handleScenarioProceed = () => {
    if (this.state.linkedQuestion === null) {
      this.setState({
        redirect: true,
        currentScore: this.state.currentScore + this.state.currentQuestionScore,
      });
    } else {
      const url = `${config.baseUrl}/scenario_question/${this.state.linkedQuestion}`;
      fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${auth0.getAccessToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          if (res.status === 404) {
            this.setState({
              redirect: true,
              currentScore: this.state.currentScore + this.state.currentQuestionScore,
            });
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data) {
            this.setState({
              questionStatement: data.question_statement,
              options: data.options,
              currentScore: this.state.currentScore + this.state.currentQuestionScore,
            });
          }
        })
        .catch(error => console.log(error)); // eslint-disable-line
    }
  };

  checkParScoreStatus = () => {
    const { currentScore } = this.state;
    const parScores = this.getParScores();
    if (currentScore < parScores) {
      return false;
    }
    return true;
  };

  componentDidMount() {
    const url = `${config.baseUrl}/initial_scenario_question/${this.props.match.params.moduleId}/${this.props.match.params.levelId}`;
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${auth0.getAccessToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          questionStatement: data.question_statement,
          options: data.options,
          par_score: data.par_score,
        });
      })
      .catch(error => console.log(error)); // eslint-disable-line
  }

  render() {
    const {
      answerClick,
      questionId,
      showCorrectAns,
      selectedCard,
      redirect,
      currentScore,
      gameId,
    } = this.state;

    const parScoreStatus = this.checkParScoreStatus();
    const level = parseInt(this.props.match.params.levelId, 10);
    const parScore = this.getParScores();
    const moduleId = this.getModuleId();
    const totalScore = this.props.gameData.gameData[moduleId - 1].levels[level - 1].total_score;
    const color = this.props.gameData.gameData[moduleId - 1].style === null ? "blue" : this.props.gameData.gameData[moduleId - 1].style;
    return (
      <>
        <div className="question-main-container">
          <>
            {redirect && (
              <Redirect
                to={{
                  pathname: "/results",
                  state: {
                    gameId,
                    finishedScore: currentScore,
                    moduleScenario: true,
                    totalScore,
                    parScoreStatus,
                    open: true,
                    level,
                    moduleId,
                    image: parScoreStatus ? hurreyUrl : oopsUrl,
                    expression: parScoreStatus ? `Hurray!` : `Oh!`,
                    messageOne: parScoreStatus
                      ? `You have scored  ${
                        currentScore > 0 ? currentScore : currentScore
                      }/${totalScore}.`
                      : `You have scored only  ${
                        currentScore > 0 ? currentScore : 0
                      }/${totalScore}.`,
                    messageTwo: parScoreStatus
                      ? `You are in top 100 in the rank.`
                      : `You need to earn ${parScore}/${totalScore} for Level ${level}.`,
                    buttonMessage: !parScoreStatus
                      ? `Retry Level ${level}`
                      : `Continue Level ${level + 1}`,
                  },
                }}
              />
            )}

            {!showCorrectAns && questionId != null && (
              <div>
                <div className="level-question-detail">
                  <span>Level 1 </span>
                </div>
                <div className="questions-container">
                  <p className={`question-label question-label-${color}`}>
                    {this.state.questionStatement}
                  </p>
                </div>
                <div className="answer-container">
                  <div className="options-card-container">
                    {this.state.options
                      && this.state.options.map(option => (
                        <Card
                          key={option.id}
                          option={option.choicestatement}
                          selectedCard={selectedCard === option.id}
                          handleClick={() => this.handleAnswerClick(
                            option.linked_question,
                            option.id,
                            option.weight,
                          )}
                          moduleColor={color}
                        />
                      ))}

                    {/* ))} */}
                  </div>
                </div>
                {answerClick && (
                  <button
                    type="submit"
                    className={`next-page-button next-page-button-${true}`}
                    onClick={this.handleScenarioProceed}
                  >
                    Proceed
                  </button>
                )}
              </div>
            )}
          </>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({ gameData: state.gameData });

const mapDispatchToProps = dispatch => ({
  getScores: scores => dispatch(fetchScores(scores)),
});

ScenarioQuesAns.propTypes = {
  gameData: PropTypes.shape({
    gameData: PropTypes.arrayOf(
      PropTypes.shape({
        style: PropTypes.string,
        levels: PropTypes.arrayOf(
          PropTypes.shape({
            total_score: PropTypes.number,
            par_score: PropTypes.number,
          }),
        ),
      }),
    ),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      moduleId: PropTypes.string,
      levelId: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScenarioQuesAns);
