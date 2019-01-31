import React from 'react';
import ndiLogoUrl from '../../images/ndiLogo.png';
import arrowBackUrl from '../../images/back.png';
import profileUrl from '../../images/profile.png';
import infoUrl from '../../images/info.png';
import LevelCard from '../../components/LevelCard';
import '../../commonStyles.scss';
import { connect } from 'react-redux';
import { config } from '../../settings';

import GameInfo from '../../components/GameInfo';
import { FETCH_LEVELS } from './constants';

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

	handleClick = () => {
		let data = { score: 10 };
		return fetch(config.baseUrl + '/api/module/1/level/1/update-score', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					console.log('success');
					this.setState({ currentScore: data.score });
				} else {
					console.log('fail');
				}
			})
			.catch((status, err) => {
				console.log(err);
			});
	};

	componentWillMount() {
		fetch(config.baseUrl + `/api/module/${this.props.match.params.moduleId}/levels`)
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					response.json().then((res) => {
						const levels = res.moduleLevels.filter((modules) => modules !== null);
						this.props.getLevels(levels[0]);
					});
				} else if (response.status === 404) {
					console.log('Not Found');
				}
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { open } = this.state;
		let levels = this.props.levelsData.levels;
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
					{/* <p className="game-title"> {moduleName}</p> */}
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
									// moduleName={moduleName}
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
	return { levelsData: state.levelsData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getLevels: (levels) => dispatch({ type: FETCH_LEVELS, val: levels })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);

// export default LevelsPage;
