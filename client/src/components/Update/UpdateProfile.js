import React, {Component} from 'react';
import Auth from "../../Auth";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class UpdateProfile extends Component{
   constructor(props){
       super(props);
       this.state={
                current:0,
                score:0,
                play_id:null,
                player_id:null,
                game_id:null,
                email:this.props.player_email||null,
                player_id:null,
                given_name:this.props.player_given_name||null,
                middle_name:null,
                family_name:this.props.player_family_name||null,
                username:this.props.player_username||null,
                picture:this.props.picture||null,
                gender:this.props.player_gender||null,
                dateOfBirth:this.props.player_dateOfBirth||null,
                city:this.props.city||null,
                country:this.props.country||null,
                program:this.props.program||null,
                total:0,
                program_rank:null,
                total_rank:null
       }
       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.handleDate=this.handleDate.bind(this);
       this.res=this.res.bind(this);
   }
   
   componentDidMount(){
    if(this.props.email!==null)
    {                         
        fetch(`http://localhost:9000/selectPlayerProfile`, {
        method: 'post',        
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(this.state)
       })
       .then((res) => res.json())      
       .then((data)=>{
          console.log(data);
          this.setState({              
              play_id:data[0].play_id,
              player_id:data[0].player_id,
              game_id:data[0].game_id,
              given_name:data[0].firstname,              
              family_name:data[0].lastname,
              middle_name:data[0].middlename,
              username:data[0].username,
              score:data[0].score,
              total:data[0].total,
              gender:data[0].gender,
              dateOfBirth:data[0].dateOfBirth,
              city:data[0].city,
              country:data[0].country,
              program:data[0].program,
              program_rank:data[0].program_rank,
              total_rank:data[0].total_rank,
              email:data[0].email,
              playstartdate:data[0].playstartdate

          });
       })
       .catch((error)=>console.log(error))  
    }
   }

   handleDate(date) {
        //const d = moment(date).format("MM/DD/YYYY");
       
        this.setState({
                      dateOfBirth:date
                });
        // console.log(moment(this.state.dateOfBirth).format("MM/DD/YYYY"));
   }

   handleChange(e){
       e.preventDefault();
       const sc=e.target.value;
       
        switch(e.target.name)
        {
            case "given_name":
                this.setState({
                    given_name:sc
                })
                break;
            case "middle_name":
                this.setState({
                    middle_name:sc
                })
                break;
            case "family_name":
                this.setState({
                    family_name:sc
                })
                break;
            case "username":
                    this.setState({
                        username:sc
                    })
                    break;
            case "gender":
                    this.setState({
                        gender:sc
                    })
                    break;
            case "program":
                    this.setState({
                        program:sc
                    })
                    break;
            case "city":
                    this.setState({
                        city:sc
                    })
                    break;
            case "country":
                    this.setState({
                        country:sc
                    })
                    break;
            default:
                break;
        }
   }

   handleSubmit(e){
      e.preventDefault();                      
      const url ="http://localhost:9000/updateplayer";
      fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(this.state),
            mode:'cors'
      })
      .then((res) => res.json())      
      .then((data)=>{         
            console.log(data);
            if(data===200)
            {
                alert("Successful");
            }
      })
      .catch((error)=>console.log(error))  
   }
   
   res() {
        if(this.props.given_name!=='undefined')    
            return(this.props.given_name);
        else
            return ('');
   }
   render(){        
        return (
                <div>              
                    <form className="playerScore" onSubmit={this.handleSubmit}>                               
                        <h2>Hi {this.res()},  this is your profile Page  </h2>                                                               
                        <p> 
                            <li>User name is {this.state.username}.</li>
                            <li>First name is {this.state.given_name}.</li>
                            
                            <li>Family name is {this.state.family_name}.</li>
                            <li>Gender {this.state.gender}.</li>
                            <li>Current score is {this.state.current}.</li>
                            <li>Latest score is {this.state.score}.</li>
                            <li>Overall total is {this.state.total}</li>
                            <li>Rank among your program is {this.state.program_rank}</li>
                            <li>Rank among all participants is {this.state.total_rank}</li>
                        </p>
                        <label>Id 
                                <input type="text" name="player_id" value={this.state.player_id} onChange={this.handleChange}/> <br/>
                        </label>                                
                        <label>First name 
                                <input type="text" name="given_name" value={this.state.given_name} onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>Middle name 
                                <input type="text" name="middle_name" value={this.state.middle_name} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Family name 
                                <input type="text" name="family_name" value={this.state.family_name} onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>User name 
                                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>Gender 
                                <input type="text" name="gender" value={this.state.gender} onChange={this.handleChange}/> <br/>
                        </label>     
                        <label>Program 
                                <input type="text" name="program" value={this.state.program} onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>Date of Birth 
                                <DatePicker  name="dateOfBirth"  
                                             onChange={this.handleDate} 
                                             selected={this.state.dateOfBirth}  
                                             isClearable={true}  
                                             placeholderText={"MM/DD/YYYY"}
                                             dateFormat="MM/dd/yyyy"
                                /><br/>
                        </label>
                        <label>City 
                                <input type="text" name="city" value={this.state.city} onChange={this.handleChange}/> <br/>
                        </label>    
                        <label>Country 
                                <input type="text" name="country" value={this.state.country} onChange={this.handleChange}/> <br/>
                        </label>     
                        <label>email 
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/> <br/>
                        </label>           
                        <button type="submit">Update Profile</button>
                        <div>
                             <button >Log out</button>
                        </div>
                    </form>         
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    player_given_name:state.authDetail.authDetail.player_given_name,
    player_family_name:state.authDetail.authDetail.player_given_name,
    player_picture:state.authDetail.authDetail.player_picture,
    player_email:state.authDetail.authDetail.player_email,
    player_username:state.authDetail.authDetail.player_username,
    player_gender:state.authDetail.authDetail.player_gender,
    player_dateOfBirth:state.authDetail.authDetail.player_dateOfBirth
//	gameData: state.gameData 
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = (dispatch) => {
	return {
//		getGameData: (gameData) => dispatch(fetchGameData(gameData)),
//		getScores: (scores) => dispatch(fetchScores(scores)),
		setAuth:(authDetail) => dispatch(fetchAuthDetails(authDetail)),
		clearAuth:(authDetail)=> dispatch(clearAuthDetails(authDetail)),
	};
};

UpdateProfile.propTypes = {
//	getGameData: PropTypes.func,
//	getScores: PropTypes.func,
//	gameData: PropTypes.object,
	authDetail:PropTypes.object,
//	setAuth: PropTypes.func,
//	clearAuth: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);