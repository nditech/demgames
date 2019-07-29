import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import '../App.css';
import {connect} from 'react-redux';

class AddChoices extends Component {
    constructor(props){
        super(props);
        this.state={
                    choicestatement:'',
                    choicedescription:'',
                    weight:'',
                    isanswer:0,
                    questions:[{
                        id:0,
                        statement:''
                    }]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
    }
    componentDidMount()
    {
        fetch('/listquestions', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'          
            },
          })
          .then(res=>res.json())
          .then((data)=>{
                console.log('The '+ data+'  was successfully uploaded');
            })
          .catch((error)=>console.log(error)); 
    }

    handleChange(event) {   
        switch(event.target.name){
            case "questionId":
            {
                    this.setState({questionId: event.target.value});
                    break;
            }
            case "choicestatement":
            {
                    this.setState({choicestatement: event.target.value});
                    break;
            }
            case "choicedescription":
            {
                    this.setState({choicedescription: event.target.value});
                    break;
            }
            case "weight":
            {
                    this.setState({weight: event.target.value});
                    break;
            }
            case "answer":
            {
                    this.setState({answer: event.target.value});
                    break;
            }
            default:
            {
                    console.log("Game Response");
            }
        }        
        console.log(event.target.name);         
   }

   handleSubmit(event) 
   {
       event.preventDefault();
       console.log(JSON.stringify(this.state));
       
       //const url ='/registergame';
       fetch('/addchoice', {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify(this.state)
      })
      .then(res=>res.json())
      .then((data)=>{
         console.log('The '+ data+'  was successfully uploaded');
        })
      .catch((error)=>console.log(error));         
    }
           
render() {
      return (
      <div className="App">
            <div>
               <form className="questionForm" onSubmit={this.handleSubmit}>        
                        <label>Question ID 
                            <input type="text" name="questionId" value={this.state.questionId} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Choice statement 
                            <input type="text" name="choicestatement" value={this.state.choicestatement} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Choice description 
                            <textarea type="text" name="choicedescription" value={this.state.choicedescription} onChange={this.handleChange}> 
                            </textarea>
                            <br/>
                        </label>
                        <label>Weight
                            <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>is it answer
                            <input type="text" name="answer" value={this.state.answer} onChange={this.handleChange}/> <br/>
                        </label> 
                        <button type="submit">Save</button>
                                         
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

    AddChoices.propTypes = {
    //	getGameData: PropTypes.func,
    //	getScores: PropTypes.func,
    //	gameData: PropTypes.object,
        authDetail:PropTypes.object,
    //	setAuth: PropTypes.func,
    //	clearAuth: PropTypes.func
    };
export default connect(mapStateToProps, mapDispatchToProps) (AddChoices);