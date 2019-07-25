import React, { Component } from 'react';
import '../App.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class AddGame extends Component {
  
    constructor(props){
        super(props);
        this.state={
                id:"",
                caption:"",
                gamedescription:"",
                gametype:""
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
        console.log(event.target.name);
   }

   handleSubmit(event) 
   {
       event.preventDefault();

      // alert(this.state.firstName+this.state.middleName+this.state.lastName+this.state.userName+this.state.email+this.state.gender+this.state.dateOfBirth+this.state.country+this.state.city+this.state.program)
       console.log(JSON.stringify(this.state));
       
       const url ='http://localhost:3001/registergame';
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
          alert('The '+ data+'  was successfully uploaded');
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
                        <label>Description 
                            <input type="text" name="gamedescription" value={this.state.gamedescription} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Game type 
                            <input type="text" name="gametype" value={this.state.gametype} onChange={this.handleChange}/> <br/>
                        </label>
                        
                        <button type="button">Reset</button> <button type="submit">Save</button>
                                         
                </form>
            </div>            
      </div>
    );
  }
}

export default AddGame;