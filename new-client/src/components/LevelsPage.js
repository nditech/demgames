import React from 'react';
import {backImg, ndiLogoImg, infoImg, profileImg} from '../img';
import LevelCard from './LevelCard';
import GameInfo from './GameInfo';
import '../css/general.scss';
import '../css/LevelPage.scss';
import data from '../data.json';

class LevelsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
            open: false,
            data: data 
        };
	}

	//Handle info icon click to open info dialog box.
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	//Handle info dialog box close.
	handleClose = () => {
		this.setState({ open: false });
	};

	render() {

		return (
			<div className="landing-page-wrapper">
				<div className="landing-page-container">
					<div className="top-section">
						<div className="back-ndi-logo">
							<button className="back-button">
								<a href="/">
									<img className="back-icon" src={backImg} alt="back-arrow" />
								</a>
							</button>
							<a href="/">
								<img className="company-logo" src={ndiLogoImg} alt="ndi-logo" />
							</a>
						</div>
						<div className="info-profile-icon-container">
							<img className="info-icon" src={infoImg} alt="info-icon" onClick={this.handleClickOpen} />
							<a href="/profile">
								<img className="profile-icon" src={profileImg} alt="profile-icon" />
							</a>
						</div>
					</div>
					<p className="game-title"> {}</p>
					<div className="game-type-card-container">
						<LevelCard/>
					</div>
					{this.state.open && <GameInfo open={this.state.open} handleClose={this.handleClose} />}
				</div>
			</div>
		);
	}
}

export default LevelsPage;
