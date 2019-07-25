import React, { Component } from 'react';
import '../App.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class AddQuestion extends Component {
  
    constructor(props){
        super(props);
        this.state={
            id:"",
            gameid:"",
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
        switch(event.target.name){
            case "gameid":
            {
                    this.setState({gameid: event.target.value});
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
       
       //const url ='/registergame';
       fetch('/addquestion', {
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
                        <label>Game Id 
                            <input type="text" name="gameid" value={this.state.gameid} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Difficulty Level 
                            <input type="text" name="difficulty_level" value={this.state.difficulty_level} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Question Statement 
                            <input type="text" name="question_statement" value={this.state.question_statement} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Weight 
                            <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Explanation 
                            <input type="text" name="explanation" value={this.state.explanation} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>is it media 
                            <input type="text" name="isitmedia" value={this.state.isitmedia} onChange={this.handleChange}/> <br/>
                        </label>
                        <button type="button">Reset</button> <button type="submit">Save</button>                                   
                </form>
            </div>            
      </div>
    );
  }
}

export default AddQuestion;