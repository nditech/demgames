import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import Auth from '../../Auth';
import { config } from "../../settings";

const auth0 = new Auth();

class UpdateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        gameid: 1,
        gametype: "multiplechoice",
        difficulty_level: "",
        question_statement: "",
        weight: "",
        explanation: "",
        isitmedia: "",
      },
      search: {
        id: null,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    event.preventDefault();

    switch (event.target.name) {
      case "id":
        this.setState({
          search: {
            id: event.target.value,
          },
        });
        break;
      default:
        break;
    }
  }

  handleReset() {
    this.setState({
      search: {
        id: '',
      },
    });
  }

  handleChange(e) {
    e.preventDefault();
    const sc = e.target.value;

    switch (e.target.name) {
      case "caption":
        this.setState({
          question: {
            id: this.state.question.id,
            caption: sc,
            gamedescription: this.state.question.gamedescription,
            gametype: this.state.question.gametype,
          },
        });
        break;
      case "gamedescription":
        this.setState({
          question: {
            id: this.state.question.id,
            caption: this.state.question.caption,
            gamedescription: sc,
            gametype: this.state.question.gametype,
          },
        });
        break;
      case "gametype":
        this.setState({
          question: {
            id: this.state.question.id,
            caption: this.state.question.caption,
            gametype: sc,
            gamedescription: this.state.question.gamedescription,
          },
        });
        break;
      default:
        break;
    }
  }

  handleSearch() {
    fetch(`${config.baseUrl}/selectQuestionforDel`, {
      method: 'post',
      headers: {
        authorization: `Bearer ${auth0.getAccessToken()}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state.search),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Not found') {
          alert("Question with specified Id is not found"); // eslint-disable-line
        } else {
          this.setState({
            question: {
              id: data[0].id,
              gameid: data[0].gameid,
              gametype: data[0].gametype,
              difficulty_level: data[0].difficulty_level,
              question_statement: data[0].question_statement,
              weight: data[0].weight,
              explanation: data[0].explanation,
              isitmedia: data[0].isitmedia,
            },
          });
        }
      })
      .catch((error) => console.log(error)); // eslint-disable-line
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `${config.baseUrl}/updatequestion`;
    fetch(url, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${auth0.getAccessToken()}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state.question),
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'updated successfully') {
          alert("Successfully Updated the game detail"); // eslint-disable-line
        }
      })
      .catch((error) => console.log(error)); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <form className="searchQuestion">
          <label htmlFor="id">
            Question id
            <input id="id" type="text" name="id" value={this.state.search.id} onChange={this.handleSearchChange} />
            {' '}
            <br />
          </label>
          <label htmlFor="buttions">
            <input id="buttons" type="button" name="Search" onClick={this.handleSearch} value="Search" />
            <input type="button" name="reset" onClick={this.handleReset} value="Reset" />
          </label>
        </form>
        <div>
          <form className="questionForm" onSubmit={this.handleSubmit}>
            <label htmlFor="question-id">
              Question id
              <input id="question-id" type="text" name="gameid" value={this.state.question.id} />
              {' '}
              <br />
            </label>
            <label htmlFor="game-id">
              Game id
              <input is="game-id" type="text" name="gameid" value={this.state.question.gameid} />
              {' '}
              <br />
            </label>
            <label htmlFor="question-statement">
              Question statement
              <input id="question-statement" type="text" name="question_statement" value={this.state.question.question_statement} />
              {' '}
              <br />
            </label>
            <label htmlFor="question-explanation">
              Question explanation
              <textarea id="question-explanation" type="text" name="explanation" value={this.state.question.explanation} />
              <br />
            </label>
            <label htmlFor="difficulty-level">
              Difficulty level
              <input id="difficulty-level" type="text" name="difficulty_level" value={this.state.question.difficulty_level} />
              {' '}
              <br />
            </label>
            <label htmlFor="weight">
              Weight
              <input id="weight" type="text" name="weight" value={this.state.question.weight} />
              {' '}
              <br />
            </label>
            <label htmlFor="media">
              is it media
              <input id="media" type="text" name="answer" value={this.state.question.isitmedia} />
              {' '}
              <br />
            </label>
            <button type="submit">Update Question</button>
          </form>
        </div>
      </div>
    );
  }
}

UpdateQuestion.propTypes = {
  authDetail: PropTypes.shape({}).isRequired,
};

export default UpdateQuestion;
