import React from 'react';
import ndiLogoUrl from '../../images/ndiLogo.png';
import arrowBackUrl from '../../images/back.png';
import profileUrl from '../../images/profile.png';
import infoUrl from '../../images/info.png';
import LevelCard from '../../components/LevelCard';
import '../../commonStyles.scss';
import { connect } from 'react-redux';
import GameInfo from '../../components/GameInfo';
import PropTypes from 'prop-types';
class LevelsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	getModuleNames = () => {
		const gameData = this.props.gameData.gameData;
		const moduleNames = [];
		gameData.map((modules) => {
			moduleNames.push(modules.name);
		});
		return moduleNames;
	};

	getScores = () => {
		let moduleId = this.props.match.params.moduleId;
		const scores = this.props.gameData.scores[moduleId - 1];
		return scores;
	};

	getParScores = () => {
		let moduleId = this.props.match.params.moduleId;
		const parScores = this.props.gameData.gameData[moduleId - 1].levels.map((level) => level.par_score);
		return parScores;
	};

	render() {
		const moduleNames = this.getModuleNames();
		const { open } = this.state;
		const scores = this.getScores();
		const parScores = this.getParScores();
		const moduleId = parseInt(this.props.match.params.moduleId);
		let levels = this.props.gameData.gameData[moduleId - 1].levels;
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
					<p className="game-title"> {moduleNames[moduleId - 1]}</p>
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
									moduleName={moduleNames[moduleId - 1]}
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
