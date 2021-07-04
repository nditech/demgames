import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card } from "../../components/Card";
import wrongAnsUrl from "../../images/wrong.png";
import oopsUrl from "../../images/oops.png";
import hurreyUrl from "../../images/hurrey.png";
import AnswerInfoPopup from "../../components/AnswerInfoPopup";
import CorrectAnswerInfo from "../../components/CorrectAnswerInfo";
import { fetchScores } from "../LandingPage/actions";
import ProgressBar from "../../components/ProgressBar";
import "./styles.scss";
import GameInfo from "../../components/GameInfo";

export class QuestionsAnsPage extends React.Component {
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
      currentScore: 0,
      click: false,
      selectedCard: null,
      answerClicked: 0,
      clickedOptions: [],
      moduleScenario: false,
      selectedOption: 0,
      currentQuestionScore: 0,
      gameId: null,
    };
  }

  // To hide question answer and render selected option abd right option.
  showRightAnswer = () => {
    this.setState({ showCorrectAns: true });
  };

  // To show question answer and hide selected option abd right option.
  hideRightAnswer = () => {
    this.setState({ showCorrectAns: false });
    this.nextQuestion();
  };

  // Checks for correct answer and add or reduces scores.
  checkCorrectAnswer = () => {
    const correctAns = this.getCorrectAnswer();
    const selectedValue = this.state.selectedAnswer;
    const correctAnsWeight = this.getCorrectAnswerWeight();
    const correctAnsWeightNum = parseInt(correctAnsWeight, 10) > 0 ? parseInt(correctAnsWeight, 10) : 0;
    selectedValue.sort();
    correctAns.sort();

    if (JSON.stringify(selectedValue) === JSON.stringify(correctAns)) {
      this.setState(prevState => ({
        answerCorrect: true,
        currentQuestionScore: correctAnsWeightNum,
        currentScore: prevState.currentScore + correctAnsWeightNum,
      }));
    } else {
      this.setState(prevState => ({
        answerCorrect: false,
        currentScore: prevState.currentScore - 10,
      }));
    }
  };

  // Increments the question Id by 1 for non-scenario modules.
  nextQuestion = () => {
    this.setState(prevState => ({
      questionId: prevState.questionId + 1,
      selectedAnswer: [],
    }));
  };

  // Handles option click and changes the answerClick state and hides the proceed next button.
  handleNextClick = () => {
    this.setState({ answerClick: false });
  };

  // Handle proceed button click, answer-info dialog box rendering, option click and check for correctAns
  handleProceedNext = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer,
      selectedCard: null,
      answerClicked: 0,
      clickedOptions: [],
    }));
    window.scrollTo(0, 0);
    this.handleNextClick();
    this.handleClickOpen();
    this.checkCorrectAnswer();
  };

  handleClick = () => {
    this.setState(prevState => ({ showAnswer: !prevState.showAnswer }));
    this.handleNextClick();
  };

  // Return Correct answer for current question.
  getCorrectAnswer = () => {
    const { questionId } = this.state;
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const level = parseInt(this.props.match.params.levelId, 10);
    const { questions } = this.props.gameData.gameData[moduleId - 1].levels[level - 1];
    let totalQuestion = 0;
    if (questions && questions.length > 0) {
      totalQuestion = questions.length;
      const correctAns = questionId <= totalQuestion
        ? questions[questionId - 1].correct_answer
        : null;
      return correctAns;
    }
  };

  // Finds the points for the correct answer
  getCorrectAnswerWeight = () => {
    const { questionId } = this.state;
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const level = parseInt(this.props.match.params.levelId, 10);
    const { questions } = this.props.gameData.gameData[moduleId - 1].levels[level - 1];
    let totalQuestion = 0;
    if (questions && questions.length > 0) {
      totalQuestion = questions.length;
      const correctAnsWeight = questionId <= totalQuestion
        ? parseInt(questions[questionId - 1].weight, 10)
        : 0;
      return correctAnsWeight;
    }
  };

  // Return progress for current level.
  getProgress = () => {
    const { questionId } = this.state;
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const level = parseInt(this.props.match.params.levelId, 10);
    const { questions } = this.props.gameData.gameData[moduleId - 1].levels[level - 1];
    let totalQuestion = 0;
    if (questions && questions.length > 0) {
      totalQuestion = questions.length;
      const progress = ((questionId - 1) / totalQuestion) * 100;
      return progress;
    }
  };

  // Renders game info dialog box.
  handleInfoOpen = () => {
    this.setState({ infoOpen: true });
  };

  // Hide game info dialog box.
  handleInfoClose = () => {
    this.setState({ infoOpen: false });
  };

  // Renders AnswerInfo popup and show the points scored.
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // Hide AnswerInfo popup and show the points scored and also checks for parScoreStatus.
  handleClose = () => {
    this.checkParScoreStatus();
    const { questionId } = this.state;
    if (questionId === this.getTotalQuestions()) {
      this.handleUpdateScore();
    }

    this.setState(prevState => ({
      open: false,
      showAnswer: !prevState.showAnswer,
    }));
  };

  // Listens to no of answers clicked and compare it with actual number of answers for a
  // particular question and if it gets equal it locks the options cards.
  checkAnsClicked = answerClicked => {
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const level = parseInt(this.props.match.params.levelId, 10);
    const { questions } = this.props.gameData.gameData[moduleId - 1].levels[level - 1];
    const { questionId } = this.state;
    const correctAnsLength = questions[questionId - 1].correct_answer.length;
    if (answerClicked === correctAnsLength) {
      this.setState({ answerClick: true });
    }
    this.checkLevelUnlock();
  };

  handleAnswerClick = key => () => {
    let { clickedOptions, selectedAnswer } = this.state;
    clickedOptions.push(key);
    const selectedValue = key;
    selectedAnswer = [];
    selectedAnswer.push(selectedValue);

    this.setState(
      prevState => ({
        answerClicked: prevState.answerClicked + 1,
        selectedAnswer,
        selectedCard: key,
        selectedOption: key,
      }),
      () => {
        const { answerClicked } = this.state;
        this.checkAnsClicked(answerClicked);
      },
    );
  };

  // Checks if current score + previous score is less than parScore and return parScoreStatus.
  checkParScoreStatus = () => {
    const { currentScore } = this.state;
    const parScores = this.getParScores();
    if (currentScore < parScores) {
      this.setState({ parScoreStatus: false });
    } else {
      this.setState({ parScoreStatus: true });
    }
  };

  // Get list of module names.
  getModuleNames = () => {
    const { gameData } = this.props.gameData;
    const moduleNames = [];
    gameData.map(modules => moduleNames.push(modules.name));
    return moduleNames;
  };

  // Returns number of questions for current level.
  getTotalQuestions = () => {
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const level = parseInt(this.props.match.params.levelId, 10);
    const { questions } = this.props.gameData.gameData[moduleId - 1].levels[level - 1];
    let totalQuestion = 0;
    if (questions && questions.length > 0) {
      totalQuestion = questions.length;
    }
    return totalQuestion;
  };

  // Get list of parScores for a module.
  getParScores = () => {
    const { moduleId } = this.props.match.params;
    const level = parseInt(this.props.match.params.levelId, 10);
    const currentLevel = this.props.gameData.gameData[moduleId - 1].levels[level - 1];
    const parScores = currentLevel.par_score > 0 ? currentLevel.par_score : 0;
    return parScores;
  };

  checkLevelUnlock = () => {
    const level = parseInt(this.props.match.params.levelId, 10);
    if (level > 1) {
      const parScores = this.getParScores();
      const scores = this.getScores();
      const score = scores[level - 2];
      return score >= parScores;
    }

    return true;
  };

  // Get Scores for each levels of a particular module.
  getScores = () => {
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const scores = this.props.gameData.scores[moduleId - 1];
    return scores;
  };

  handleUpdateScore = () => {
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const level = parseInt(this.props.match.params.levelId, 10);
    const { currentScore } = this.state;
    const totalScore = this.props.gameData.gameData[moduleId - 1].levels[
      level - 1
    ].total_score;

    const newScore = currentScore;
    const currentLevelNewScores = this.props.gameData.scores[moduleId - 1];
    const prevScore = currentLevelNewScores[level - 1];

    currentLevelNewScores[level - 1] = newScore > 0
      ? prevScore + newScore <= totalScore
        ? prevScore + newScore
        : totalScore
      : prevScore;

    this.props.gameData.scores[moduleId - 1] = currentLevelNewScores;
    this.props.getScores(this.props.gameData.scores);
  };

  render() {
    const {
      answerClick,
      questionId,
      showAnswer,
      answerCorrect,
      open,
      parScoreStatus,
      showCorrectAns,
      currentScore,
      selectedAnswer,
      infoOpen,
      selectedCard,
      moduleScenario,
      currentQuestionScore,
    } = this.state;

    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const level = parseInt(this.props.match.params.levelId, 10);
    const totalQuestion = this.getTotalQuestions();
    const correctAns = this.getCorrectAnswer();
    const ansLength = correctAns !== null && parseInt(correctAns.length, 10);
    const progress = this.getProgress();
    const parScores = this.getParScores();
    const moduleNames = this.getModuleNames();
    const { questions } = this.props.gameData.gameData[moduleId - 1].levels[
      level - 1
    ];
    const moduleColor = this.props.gameData.gameData[moduleId - 1].style;
    const totalScore = this.props.gameData.gameData[moduleId - 1].levels[
      level - 1
    ].total_score;
    const isLevelLocked = this.checkLevelUnlock();
    return (
      <>
        <div className="question-main-container">
          <>
            {!isLevelLocked && <Redirect to={`/module/${moduleId}/levels`} />}

            {totalQuestion > 0 && questionId > totalQuestion && (
              <Redirect
                to={{
                  pathname: "/results",
                  state: {
                    player_email: this.props.player_email,
                    moduleId,
                    parScoreStatus,
                    totalScore,
                    finishedScore: currentScore,
                    moduleName: moduleNames[moduleId - 1],
                    level,
                    gameId: this.props.gameData.gameData[moduleId - 1].game_id,
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
                      : `You need to earn ${parScores}/${totalScore} for Level ${level}.`,
                    buttonMessage: !parScoreStatus
                      ? `Retry Level ${level}`
                      : `Continue Level ${level + 1}`,
                  },
                }}
              />
            )}

            {!showCorrectAns ? (
              totalQuestion > 0
              && questionId <= totalQuestion && (
                <div>
                  <div className="level-question-detail">
                    <span>
                      Level
                      {level}
                      {' '}
                      :
                    </span>
                    <span className="question-number-status">
                      Question
                      {' '}
                      {questionId}
                      {' '}
                      out of
                      {' '}
                      {totalQuestion}
                    </span>
                  </div>
                  <div className="progress-bar-container">
                    <ProgressBar progress={progress} />
                  </div>
                  <div className="questions-container">
                    <p
                      className={`question-label question-label-${moduleColor}`}
                    >
                      {questions
                        && questions.length > 0
                        && questions[questionId - 1].question}
                    </p>
                  </div>
                  <div className="answer-container">
                    {!showAnswer && (
                      <p className="select-label">
                        Select
                        {" "}
                        {ansLength > 1
                          ? `${ansLength} answers.`
                          : " the right answer."}
                      </p>
                    )}
                    <div className="options-card-container">
                      {questions
                        && questions.length > 0
                        && questions[questionId - 1].options.map((option, key) => (
                          <Card
                            key={option}
                            option={option}
                            correct_answer={
                              questions[questionId - 1].correctAns
                            }
                            answerClick={answerClick}
                            selectedCard={selectedCard === key}
                            handleClick={this.handleAnswerClick(key)}
                            moduleColor={moduleColor}
                          />
                        ))}
                    </div>
                  </div>

                  {answerClick && (
                    <button
                      type="submit"
                      className={`next-page-button next-page-button-${answerClick}`}
                      onClick={
                        moduleScenario
                          ? this.handleScenarioProceed
                          : this.handleProceedNext
                      }
                    >
                      Proceed
                    </button>
                  )}
                </div>
              )
            ) : (
              <CorrectAnswerInfo
                correctAns={correctAns}
                selectedAnswer={selectedAnswer}
                hideRightAnswer={this.hideRightAnswer}
                moduleId={moduleId}
                level={level}
                questionId={questionId}
                totalQuestion={totalQuestion}
                moduleColor={moduleColor}
              />
            )}
          </>
          {answerCorrect ? (
            <AnswerInfoPopup
              open={open}
              message="Your answer is correct"
              answerStatus
              handleClose={this.handleClose}
              imageUrl=""
              nextQuestion={this.nextQuestion}
              currentQuestionScore={currentQuestionScore}
            />
          ) : (
            <AnswerInfoPopup
              open={open}
              message="Oh! Seems like you selected the wrong answer."
              answerStatus={false}
              handleClose={this.handleClose}
              imageUrl={wrongAnsUrl}
              showRightAnswer={this.showRightAnswer}
              nextQuestion={this.nextQuestion}
              currentQuestionScore={currentQuestionScore}
            />
          )}
        </div>
        {infoOpen && (
          <GameInfo open={infoOpen} handleClose={this.handleInfoClose} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  player_given_name: state.authDetail.authDetail.player_given_name,
  player_picture: state.authDetail.authDetail.player_picture,
  player_email: state.authDetail.authDetail.player_email,
  gameData: state.gameData,
});

const mapDispatchToProps = dispatch => ({
  getScores: scores => dispatch(fetchScores(scores)),
});

QuestionsAnsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      moduleId: PropTypes.string,
      levelId: PropTypes.string,
    }),
  }),
  gameData: PropTypes.shape({
    scores: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    gameData: PropTypes.arrayOf(
      PropTypes.shape({
        style: PropTypes.string,
        game_id: PropTypes.number,
        levels: PropTypes.arrayOf(
          PropTypes.shape({
            par_score: PropTypes.number,
            total_score: PropTypes.string,
            questions: PropTypes.arrayOf({
              correct_answer: PropTypes.string,
            }),
          }),
        ),
      }),
    ),
  }),
  getScores: PropTypes.func.isRequired,
  player_email: PropTypes.string.isRequired,
};
QuestionsAnsPage.defaultProps = {
  gameData: null,
  match: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionsAnsPage);
