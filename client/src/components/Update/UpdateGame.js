import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import Auth from '../../Auth';
import { config } from "../../settings";

const auth0 = new Auth();

class UpdateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        id: '',
        caption: "",
        gamedescription: "",
        gametype: "",
      },
      search: {
        id: '',
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
          game: {
            id: this.state.game.id,
            caption: sc,
            gamedescription: this.state.game.gamedescription,
            gametype: this.state.game.gametype,
          },
        });
        break;
      case "gamedescription":
        this.setState({
          game: {
            id: this.state.game.id,
            caption: this.state.game.caption,
            gamedescription: sc,
            gametype: this.state.game.gametype,
          },
        });
        break;
      case "gametype":
        this.setState({
          game: {
            id: this.state.game.id,
            caption: this.state.game.caption,
            gametype: sc,
            gamedescription: this.state.game.gamedescription,
          },
        });
        break;
      default:
        break;
    }
  }

  handleSearch() {
    fetch(`${config.baseUrl}/selectGameforDel`, {
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
          alert("Game with specified Id is not found"); // eslint-disable-line
        } else {
          this.setState({
            game: {
              id: data[0].id,
              caption: data[0].caption,
              gamedescription: data[0].gamedescription,
              gametype: data[0].gametype,
            },
          });
        }
      })
      .catch((error) => console.log(error)); // eslint-disable-line
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `${config.baseUrl}/updategame`;
    fetch(url, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${auth0.getAccessToken()}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state.game),
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
        <form className="searchPlayer">
          <label htmlFor="search-player-game-id">
            Game id
            <input id="search-player-game-id" type="text" name="id" value={this.state.search.id} onChange={this.handleSearchChange} />
            {' '}
            <br />
          </label>
          <label htmlFor="search-player-buttons">
            <input id="search-player-buttons" type="button" name="Search" onClick={this.handleSearch} value="Search" />
            <input type="button" name="reset" onClick={this.handleReset} value="Reset" />
          </label>
        </form>
        <div>
          <form className="questionForm" onSubmit={this.handleSubmit}>
            <label htmlFor="question-form-game-id">
              Game id
              <input id="question-form-game-id" type="text" name="id" value={this.state.game.id} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="question-form-caption">
              Caption
              <input id="question-form-game-caption" type="text" name="caption" value={this.state.game.caption} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="question-form-game-description">
              Game description
              <textarea type="text" name="gamedescription" value={this.state.game.gamedescription} onChange={this.handleChange} />
              <br />
            </label>
            <button type="submit">Update game</button>
          </form>
        </div>
      </div>
    );
  }
}

UpdateGame.propTypes = {
  authDetail: PropTypes.shape({}).isRequired,
};

export default UpdateGame;
