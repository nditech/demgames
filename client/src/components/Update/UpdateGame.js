import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Auth from '../../Auth';
import { config } from "../../settings";

const auth0=new Auth();

class UpdateGame extends Component{
   constructor(props){
       super(props);
       this.state={
                game:{
                    id:'',
                    caption:"",
                    gamedescription:"",
                    gametype:""
                },
                search:{
                        id:''
                }
        };
       
       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.handleReset=this.handleReset.bind(this);
       this.handleSearch=this.handleSearch.bind(this);
       this.handleSearchChange=this.handleSearchChange.bind(this);
   }

   handleSearchChange(event){
        event.preventDefault();
    
        switch(event.target.name)
        {
            case "id":
                this.setState({
                        search:{
                                id:event.target.value
                        }
                    }
                    ,
                    ()=>{
                            console.log(this.state.search); 
                        }
                );
                break;
            default:
                break;
        }
    }

   handleReset(e){
    this.setState({
         search:{
                 id:''
             }
         },
         () => {
                     console.log(this.state.search) 
         }
    );
   }
   
   handleChange(e){
        e.preventDefault();
        const sc=e.target.value;
        
        switch(e.target.name)
        {
            case "caption":
                this.setState({
                    game:{
                        id:this.state.game.id,
                        caption:sc,
                        gamedescription:this.state.game.gamedescription,
                        gametype:this.state.game.gametype
                    }
                });
                break;
            case "gamedescription":
                this.setState({
                    game:{
                        id:this.state.game.id,
                        caption:this.state.game.caption,
                        gamedescription:sc,
                        gametype:this.state.game.gametype
                    }
                });
                break;
            case "gametype":
                this.setState({
                    game:{
                        id:this.state.game.id,
                        caption:this.state.game.caption,
                        gametype:sc,
                        gamedescription:this.state.game.gamedescription
                    }
                });
                break;
            default:
                break;
        }
   }

    handleSearch(){

        fetch(config.baseUrl + `/selectGameforDel`, {
        method: 'post',        
        headers: {
            authorization: "Bearer "+auth0.getAccessToken(),
            "Content-Type": "Application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(this.state.search)
    })
    .then((res) => res.json())      
    .then((data)=>{
            if(data.message==='Not found')
            {
                alert("Game with specified Id is not found");
            }
            else
            {
                console.log(data);   
                this.setState({              
                    game:{
                        id:data[0].id,
                        caption:data[0].caption,
                        gamedescription:data[0].gamedescription,
                        gametype:data[0].gametype
                    }
                });
            }       
    })
    .catch((error)=>console.log(error))
    }

   handleSubmit(e){
      e.preventDefault();                      
      const url =config.baseUrl + "/updategame";
      fetch(url, {
            method: 'POST',
            headers: {
                authorization: "Bearer "+auth0.getAccessToken(),
                "Content-Type": "Application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(this.state.game),
            mode:'cors'
      })
      .then((res) => res.json())      
      .then((data)=>{         
            console.log(data);
            if(data.message==='updated successfully')
            {
                alert("Successfully Updated the game detail");
            }
      })
      .catch((error)=>console.log(error))  
   }
   
   render(){        
        return (
            <div>              
                <form className="searchPlayer">
                    <label>Game id 
                        <input type="text" name="id" value={this.state.search.id} onChange={this.handleSearchChange}/> <br/>
                    </label>                                
                    <label> 
                        <input type="button" name="Search" onClick={this.handleSearch} value="Search"/>
                        <input type="button" name="reset" onClick={this.handleReset} value="Reset"/>                                                              
                    </label>
                </form>     
                <div>
                <form className="questionForm" onSubmit={this.handleSubmit}>        
                    <label>Game id
                        <input type="text" name="id" value={this.state.game.id} onChange={this.handleChange}/> <br/>
                    </label>
                    <label>Caption 
                        <input type="text" name="caption" value={this.state.game.caption}  onChange={this.handleChange}/> <br/>
                    </label>
                    <label>Game description 
                        <textarea type="text" name="gamedescription" value={this.state.game.gamedescription}  onChange={this.handleChange}> 
                        </textarea>
                        <br/>
                    </label> 
                    <button type="submit">Update game</button>                     
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
/*    player_given_name:state.authDetail.authDetail.player_given_name,
    player_family_name:state.authDetail.authDetail.player_given_name,
    player_picture:state.authDetail.authDetail.player_picture,
    player_email:state.authDetail.authDetail.player_email,
    player_username:state.authDetail.authDetail.player_username,
    player_gender:state.authDetail.authDetail.player_gender,
    player_dateOfBirth:state.authDetail.authDetail.player_dateOfBirth
//	gameData: state.gameData 
*/
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

UpdateGame.propTypes = {
//	getGameData: PropTypes.func,
//	getScores: PropTypes.func,
//	gameData: PropTypes.object,
	authDetail:PropTypes.object,
//	setAuth: PropTypes.func,
//	clearAuth: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGame);