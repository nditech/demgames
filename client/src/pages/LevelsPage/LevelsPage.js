import React from "react";
import LevelCard from "../../components/LevelCard";
import "../../commonStyles.scss";
import "./styles.scss";
import { connect } from "react-redux";
import GameInfo from "../../components/GameInfo";
import PropTypes from "prop-types";
import Auth from "../../Auth";

const auth0 = new Auth();

const authDetail = {
  player_given_name: "",
  player_family_name: "",
  player_email: "",
  player_username: "",
  player_picture: "",
  player_gender: "",
};

class LevelsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  // Handle info icon click to open info dialog box.
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // Handle info dialog box close.
  handleClose = () => {
    this.setState({ open: false });
  };

  // Get list of all modules.
  getModuleNames = () => {
    const { gameData } = this.props.gameData;
    const moduleNames = [];
    gameData.map(modules => {
      moduleNames.push(modules.name);
    });
    return moduleNames;
  };

  // Get Scores for each levels of a particular module.
  getScores = () => {
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const scores = this.props.gameData.scores[moduleId - 1];
    return scores;
  };

  // Get list of par scores for each level of a particular module.
  getParScores = () => {
    const { gameData } = this.props;
    let parScores;
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    if (gameData[gameData[moduleId - 1]]) {
      // /gameData[moduleId - 1].levels["0"].par_score = 0;
      parScores = gameData[moduleId - 1].levels.map(level => level.par_score);
      // parScores[moduleId - 1].levels["0"].par_score = 0;
    }
    return parScores;
  };

  // handle Login in action
  handleLogIn = () => {
    if (!auth0.isAuthenticated()) {
      auth0.login();
    }
  };

  // handle Logout in action
  handleLogOut = () => {
    if (auth0.isAuthenticated()) {
      authDetail.player_given_name = "";
      authDetail.player_family_name = "";
      authDetail.player_email = "";
      authDetail.player_username = "";
      authDetail.player_picture = "";
      authDetail.player_gender = "";
      auth0.logout();
    }
  };

  render() {
    const moduleNames = this.getModuleNames();
    const { open } = this.state;
    const { gameData } = this.props;
    const scores = this.getScores();
    const parScores = this.getParScores();
    const moduleId = parseInt(this.props.match.params.moduleId, 10);
    const moduleName = moduleNames[moduleId - 1];
    let levels; let moduleColor; let moduleType;
    if (gameData.gameData[moduleId - 1]) {
      levels = gameData.gameData[moduleId - 1].levels;
      moduleColor = this.props.gameData.gameData[moduleId - 1].style;
      moduleType = gameData.gameData[moduleId - 1].type;
    }

    return (
      <div className="landing-page-wrapper">
        <div className="landing-page-container">
          <p className="game-title">
            {' '}
            {moduleName}
          </p>
          <div className="game-type-card-container">
            {levels
              && levels.length > 0
              && levels.map((data) => (
                <LevelCard
                  key={data.id}
                  level={data.id}
                  moduleId={moduleId}
                  prevLevelScore={data.id > 1 ? scores[data.id - 2] : 0}
                  currentScore={scores[data.id - 1]}
                  parScore={(data.id && data.id == '2' && parScores) ? parScores[data.id - 1] : 0}
                  linkedLevel={data.linked_level}
                  description={data.desc}
                  totalScore={data.total_score}
                  questions={data.questions}
                  moduleName={moduleName}
                  moduleType={moduleType}
                  moduleColor={moduleColor}
                  player_email={
                    this.props.player_email == null
                      ? "default"
                      : this.props.player_email
                  }
                />
              ))}
          </div>
          {open && <GameInfo open={open} handleClose={this.handleClose} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player_given_name: state.authDetail.authDetail.player_given_name,
  player_picture: state.authDetail.authDetail.player_picture,
  player_email: state.authDetail.authDetail.player_email,
  gameData: state.gameData,
});

// Dispatch action to fetch game data and scores.
const mapDispatchToProps = dispatch => ({
  setAuth: () => dispatch(fetchAuthDetails(authDetail)),
  clearAuth: () => dispatch(clearAuthDetails(authDetail)),
});

LevelsPage.propTypes = {
  gameData: PropTypes.shape({
    gameData: PropTypes.arrayOf(PropTypes.shape({
      levels: PropTypes.string,
      style: PropTypes.string,
      type: PropTypes.string,
    })),
    scores: PropTypes.arrayOf(PropTypes.number),
    params: PropTypes.shape({
      moduleId: PropTypes.string,
    }),
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      moduleId: PropTypes.string,
    }),
  }),
  player_email: PropTypes.string,
};

LevelsPage.defaultProps = {
  gameData: null,
  match: null,
  player_email: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LevelsPage);

// export default LevelsPage;
