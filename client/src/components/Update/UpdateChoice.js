import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import Auth from '../../Auth';
import { config } from "../../settings";

const auth0 = new Auth();

class UpdateChoice extends Component {
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
      case 'choicestatement':
        this.setState(prevState => ({
          choice: {
            ...prevState.choice,
            choicestatement: sc,
          },
        }));
        break;
      case "choicedescription":
        this.setState(prevState => ({
          choice: {
            ...prevState.choice,
            choicedescription: sc,
          },
        }));
        break;
      case "weight":
        this.setState(prevState => ({
          choice: {
            ...prevState.choice,
            weight: sc,
          },
        }));
        break;
      case "isanswer":
        this.setState(prevState => ({
          choice: {
            ...prevState.choice,
            isanswer: sc,
          },
        }));
        break;
      case "questionid":
        this.setState(prevState => ({
          choice: {
            ...prevState.choice,
            questionid: sc,
          },
        }));
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
          alert("Choice with specified id is not found"); // eslint-disable-line
        } else {
          this.setState({
            choice: {
              choicestatement: data[0].choicestatement,
              choicedescription: data[0].choicedescription,
              weight: data[0].weight,
              isanswer: data[0].isanswer,
              id: data[0].id,
              questionid: data[0].questionid,
            },
          });
        }
      })
      .catch((error) => console.log(error));  // eslint-disable-line
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `${config.baseUrl}/updatechoice`;
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
        if (data.message === 'updated successfully') {
          alert("Successfully Updated the choice detail"); // eslint-disable-line
        }
      })
      .catch((error) => console.log(error)); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <form className="searchChoice">
          <label htmlFor="choice-id">
            Choice id
            <input id="choice-id" type="text" name="id" value={this.state.search.id} onChange={this.handleSearchChange} />
            {' '}
            <br />
          </label>
          <label htmlFor="buttons">
            <input id="buttons" type="button" name="Search" onClick={this.handleSearch} value="Search" />
            <input type="button" name="reset" onClick={this.handleReset} value="Reset" />
          </label>
        </form>
        <div>
          <form className="choiceForm" onSubmit={this.handleSubmit}>
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
            <label htmlFor="is-it-answer">
              is it answer
              <input id="is-it-answer" ctype="text" name="answer" value={this.state.choice.isanswer} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <button type="submit">Update Choice</button>
          </form>
        </div>
      </div>
    );
  }
}

UpdateChoice.propTypes = {
  authDetail: PropTypes.shape({}).isRequired,
};

export default UpdateChoice;
