import React, { Component } from 'react';
//import '../App.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class AddGame extends Component {
  
    constructor(props){
        super(props);
        this.state={
                id:0,
                caption:"",
                gamedescription:"",
                gametype:""
        };
        this.initialState={
                id:0,
                caption:"",
                gamedescription:"",
                gametype:""
        }
        this.handleReset  = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
    }

    handleReset(event){
        event.preventDefault();
        this.setState(this.initialState);
    }

    handleChange(event) {   
        switch(event.target.name){
            case "caption":
            {
                    this.setState({caption: event.target.value});
                    break;
            }
            case "gamedescription":
            {
                    this.setState({gamedescription: event.target.value});
                    break;
            }
            case "gametype":
            {
                    
                    this.setState({gametype: event.target.value});
                    break;
            }
            default:
            {
                    console.log("Found it");
            }
        }
        if(event.target.value==='multiplechoice')
            this.setState({id:1});
        else if(event.target.value==='matching')
            this.setState({id:2});
        else if(event.target.value==='truefalse')
            this.setState({id:3});
        else if(event.target.value==='fillin')
            this.setState({id:4});
        else
            this.setState({id:0});

       // console.log(this.state.id);
   }

   handleSubmit(event) 
   {
       event.preventDefault();
       console.log(JSON.stringify(this.state));
       
       const url ='http://localhost:9000/registergame';
       fetch(url, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify(this.state)
      })
      .then(res=>res.json())
      .then((data)=>{
          alert(data.message);
        })
      .catch((error)=>console.log(error));         
    }
           
   render() {
      return (
      <div className="App">
            <div>
               <form className="playerForm" onSubmit={this.handleSubmit}>
                    
                        <label>Caption 
                            <input type="text" name="caption" value={this.state.caption} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Game Description 
                            <textarea type="text" name="gamedescription" value={this.state.gamedescription} onChange={this.handleChange}> 
                            </textarea>
                            <br/>
                        </label>

                        <label>Game type     
                            <select name="gametype" value={this.state.selectValue} onChange={this.handleChange} >
                                <option value="multiplechoice">Multiple choice</option>
                                <option value="matching">Matching</option>
                                <option value="truefalse">True or False</option>                      
                                <option value="fillin">Fill in</option>
                            </select>
                            <br/>
                        </label>                        
                        <button type="button" onClick={this.handleReset}>Reset</button> <button type="submit">Save</button>
                                         
                </form>
            </div>            
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    /*
        player_given_name:state.authDetail.authDetail.player_given_name,
        player_family_name:state.authDetail.authDetail.player_given_name,
        player_picture:state.authDetail.authDetail.player_picture,
        player_email:state.authDetail.authDetail.player_email,
        player_username:state.authDetail.authDetail.player_username,
        player_gender:state.authDetail.authDetail.player_gender,
        player_dateOfBirth:state.authDetail.authDetail.player_dateOfBirth
        gameData: state.gameData 
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
    
    AddGame.propTypes = {
    //	getGameData: PropTypes.func,
    //	getScores: PropTypes.func,
    //	gameData: PropTypes.object,
        authDetail:PropTypes.object,
    //	setAuth: PropTypes.func,
    //	clearAuth: PropTypes.func
    };

export default connect(mapStateToProps, mapDispatchToProps) (AddGame);