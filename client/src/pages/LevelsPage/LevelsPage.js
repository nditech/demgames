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
import { FETCH_PAR_SCORES, FETCH_CURRENT_SCORES } from './constants';

class LevelsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false, parScores: [], currentScores: [] };
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	componentWillMount() {
		fetch(config.baseUrl + `/api/module/${this.props.match.params.moduleId}/levels`)
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					response.json().then((res) => {
						const { parScores, currentScores } = this.state;
						res.moduleLevels[this.props.match.params.moduleId - 1].map((level) => {
							parScores.push(level.par_score);
							currentScores.push(level.current_score);
						});

						// console.log(this.props.history);
						this.props.getParScores(parScores);
						this.props.getCurrentScores(currentScores);

						const levels = res.moduleLevels.filter((modules) => modules !== null);
						this.setState({ levels: levels[0] });
					});
				} else if (response.status === 404) {
					console.log('Not Found');
				}
			})
			.catch((err) => console.log(err));
	}
	render() {
		const moduleNames = this.props.moduleData.moduleNames;
		const { open, levels, currentScores } = this.state;
		console.log('current scores', this.props.levelsData.currentScores);
		// let levels = this.props.levelsData.levels;
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
	return { moduleData: state.moduleData, levelsData: state.levelsData, questionsData: state.questionsData };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getParScores: (parScores) => dispatch({ type: FETCH_PAR_SCORES, val: parScores }),
		getCurrentScores: (currentScores) => dispatch({ type: FETCH_CURRENT_SCORES, val: currentScores })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsPage);

// export default LevelsPage;
