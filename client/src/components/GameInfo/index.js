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
				<DialogTitle id="dialog-slide-image">
					<p className="info-label">Info</p>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="dialog-slide-description">
						<p className="info-heading">What is Lorem Ipsum?</p>
					</DialogContentText>
				</DialogContent>
				<DialogContent>
					<DialogContentText id="dialog-slide-description">
						<p className="info-sub-heading">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book.
						</p>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{
						<Button className="ok-button" onClick={this.handleOkClick} color="primary">
							OK
						</Button>
					}
				</DialogActions>
			</Dialog>
		);
	}
}

export default GameInfo;
