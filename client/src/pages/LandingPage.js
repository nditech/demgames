import React from 'react';
import NdiLogoUrl from '../images/ndiLogo.png';
import profileUrl from '../images/profile.png';
import { ModuleCard } from '../components/ModuleCard';
import '../styles.scss';

class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const moduleData = require('../../../data/Module/moduleData');
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

export default LandingPage;
