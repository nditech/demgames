import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './styles.scss';
function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export const AnswerInfoPopup = (props) => (
	<Dialog
		className="dialog-content"
		open={props.open}
		TransitionComponent={Transition}
		keepMounted
		onClose={props.handleClose}
	>
		<DialogTitle id="dialog-slide-image">
			{<img className="answer-status-logo" src={props.imageUrl} alt="answer-status" />}
		</DialogTitle>
		<DialogContent>
			<DialogContentText id="dialog-slide-description">
				{props.answerStatus ? 'Congratulations !' : ''}
			</DialogContentText>
		</DialogContent>
		<DialogContent>
			<DialogContentText id="dialog-slide-description">{props.message}</DialogContentText>
		</DialogContent>
		<DialogContent>
			<DialogContentText id="dialog-slide-description">
				You have{' '}
				{props.answerStatus ? (
					<span>
						<span>earned</span>
						<span style={{ color: '#12008f' }}> 10</span>
					</span>
				) : (
					<span>
						<span>reduced</span>
						<span style={{ color: '#ed1c24' }}> -10</span>
					</span>
				)}{' '}
				<span>points.</span>
				{!props.answerStatus && <button className="show-right-answer-button">Show me the answer</button>}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={props.handleClose} color="primary">
				OK
			</Button>
		</DialogActions>
	</Dialog>
);
