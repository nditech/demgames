import React from 'react';
import NdiLogoUrl from '../../images/ndiLogo.png';
import profileUrl from '../../images/profile.png';
import { ModuleCard } from '../../components/ModuleCard';
import '../../commonStyles.scss';
import './styles.scss';
import { config } from '../../settings';
import { connect } from 'react-redux';
import { FETCH_MODULE_NAMES } from './constants';

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { moduleData: [], moduleNames: [] };
	}

	componentWillMount() {
		fetch(config.baseUrl + '/api/modules')
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					response.json().then((res) => {
						const { moduleNames } = this.state;
						res.modules.map((mod) => {
							moduleNames.push(mod.name);
						});
						this.setState({ moduleData: res.modules });
						// this.props.getModulesData(res.modules);
						this.props.getModuleNames(moduleNames);
					});
				} else if (response.status === 404) {
					console.log('Not Found');
				}
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { moduleData } = this.state;
		// const moduleData = this.props.moduleData.data;
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
						{moduleData.length > 0 &&
							moduleData.map((modules, key) => (
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
	// return { moduleData: state.moduleData };
	return { moduleData: state.moduleData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getModuleNames: (moduleNames) => dispatch({ type: FETCH_MODULE_NAMES, val: moduleNames })
		// getModulesData: (data) => dispatch({ type: FETCH_MODULES, val: data })
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

// export default LandingPage;
