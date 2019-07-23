import React from 'react';
import NdiLogoUrl from '../../images/ndiLogo.png';
import infoUrl from '../../images/info.png';
import profileUrl from '../../images/profile.png';
import { ModuleCard } from '../../components/ModuleCard';
import '../../commonStyles.scss';
import './styles.scss';
import { config } from '../../settings';
import { connect } from 'react-redux';
import { fetchGameData, fetchScores,fetchAuthDetails, clearAuthDetails } from './actions';
import PropTypes from 'prop-types';
import GameInfo from '../../components/GameInfo';
import * as jwtDecode from 'jwt-decode';
import Auth from '../../Auth';
import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
import profile from '../../components/ProfileInfo';
import list from '../../components/List/List';
import admin from '../../components/admin/admin';

const auth0=new Auth();

const authDetail={
					player_given_name:"",
					player_family_name:"",
					player_email:"",
					player_username:"",
					player_picture:"",
					player_gender:""
				};

global.fetch = require('node-fetch');
class LandingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
		
		//this.handleLogIn=this.handleLogIn.bind(this);
	}

	//Fetch complete game data.
	componentWillMount() {

		fetch('./moduleData.json')
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
		
		//auth0.handleAuthentication();
		if(auth0.isAuthenticated()===true){
						
			authDetail.player_given_name=auth0.getProfile().given_name||'Berhanu';
			authDetail.player_picture=auth0.getProfile().picture||'Berhanu';
			authDetail.player_username=auth0.getProfile().nickname||'Berhanu';
			authDetail.player_email=auth0.getProfile().email||'Berhanu';
			authDetail.player_picture=auth0.getProfile().picture||'Berhanu';
			authDetail.player_gender=auth0.getProfile().gender||'Berhanu';
			console.log(authDetail);
			console.log(auth0.getProfile());
			this.props.setAuth(authDetail);
		}
		else{
			this.props.clearAuth(authDetail);
		}
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

	//handle Login in action
	handleLogIn = () => {

		if (!auth0.isAuthenticated())
		{
			auth0.login();
		}
	};

	//handle Logout in action
	handleLogOut = () => {

		if (auth0.isAuthenticated())
		{
				
			authDetail.player_given_name="";
			authDetail.player_family_name="";
			authDetail.player_email="";
			authDetail.player_username="";
			authDetail.player_picture="";
			authDetail.player_gender=""
			console.log(authDetail);
			this.props.clearAuth(authDetail);
			auth0.logout();
		}
	};


	render() {
		const gameData = this.props.gameData.gameData;
		const { open } = this.state;
		return (
			<div className="landing-page-wrapper">
				<div className="landing-page-container">
					<div className="header-icon">
						<img className="company-logo" src={NdiLogoUrl} alt="ndi-logo" /><p className="welcome" align="left">Welcome {this.props.player_given_name}</p>
						<div className="info-profile-icon-container">
							<img className="info-icon" src={infoUrl} alt="info-icon" onClick={this.handleClickOpen} />
							{
									!auth0.isAuthenticated()&&	
									<a onClick={this.handleLogIn}>									
										<img className="profile-icon" src={this.props.player_given_name||profileUrl} alt="Log out" />
									</a>
							}
							{
									auth0.isAuthenticated()&&
									<div>
										<a href="/profile">Profile</a> || 
										<a href="/admin">Admin Page</a> || 
										<a onClick={this.handleLogOut}>									
											<acronym title="Logout"> <img className="profile-icon" src={this.props.player_picture||profileUrl} alt="Log out" />
											</acronym>
										</a>
									</div>
									
							}
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


const mapStateToProps = (state) => ({
	player_given_name:state.authDetail.authDetail.player_given_name,
	player_picture:state.authDetail.authDetail.player_picture,
	gameData: state.gameData 
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = (dispatch) => {
	return {
		getGameData: (gameData) => dispatch(fetchGameData(gameData)),
		getScores: (scores) => dispatch(fetchScores(scores)),
		setAuth:(authDetail) => dispatch(fetchAuthDetails(authDetail)),
		clearAuth:(authDetail)=> dispatch(clearAuthDetails(authDetail)),
	};
};

LandingPage.propTypes = {
	getGameData: PropTypes.func,
	getScores: PropTypes.func,
	gameData: PropTypes.object,
	authDetail:PropTypes.object,
	setAuth: PropTypes.func,
	clearAuth: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

// export default LandingPage;
