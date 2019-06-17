import React from 'react';
import {ndiLogoImg, infoImg, profileImg} from '../img';
import { ModuleCard } from './ModuleCard';
import GameInfo from './GameInfo';
import '../css/general.scss';
import '../css/LandingPage.scss';
import data from '../data.json';

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
            open: false,
            data: data 
        };
    }
    
	//Fetch scores for each levels of each module.
	getScores = () => {
		const allScores = [];
		data.map((modules) => {
			allScores.push(
				modules.levels.map((level) => {
					return level.current_score;
				})
			);
		});
		return allScores;
	};

	//Handle info icon click to open info dialog box.
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	//Handle info dialog box close.
	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { open } = this.state;
		return (
			<div className="landing-page-wrapper">
				<div className="landing-page-container">
					<div className="header-icon">
						<img className="company-logo" src={ndiLogoImg} alt="ndi-logo" />
						<div className="info-profile-icon-container">
							<img className="info-icon" src={infoImg} alt="info-icon" onClick={this.handleClickOpen} />
							<a href="/profile">
								<img className="profile-icon" src={profileImg} alt="profile-icon" />
							</a>
						</div>
					</div>
					<p className="game-title">DemGames - Demo</p>
					<div className="game-type-card-container">
						{this.state.data.length > 0 &&
							this.state.data.map((modules, key) => (
								<ModuleCard
									key={modules.id}
									moduleId={modules.id}
									moduleName={modules.name}
									levels={modules.levels}
									style={modules.style}
									type={modules.type}
								/>
							))}
					</div>
				</div>
				{open && <GameInfo open={open} handleClose={this.handleClose} />}
			</div>
		);
	}
}

export default LandingPage;
