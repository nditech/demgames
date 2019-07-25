import React, { Component } from 'react';
import '../App.css';

class AddChoices extends Component {
    constructor(props){
        super(props);
        this.state={
                id:'',
                questionId:'',
                choicestatement:'',
                choicedescription:'',
                weight:'',
                answer:0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
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
                            <input type="text" name="choicedescription" value={this.state.choicedescription} onChange={this.handleChange}/> <br/>
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

export default AddChoices;