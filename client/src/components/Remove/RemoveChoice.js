import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import Auth from '../../Auth';
import { config } from "../../settings";

const auth0 = new Auth();

class RemoveChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choice: {
        choicestatement: '',
        choicedescription: '',
        weight: '',
        isanswer: 0,
        id: null,
        questionid: null,
      },
      search: {
        id: null,
      },
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const sc = e.target.value;

    switch (e.target.name) {
      case "id":
        this.setState({
          id: sc,
        });
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = config.baseUrl = "/deletechoice";
    fetch(url, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${auth0.getAccessToken()}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state.choice),
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // eslint-disable-line
        }
      })
      .catch((error) => console.log(error));  // eslint-disable-line
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

  handleSearch() {
    fetch(`${config.baseUrl}/selectChoiceforDel`, {
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
            choice: {
              id: data[0].id,
              choicestatement: data[0].choicestatement,
              choicedescription: data[0].choicedescription,
              weight: data[0].weight,
              isanswer: data[0].answer,
              questionid: data[0].questionid,
            },
          });
        }
      })
      .catch((error) => console.log(error));  // eslint-disable-line
  }

  handleReset() {
    this.setState({
      search: {
        id: '',
      },
    });
  }

  render() {
    return (
      <div>
        <form className="searchPlayer">
          <label htmlFor="id">
            Choice id
            <input id="id" type="text" name="id" value={this.state.search.id} onChange={this.handleSearchChange} />
            {' '}
            <br />
          </label>
          <label htmlFor="buttons">
            <input id="buttons" type="button" name="Search" onClick={this.handleSearch} value="Search" />
            <input type="button" name="reset" onClick={this.handleReset} value="Reset" />
          </label>
        </form>
        <div>
          <form className="questionForm" onSubmit={this.handleSubmit}>
            <label htmlFor="question-id">
              Question id
              <input id="question-id" type="text" name="questionid" value={this.state.choice.questionid} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="choice-statement">
              Choice statement
              <input id="choice-statement" type="text" name="choicestatement" value={this.state.choice.choicestatement} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="choice-description">
              Choice description
              <textarea id="choice-description" type="text" name="choicedescription" value={this.state.choice.choicedescription} onChange={this.handleChange} />
              <br />
            </label>
            <label htmlFor="weight">
              Weight
              <input id="weight" type="text" name="weight" value={this.state.choice.weight} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="answer">
              is it answer
              <input id="answer" type="text" name="answer" value={this.state.choice.isanswer} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <button type="submit">Delete Choice</button>
          </form>
        </div>
      </div>
    );
  }
}

RemoveChoice.propTypes = {
  authDetail: PropTypes.shape({}).isRequired,
};

export default RemoveChoice;
