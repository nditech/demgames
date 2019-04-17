import React from 'react';
import NdiLogoUrl from '../../images/ndiLogo.png';
import infoUrl from '../../images/info.png';
import profileUrl from '../../images/profile.png';
import { ModuleCard } from '../../components/ModuleCard';
import '../../commonStyles.scss';
import './styles.scss';
import { config } from '../../settings';
import { connect } from 'react-redux';
import { fetchGameData, fetchScores } from './actions';
import PropTypes from 'prop-types';
import GameInfo from '../../components/GameInfo';

global.fetch = require('node-fetch');
class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	//Fetch complete game data.
	componentWillMount() {
		//fetch('./moduleData.json')
                fetch('http://localhost:9000/api/game')
                //fetch(config.baseUrl + '/api/game')
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					response.json().then((res) => {
						this.props.getGameData(res.gameData);
						const scores = this.getScores();
						this.props.getScores(scores);
					});
				} else if (response.status === 404) {
					console.log('Not Found');
				}
			})
			.catch((err) => console.log(err));
	}
	//Fetch scores for each levels of each module.
	getScores = () => {
		const allScores = [];
		this.props.gameData.gameData.map((modules) => {
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
		const gameData = this.props.gameData.gameData;
		const { open } = this.state;
		return (
			<div className="landing-page-wrapper">
				<div className="landing-page-container">
					<div className="header-icon">
						<img className="company-logo" src={NdiLogoUrl} alt="ndi-logo" />
						<div className="info-profile-icon-container">
							<img className="info-icon" src={infoUrl} alt="info-icon" onClick={this.handleClickOpen} />
							<a href="/profile">
								<img className="profile-icon" src={profileUrl} alt="profile-icon" />
							</a>
						</div>
					</div>
					<p className="game-title">DemGames - Demo</p>
					<div className="game-type-card-container">
						{gameData.length > 0 &&
							gameData.map((modules, key) => (
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

const mapStateToProps = (state) => {
	return { gameData: state.gameData };
};

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = (dispatch) => {
	return {
		getGameData: (gameData) => dispatch(fetchGameData(gameData)),
		getScores: (scores) => dispatch(fetchScores(scores))
	};
};

LandingPage.propTypes = {
	getGameData: PropTypes.func,
	getScores: PropTypes.func,
	gameData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

// export default LandingPage;
