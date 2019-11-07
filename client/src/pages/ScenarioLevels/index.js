import React from 'react';
import ndiLogoUrl from '../../images/ndiLogo.png';
import arrowBackUrl from '../../images/back.png';
import profileUrl from '../../images/profile.png';
import infoUrl from '../../images/info.png';
import LevelCard from '../../components/LevelCard';
import '../../commonStyles.scss';
import '../LevelsPage/styles.scss';
import { connect } from 'react-redux';
import GameInfo from '../../components/GameInfo';
import PropTypes, { element } from 'prop-types';
import Auth from '../../Auth';

const auth0=new Auth();

const authDetail=
		{
					player_given_name:"",
					player_family_name:"",
					player_email:"",
					player_username:"",
					player_picture:"",
					player_gender:""
		};
class ScenarioLevels extends React.Component{
    state={levels:0,game:{}};
    componentDidMount(){
        const url = `http://localhost:9000/level_by_game/${this.props.match.params.moduleId}`;
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: "Bearer "+auth0.getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({levels:data.length,game:data.game});
              console.log('level data',data);
            })
            .catch((error) => console.log(error));
    }
    getLevelComponents(){
        let elements=[];
        for(let x=0;x<this.state.levels;x++)
        {
            elements.push(<LevelCard
                key={x}
                level={x+1}
                moduleId={this.props.match.params.moduleId}
                showScore={false}
                // prevLevelScore={data.id > 1 ? scores[data.id - 2] : 0}
                // currentScore={scores[data.id - 1]}
                // parScore={parScores ? parScores[data.id - 1]: null}
                // linkedLevel={data.linked_level}
                // description={data.desc}
                // totalScore={data.total_score}
                // questions={data.questions}
                // moduleName={moduleName}
                moduleType="scenario"
                moduleColor="blue"
                // player_email={this.props.player_email == null ? "default":this.props.player_email }
            />);
        }
        return elements;
    }
    render(){
        return (
            <div className="landing-page-wrapper">
		    	<div className="landing-page-container">
		    		<div className="top-section">
		    			<div className="back-ndi-logo">
		    				<button className="back-button">
		    					<a href="/	">
		    						<img className="back-icon" src={arrowBackUrl} alt="back-arrow" />
		    					</a>
		    				</button>
		    				<a href="/">
		    					<img className="company-logo" src={ndiLogoUrl} alt="ndi-logo" />
		    				</a>
		    			</div>
		    			<div className="info-profile-icon-container">
		    				<img className="info-icon" src={infoUrl} alt="info-icon" onClick={this.handleClickOpen} />
		    					{
		    						!auth0.isAuthenticated()&&	
		    						<a onClick={this.handleLogIn}>									
		    							<img className="profile-icon" src={this.props.player_picture||profileUrl} alt="Log out" />
		    						</a>
		    					}
		    					{
		    						auth0.isAuthenticated()&&
		    						<a onClick={this.handleLogOut}>									
		    							<acronym title="Logout"> <img className="profile-icon" src={this.props.player_picture||profileUrl} alt="Log out" />
		    							</acronym>
		    						</a>
		    					}
		    			</div>
		    		</div>
		    		<p className="game-title"> {this.state.game.caption}</p>
		    		<div className="game-type-card-container">
		    			{/* {levels &&
		    				levels.length > 0 &&
		    				levels.map((data, key) => (
		    					<LevelCard
		    						key={key}
		    						level={data.id}
		    						moduleId={moduleId}
		    						prevLevelScore={data.id > 1 ? scores[data.id - 2] : 0}
		    						currentScore={scores[data.id - 1]}
		    						parScore={parScores ? parScores[data.id - 1]: null}
		    						linkedLevel={data.linked_level}
		    						description={data.desc}
		    						totalScore={data.total_score}
		    						questions={data.questions}
		    						moduleName={moduleName}
		    						moduleType={moduleType}
		    						moduleColor={moduleColor}
		    						player_email={this.props.player_email == null ? "default":this.props.player_email }
		    					/>
                            ))} */}
                            {this.getLevelComponents()}
		    		</div>
		    		
		    	</div>
		    </div>
        )   
    }
}

export default ScenarioLevels;