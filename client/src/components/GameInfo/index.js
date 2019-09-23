import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import "./styles.scss";
import "../../commonStyles.scss";
import PropTypes from "prop-types";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class GameInfo extends Component {
  constructor(props) {
    super(props);

    this.handleOkClick = this.handleOkClick.bind(this);
  }

  handleOkClick() {
    this.props.handleClose();
  }

  render() {
    const { open, handleClose } = this.props;
    return (
      <Dialog
        className="dialog-content"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <div className="info-page-header">
          <DialogTitle className="info-label" id="dialog-slide-image">
            <span>About DemGames</span>
          </DialogTitle>
          <DialogActions>
            <Button
              className="ok-button"
              onClick={this.handleOkClick}
              color="primary"
            >
              X
            </Button>
          </DialogActions>
        </div>
        <DialogContent>
          <DialogContentText
            className="info-heading"
            id="dialog-slide-description"
          >
            <span>
              DemGames is a lightweight, “edutainment” platform that hosts
              simple games to provide basic instruction at scale to youth on
              democracy concepts. Play through this debate-themed demo!
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText
            className="info-sub-heading"
            id="dialog-slide-description"
          >
            <span>
              DemGames has:
              <ul>
                <li>
                  Self-paced multiple choice and matching questions to offer
                  quick reinforcement on key concepts
                </li>
                <li>
                  Choose-your-own-adventure narration that mimics practical
                  decision-making and builds high-level reasoning skills
                </li>
                <li>
                  Ability to customize themes and certain features to better fit
                  program goals
                </li>
              </ul>
              Players earn points to advance in the game and unlock new levels.
              Program implementer can tailor the level of difficulty and choose
              between the different game types to better match program
              objectives.
            </span>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

GameInfo.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default GameInfo;
