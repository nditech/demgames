import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from '../Card';

class CorrectAnswerInfo extends Component {
  render() {
    const {
      level,
      questionId,
      moduleId,
      totalQuestion,
      correctAns,
      selectedAnswer,
      hideRightAnswer,
      moduleColor,
    } = this.props;
    const selectedAnsList = [];
    selectedAnsList.push(
      selectedAnswer.map((correct) => this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions[questionId - 1].options[
        correct
      ]),
    );

    let strSelectedAns = '';
    selectedAnsList[0].forEach((val) => {
      strSelectedAns = strSelectedAns.concat(`${val}\n`);
    });

    const correctAnsList = [];
    correctAnsList.push(
      correctAns.map((correct) => this.props.gameData.gameData[moduleId - 1].levels[level - 1].questions[questionId - 1].options[
        correct
      ]),
    );

    let strCorrectAns = '';
    correctAnsList[0].forEach((val) => {
      strCorrectAns = strCorrectAns.concat(`${val}\n`);
    });

    return (
      <>
        <div className="level-question-detail">
          <span>
            Level
            {level}
            :
          </span>
          <span className="question-number-status">
            Question
            {questionId}
            out of
            {totalQuestion}
          </span>
        </div>

        <div className="correct-ans-info-container">
          <p className="answer">Your answer</p>
          <Card option={strSelectedAns} moduleColor={moduleColor} />
          <p className="answer">Correct answer</p>
          <Card option={strCorrectAns} moduleColor={moduleColor} />
          <button type="submit" className="next-page-button result-next-page-button" onClick={hideRightAnswer}>
            Proceed
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ gameData: state.gameData });

export default connect(mapStateToProps, null)(CorrectAnswerInfo);

CorrectAnswerInfo.propTypes = {
  level: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
  moduleId: PropTypes.number.isRequired,
  totalQuestion: PropTypes.number.isRequired,
  correctAns: PropTypes.arrayOf.isRequired,
  selectedAnswer: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  hideRightAnswer: PropTypes.func.isRequired,
  moduleColor: PropTypes.string.isRequired,
  gameData: PropTypes.shape({
    gameData: PropTypes.arrayOf(
      PropTypes.shape({
        levels: PropTypes.arrayOf(
          PropTypes.shape({
            questions: PropTypes.arrayOf(
              PropTypes.shape({
                options: PropTypes.shape({}),
              }),
            ),
          }),
        ),
      }),
    ),
  }).isRequired,
};
