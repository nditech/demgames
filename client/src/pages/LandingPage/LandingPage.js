import React from 'react';
import NdiLogoUrl from '../../images/ndiLogo.png';
import profileUrl from '../../images/profile.png';
import { ModuleCard } from '../../components/ModuleCard';
import '../../commonStyles.scss';
import './styles.scss';
import { config } from '../../settings';
import { connect } from 'react-redux';
class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { moduleData: [] };
	}

	componentDidMount() {
		fetch(config.baseUrl + '/api/modules')
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					response.json().then((res) => {
						this.setState({ moduleData: res.data });
						// this.props.getModulesData(res.data);
					});
				} else if (response.status === 404) {
					console.log('Not Found');
				}
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { moduleData } = this.state;
		// console.log(moduleData);
		// const { moduleData } = this.props;
		return (
			<div className="landing-page-wrapper">
				<div className="landing-page-container">
					<div className="header-icon">
						<img className="company-logo" src={NdiLogoUrl} alt="ndi-logo" />
						<img className="profile-icon" src={profileUrl} alt="profile-icon" />
					</div>
					<p className="game-title">DemGames - Debate</p>
					<div className="game-type-card-container">
						{moduleData.map((modules, key) => (
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

// const mapStateToProps = (state) => {
// 	return { data: state.data };
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getModulesData: (data) => dispatch({ type: 'FETCH_MODULES', val: data })
// 	};
// };
// export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

export default LandingPage;
