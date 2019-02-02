import React from 'react';
import ndiLogoUrl from '../../images/ndiLogo.png';
import arrowBackUrl from '../../images/back.png';
import profileUrl from '../../images/profile.png';
import infoUrl from '../../images/info.png';
import LevelCard from '../../components/LevelCard';
import '../../commonStyles.scss';
import { connect } from 'react-redux';
import GameInfo from '../../components/GameInfo';

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

	render() {
		const moduleNames = this.getModuleNames();
		const { open } = this.state;
		let levels = this.props.gameData.gameData[this.props.match.params.moduleId].levels;
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
					<p className="game-title"> {moduleNames[this.props.match.params.moduleId - 1]}</p>
					<div className="game-type-card-container">
						{levels &&
							levels.length > 0 &&
							levels.map((data, key) => (
								<LevelCard
									key={key}
									level={data.id}
									moduleId={this.props.match.params.moduleId}
									currentScore={data.current_score}
									parScore={data.par_score}
									linkedLevel={data.linked_level}
									description={data.desc}
									totalScore={data.total_score}
									questions={data.questions}
									moduleName={moduleNames[this.props.match.params.moduleId - 1]}
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

export default connect(mapStateToProps, null)(LevelsPage);

// export default LevelsPage;
