import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './styles.scss';
import '../../commonStyles.scss';
import PropTypes from 'prop-types';

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
						<span>Info</span>
					</DialogTitle>
					<DialogActions>
						<Button className="ok-button" onClick={this.handleOkClick} color="primary">
							X
						</Button>
					</DialogActions>
				</div>
				<DialogContent>
					<DialogContentText className="info-heading" id="dialog-slide-description">
						<span>What is Lorem Ipsum?</span>
					</DialogContentText>
				</DialogContent>
				<DialogContent>
					<DialogContentText className="info-sub-heading" id="dialog-slide-description">
						<span>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book.
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
