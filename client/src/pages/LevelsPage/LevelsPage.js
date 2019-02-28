import React from 'react';
import ndiLogoUrl from '../../images/ndiLogo.png';
import arrowBackUrl from '../../images/back.png';
import profileUrl from '../../images/profile.png';
import infoUrl from '../../images/info.png';
import LevelCard from '../../components/LevelCard';
import '../../commonStyles.scss';
import './styles.scss';
import { connect } from 'react-redux';
import GameInfo from '../../components/GameInfo';
import PropTypes from 'prop-types';
class LevelsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	//Handle info icon click to open info dialog box.
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	//Handle info dialog box close.
	handleClose = () => {
		this.setState({ open: false });
	};

	//Get list of all modules.
	getModuleNames = () => {
		const gameData = this.props.gameData.gameData;
		const moduleNames = [];
		gameData.map((modules) => {
			moduleNames.push(modules.name);
		});
		return moduleNames;
	};

	// Get Scores for each levels of a particular module.
	getScores = () => {
		let moduleId = parseInt(this.props.match.params.moduleId);
		const scores = this.props.gameData.scores[moduleId - 1];
		return scores;
	};

	//Get list of par scores for each level of a particular module.
	getParScores = () => {
		let moduleId = parseInt(this.props.match.params.moduleId);
		const parScores = this.props.gameData.gameData[moduleId - 1].levels.map((level) => level.par_score);
		return parScores;
	};

	render() {
		const moduleNames = this.getModuleNames();
		const { open } = this.state;
		const scores = this.getScores();
		const parScores = this.getParScores();
		const moduleId = parseInt(this.props.match.params.moduleId);
		const moduleName = moduleNames[moduleId - 1];
		let levels = this.props.gameData.gameData[moduleId - 1].levels;
		const moduleColor = this.props.gameData.gameData[moduleId - 1].style;

		return (
			<div className="landing-page-wrapper">
				<div className="landing-page-container">
					<div className="top-section">
						<div className="back-ndi-logo">
							<button className="back-button">
								<a href="/">
									<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
								</a>
							</button>
							<a href="/">
								<img className="company-logo" src={ndiLogoUrl} alt="ndi-logo" />
							</a>
						</div>
						<div className="info-profile-icon-container">
							<img className="info-icon" src={infoUrl} alt="info-icon" onClick={this.handleClickOpen} />
							<a href="/profile">
								<img className="profile-icon" src={profileUrl} alt="profile-icon" />
							</a>
						</div>
					</div>
					<p className="game-title"> {moduleName}</p>
					<div className="game-type-card-container">
						{levels &&
							levels.length > 0 &&
							levels.map((data, key) => (
								<LevelCard
									key={key}
									level={data.id}
									moduleId={moduleId}
									prevLevelScore={scores[data.id - 2]}
									currentScore={scores[data.id - 1]}
									parScore={parScores[data.id - 1]}
									linkedLevel={data.linked_level}
									description={data.desc}
									totalScore={data.total_score}
									questions={data.questions}
									moduleName={moduleName}
									moduleColor={moduleColor}
								/>
							))}
					</div>
					{open && <GameInfo open={open} handleClose={this.handleClose} />}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { gameData: state.gameData };
};

LevelsPage.propTypes = {
	gameData: PropTypes.object,
	match: PropTypes.object
};

export default connect(mapStateToProps, null)(LevelsPage);

// export default LevelsPage;
