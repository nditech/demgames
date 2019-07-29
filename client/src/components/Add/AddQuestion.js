import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AddQuestion extends Component {
  
    constructor(props){
        super(props);
        this.state={
                    gameid:1,
                    gametype:"multiplechoice",
                    difficulty_level:"",
                    question_statement:"",
                    weight:"",
                    explanation:"",
                    isitmedia:""
        };

        this.handleReset  = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
    }

    handleReset(event){
        console.log("Reset")
    }

    handleChange(event) {   
        
        event.preventDefault();
        
        //console.log(event.target.value);
        const val=event.target.value;

        switch(event.target.name){
        
            case "gametype":
            {
                    this.setState({gametype: val},
                        function(){
                                if(val==='multiplechoice')
                                    this.setState({gameid:1});
                                else if(val==='matching')
                                    this.setState({gameid:2});
                                else if(val==='truefalse')
                                    this.setState({gameid:3});
                                else if(val==='fillin')
                                    this.setState({gameid:4});
                                else
                                    this.setState({gameid:1});
                                
                                console.log(this.state.gameid);
                        });
                    break;
            }
            case "difficulty_level":
            {
                    this.setState({difficulty_level: event.target.value});
                    break;
            }
            case "question_statement":
            {
                    this.setState({question_statement: event.target.value});
                    break;
            }
            case "weight":
            {
                    this.setState({weight: event.target.value});
                    break;
            }
            case "explanation":
            {
                    this.setState({explanation:event.target.value});
                    break;
            }
            case "isitmedia":
            {
                    this.setState({isitmedia: event.target.value});
                    break;
            }
            default:
            {
                    console.log("Not Found it");
            }
        }
        console.log(event.target.name);
   }

   handleSubmit(event) 
   {
       event.preventDefault();
       console.log(JSON.stringify(this.state));
       
       fetch('http://localhost:9000/addquestion', {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify(this.state)
      })
      .then(res=>res.json())
      .then((data)=>{
              alert('The '+ data+'  was successfully uploaded');
      })
      .catch((error)=>console.log(error));         
    }
           
   render() {
      return (
      <div className="App">
            <div>
               <form className="playerForm" onSubmit={this.handleSubmit}>
                    <label>Game type     
                        <select name="gametype" value={this.state.selectValue} onChange={this.handleChange} >
                            <option defaultChecked value="multiplechoice">Multiple Choice</option>
                            <option value="matching">Matching</option>
                            <option value="truefalse">True or False</option>                      
                            <option value="fillin">Fill in</option>
                        </select>
                        <br/>
                    </label>
                    <label>Difficulty Level             
                        <select name="difficulty_level" value={this.state.selectValue} onChange={this.handleChange} >
                                <option value="1">Very simple</option>
                                <option value="2">Simple</option>
                                <option defaultChecked value="3">Normal/Regular</option>                      
                                <option value="4">Difficult</option>
                                <option value="5">Very difficult</option>
                            </select>
                            <br/>
                        </label>
                        <label>Question Statement 
                            <input type="text" name="question_statement" value={this.state.question_statement} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Weight 
                            <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Explanation 
                            <textarea type="text" name="explanation" value={this.state.explanation} onChange={this.handleChange}> 
                            </textarea>
                            <br/>
                        </label>
                        <label>is it media? 
                            <input type="text" name="isitmedia" value={this.state.isitmedia} onChange={this.handleChange}/> <br/>
                        </label>
                        <button type="button">Reset</button> <button type="submit">Save</button>                                   
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

AddQuestion.propTypes = {
//	getGameData: PropTypes.func,
//	getScores: PropTypes.func,
//	gameData: PropTypes.object,
    authDetail:PropTypes.object,
//	setAuth: PropTypes.func,
//	clearAuth: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);