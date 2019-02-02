import React from 'react';
import NdiLogoUrl from '../../images/ndiLogo.png';
import profileUrl from '../../images/profile.png';
import { ModuleCard } from '../../components/ModuleCard';
import '../../commonStyles.scss';
import './styles.scss';
import { config } from '../../settings';
import { connect } from 'react-redux';
import { fetchGameData } from './actions';
class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		fetch(config.baseUrl + '/api/game')
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					response.json().then((res) => {
						this.props.getGameData(res.gameData);
					});
				} else if (response.status === 404) {
					console.log('Not Found');
				}
			})
			.catch((err) => console.log(err));
	}

	render() {
		const gameData = this.props.gameData.gameData;
		return (
			<div className="landing-page-wrapper">
				<div className="landing-page-container">
					<div className="header-icon">
						<img className="company-logo" src={NdiLogoUrl} alt="ndi-logo" />
						<a href="/profile">
							<img className="profile-icon" src={profileUrl} alt="profile-icon" />
						</a>
					</div>
					<p className="game-title">DemGames - Debate</p>
					<div className="game-type-card-container">
						{gameData.length > 0 &&
							gameData.map((modules, key) => (
								<ModuleCard
									key={modules.id}
									moduleId={modules.id}
									moduleName={modules.name}
									levels={modules.levels}
									style={modules.style}
								/>
							))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { gameData: state.gameData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGameData: (gameData) => dispatch(fetchGameData(gameData))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

// export default LandingPage;
