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
import { Link } from 'react-router-dom';
import profile from '../../components/ProfileInfo';
import admin from '../../components/admin/admin';
import UpdatePlayer from '../../components/Update/UpdateProfile';
import { fetchScoreDetail } from '../../components/ProfileInfo/action';

const auth0=new Auth();

const authDetail={
					player_given_name:"",
					player_family_name:"",
					player_email:"",
					player_username:"",
					player_picture:"",
					player_gender:""
				};

const scoreDetail={
					current:0,
					score:0,
					play_id:'null',
					player_id:'null',
					game_id:null,
					program:null,
					total:0,
					program_rank:null,
					total_rank:null	
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

		// fetch('./moduleData.json')
                fetch(config.baseUrl + '/api/game',{
                    method: 'get',
                    headers: {
                            "authorization": "Bearer "+auth0.getAccessToken(),
                            "Content-Type":"Application/json",
                            "Accept":"application/json"
					}
				})
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
						
			authDetail.player_given_name=auth0.getProfile().given_name;
			authDetail.player_family_name=auth0.getProfile().family_name;
			authDetail.player_picture=auth0.getProfile().picture;
			authDetail.player_username=auth0.getProfile().nickname;
			authDetail.player_email=auth0.getProfile().email;
			authDetail.player_picture=auth0.getProfile().picture;
			authDetail.player_gender=auth0.getProfile().gender;
			console.log('auth details below: ----------------- ');
			console.log(auth0.getProfile());
			console.log(auth0.getProfile()['http://demozero.net/roles']);
			console.log(authDetail);
			console.log(auth0.getProfile());
			
			this.props.setAuth(authDetail);

		}
		else{
			this.props.clearAuth(authDetail);
		}

		if(auth0.isAuthenticated()===true){
			fetch('http://localhost:9000/selectPlayerProfile',{
				method: 'post',        
				headers: {
						"Content-Type": "Application/json",
						"Accept":"application/json"
				},
				body: JSON.stringify(auth0.getProfile())
			})
			.then(res=>res.json())
			.then((data)=>{					
				console.log(data);
				
				scoreDetail.current=data[0].current;
				scoreDetail.game_id=data[0].game_id;
				scoreDetail.play_id=data[0].id;
				scoreDetail.player_id=data[0].player_id;
				scoreDetail.score=data[0].score;
				scoreDetail.total=data[0].total;
				scoreDetail.total_rank=data[0].total_rank;
				scoreDetail.program=data[0].program;
				scoreDetail.program_rank=data[0].program_rank;
				console.log(scoreDetail);
				this.props.setScoreDetail(scoreDetail);
			})
			.catch((error)=>console.log(error));	
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
		console.log(this.props);
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
										<a href="/profile">Profile</a> || <Link to="/admin"> Admin Page </Link> || 
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
	console.log(scoreDetail);
	return {
		getGameData: (gameData) => dispatch(fetchGameData(gameData)),
		getScores: (scores) => dispatch(fetchScores(scores)),
		setAuth:(authDetail) => dispatch(fetchAuthDetails(authDetail)),
		clearAuth:(authDetail)=> dispatch(clearAuthDetails(authDetail)),
		setScoreDetail:(scoreDetail) => dispatch(fetchScoreDetail(scoreDetail))
	};
};

LandingPage.propTypes = {
	getGameData: PropTypes.func,
	getScores: PropTypes.func,
	gameData: PropTypes.object,
	authDetail:PropTypes.object,
	setAuth: PropTypes.func,
	clearAuth: PropTypes.func,
	scoreDetail: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);


