import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrowBackUrl from '../../images/back.png';
import editUrl from '../../images/edit.png';
import changePassUrl from '../../images/changePass.svg';
import Auth from '../../Auth';

import './styles.scss';
// const auth0=new Auth();

// const authDetail={
// 				player_given_name:"",
// 				player_family_name:"",
// 				player_email:"",
// 				player_username:"",
// 				player_picture:"",
// 				player_gender:""
// 			};

let scoreDetail = {
  current: 0,
  score: 0,
  play_id: 'null',
  player_id: 'null',
  game_id: null,
  program: null,
  total: 0,
  program_rank: null,
  total_rank: null,
};

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'example@gmail.com',
      name: this.props.player_given_name,
      password: '12341234',
    };

    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    this.email.focus();
  }

  handleOnKeyUp(target, event) {
    if (event.keyCode === 13) {
      switch (target) {
        case 'email':
          this.name.focus();
          break;
        case 'name':
          this.password.focus();
          break;
        case 'password':
          this.changePassword.focus();
          break;
        default:
          this.email.focus();
      }
    }
  }

  render() {
    const { email, name } = this.state;
    const { current } = this.props;
    scoreDetail = {
      ...scoreDetail,
      current: current[0][0],
    };

    return (
      <div className="profile-info-container">
        <div className="profile-form-container">
          <div className="profile-header">
            <div className="back-module-container">
              <button className="back-button" onClick={this.props.history.goBack}>
                <img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
              </button>
              <p className="my-profile-label">
                {this.props.player_given_name}
                {' '}
                Profile
              </p>
            </div>
            <img
              ref={(input) => {
                this.edit = input;
              }}
              onClick={this.handleEditClick}
              className="edit-icon"
              src={editUrl}
              alt="edit-icon"
            />
          </div>
          <div className="input-container">
            <p className="input-label">Your email address</p>
            <input
              ref={(input) => {
                this.email = input;
              }}
              className="profile-input"
              type="text"
              placeholder={this.props.player_email}
              onKeyUp={this.handleOnKeyUp.bind(this, 'email')}
            />
            <p className="input-label input-label-name">Your name</p>
            <input
              ref={(input) => {
                this.name = input;
              }}
              className="profile-input"
              type="text"
              placeholder={this.props.player_given_name}
              onKeyUp={this.handleOnKeyUp.bind(this, 'name')}
            />
            <p className="input-label input-label-password">Your password</p>
            <input
              ref={(input) => {
                this.password = input;
              }}
              className="profile-input"
              type="password"
              placeholder="********"
              onKeyUp={this.handleOnKeyUp.bind(this, 'password')}
            />
          </div>
          <div className="change-password-container">
            <img className="change-password-icon" src={changePassUrl} alt="back-arrow" />
            <a
              ref={(input) => {
                this.changePassword = input;
              }}
              className="change-password-link"
              href="/profile"
              onClick={this.updateCredentials}
            >
              Change password
            </a>
          </div>
        </div>
        <div>
          <p className="career-progress-label">
            Hi
            {this.props.player_given_name}
            {' '}
            your game progress is as follows
          </p>
          <div className="overall-info">
            <p className="rank-info">
              You are ranked
              {this.props.total_rank}
              {' '}
              overall and
              {this.props.program_rank}
              {' '}
              from your program
            </p>
            <div className="modules-info">
              <p className="heading">
                Designing an Argument - Game
                {this.props.game_id}
              </p>
              <p>
                Currently pursuing
                {' '}
                <span>Level 1</span>
              </p>
              <p>
                Scored
                {' '}
                <span>
                  {this.props.current[0][0]}
                  /100
                </span>
                {' '}
                in
                <span>Level 1</span>
              </p>
              <p className="heading">
                Finding Evidence - Game
                {this.props.game_id}
              </p>
              <p>
                Currently pursuing
                {' '}
                <span>Level 1</span>
              </p>
              <p className="heading">Finding Flaws in Arguments</p>
              <p>Not yet started</p>
              <p>
                {' '}
                Your over all score is
                {this.props.total}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileInfo.propTypes = {
  history: PropTypes.object,
  getGameData: PropTypes.func,
  getScores: PropTypes.func,
  gameData: PropTypes.object,
  authDetail: PropTypes.object,
  setAuth: PropTypes.func,
  clearAuth: PropTypes.func,
  scoreDetail: PropTypes.object,
};


const mapStateToProps = (state) => ({
  player_given_name: state.authDetail.authDetail.player_given_name,
  player_email: state.authDetail.authDetail.player_email,
  player_picture: state.authDetail.authDetail.player_picture,
  gameData: state.gameData,
  player_id: state.scoreDetail.scoreDetail.play_id,
  total: state.scoreDetail.scoreDetail.total,
  total_rank: state.scoreDetail.scoreDetail.total_rank,
  current: state.gameData.scores,
  score: state.scoreDetail.scoreDetail.score,
  play_id: state.scoreDetail.scoreDetail.play_id,
  game_id: state.scoreDetail.scoreDetail.game_id,
  program: state.scoreDetail.scoreDetail.program,
  program_rank: state.scoreDetail.scoreDetail.program_rank,
});

// Dispatch action to fetch game data and scores.
const mapDispatchToProps = (dispatch) => ({
  // getGameData: (gameData) => dispatch(fetchGameData(gameData)),
  getScores: (scores) => dispatch(fetchScores(scores)),
  setAuth: (authDetail) => dispatch(fetchAuthDetails(authDetail)),
  clearAuth: (authDetail) => dispatch(clearAuthDetails(authDetail)),
  getScoreDetails: (scoreDetail) => dispatch(fetchScoreDetails(scoreDetail)),
  setScoreDetails: (scoreDetail) => dispatch(fetchScoreDetails(scoreDetail)),
});

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
export default ProfileInfo;
