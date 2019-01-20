import React from 'react';
import ndiLogoUrl from '../images/ndiLogo.png';
import arrowBackUrl from '../images/back.png';
import profileUrl from '../images/profile.png';
import infoUrl from '../images/info.png';
import { LevelCard } from '../components/LevelCard';
import '../styles.scss';

class LevelsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scores: [ { module: 1, scores: [ 10, 20, 30, 40 ] }, { module: 2, scores: [ 50, 60, 70, 80 ] } ]
		};
	}
	render() {
		const { levels, moduleName } = this.props.location.state;
		return (
			<div className="landing-page-wrapper">
				<div className="landing-page-container">
					<div className="top-section">
						<div className="back-ndi-logo">
							<button className="back-button">
								<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
							</button>
							<a href="/">
								<img className="company-logo" src={ndiLogoUrl} alt="ndi-logo" />
							</a>
						</div>
						<div className="info-profile-icon-container">
							<img className="info-icon" src={infoUrl} alt="info-icon" />
							<img className="profile-icon" src={profileUrl} alt="profile-icon" />
						</div>
					</div>
					<p className="game-title"> {moduleName}</p>
					<div className="game-type-card-container">
						{levels.map((data, key) => (
							<LevelCard
								key={key}
								level={data.id}
								currentScore={data.current_score}
								parScore={data.par_score}
								linkedLevel={data.linked_level}
								description={data.desc}
								totalScore={data.total_score}
								questions={data.questions}
								moduleName={moduleName}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default LevelsPage;
