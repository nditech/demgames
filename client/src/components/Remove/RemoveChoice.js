import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';


class RemoveUser extends Component {  
    constructor(props){
        super(props);
        this.state={
            choices:[{
                id:"",
                questionid:"",
                choicestatement:"",
                choicedescription:"",
                weight:"",
                answer:0
            }],
            updatechoice:{
                id:"",
                questionid:"",
                choicestatement:"",
                choicedescription:"",
                weight:"",
                answer:0
            },
            choiceidI:null         
        }
        this.handleSearch=this.handleSearch.bind(this);
        this.pool=this.pool.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);      
    }

    componentDidMount() {
        this.pool();        
     }

    handleSearch(event){
        event.preventDefault();   
        console.log("The value being searched is :" + this.state.choiceidI);
        this.state.choices.map(
            (element) => {
                console.log("The value being searched is :" + this.state.choiceidI+" "+element.id);
                if(element.id===this.state.choiceidI) {
                           
                     this.setState(
                    {
                        updatechoice: element},
                             ()=>{
                                   console.log(this.state.updatechoice.id+"    "+this.state.choiceidI+"  "+element.id);                                   
                                 }
                    )                  
                }
                else
                 console.log("Value not found");
            }
        );
        console.log(this.state.updatechoice.id)  
    }

    pool(){
        fetch('/listchoices')
        .then((res) =>res.json())
        .then((data)=>{                        
               const Str2=JSON.stringify(JSON.parse(JSON.stringify(data)));
               const bObj2=JSON.parse(Str2);
               const newchoice=JSON.parse(JSON.stringify(bObj2)); 
               console.log(newchoice);                             
               this.setState(prevState=>({
                      choices:prevState.choices.concat(newchoice)
               }))
               console.log(JSON.stringify(JSON.parse(JSON.stringify(this.state.choices))));                 
        });        
        console.log(this.state.choices);
    }

    handleChange(event) { 
        event.preventDefault();
          
        switch(event.target.name){
            case "choiceid":
            {
                this.setState({
                    updatechoice:{
                        id:event.target.value
                    }},
                    ()=>{
                        console.log("value"+this.state.updatechoice.id)
                    }
                );
                break;
            }
            case "questionid":
            {   
                var questionid=event.target.value;    
                this.setState(prevState => ({
                    updatechoice:{
                        questionid:questionid,
                        id:prevState.updatechoice.id,
                        choicestatement:prevState.updatechoice.choicestatement,
                        choicedescription:prevState.updatechoice.choicedescription,
                        weight:prevState.updatechoice.weight,
                        answer:prevState.updatechoice.answer
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updatechoice)
                    }
                );
                break;
            }
            case "choicestatement":
            {   
                var choicestatement=event.target.value;    
                this.setState(prevState => ({
                    updatechoice:{
                        choicestatement:choicestatement,
                        id:prevState.updatechoice.id,
                        questionid:prevState.updatechoice.questionid,
                        choicedescription:prevState.updatechoice.choicedescription,
                        weight:prevState.updatechoice.weight,
                        answer:prevState.updatechoice.answer
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updatechoice)
                    }
                );
                break;
            }
            case "choicedescription":
            {   
                var choicedescription=event.target.value;    
                this.setState(prevState => ({
                    updatechoice:{
                        choicedescription:choicedescription,
                        id:prevState.updatechoice.id,
                        questionid:prevState.updatechoice.questionid,
                        choicestatement:prevState.updatechoice.choicestatement,
                        weight:prevState.updatechoice.weight,
                        answer:prevState.updatechoice.answer
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updatechoice)
                    }
                );
                break;
            }
            case "weight":
            {   
                var weight=event.target.value;    
                this.setState(prevState => ({
                    updatechoice:{
                        weight:weight,
                        choicedescription:choicedescription,
                        id:prevState.updatechoice.id,
                        questionid:prevState.updatechoice.questionid,
                        choicestatement:prevState.updatechoice.choicestatement,
                        choicedescription:prevState.updatechoice.choicedescription,
                        answer:prevState.updatechoice.answer
                    }}),
                    ()=>{
                         console.log("New Value :"+this.state.updatechoice)
                    }
                );
                break;
            }
            case "answer":
            {
                var answer=event.target.value;
                this.setState(prevState => ({
                    updatechoice:{
                        answer:answer,
                        choicedescription:choicedescription,
                        id:prevState.updatechoice.id,
                        questionid:prevState.updatechoice.questionid,
                        choicestatement:prevState.updatechoice.choicestatement,
                        choicedescription:prevState.updatechoice.choicedescription,
                        weight:prevState.updatechoice.weight
                    }}),
                    ()=>{
                         console.log("New Value :"+this.state.updatechoice)
                        }
                );
                break;                
            }           
            default:
            {
                console.log("Found it");
                break;
            }
        }             
   }
   handleClearForm(){
    this.setState={
        choices:[{
                id:"",
                questionid:"",
                choicestatement:"",
                choicedescription:"",
                weight:"",
                answer:0
        }],
        updatechoice:{
                id:"",
                questionid:"",
                choicestatement:"",
                choicedescription:"",
                weight:"",
                answer:0
        },
        choiceidI:null
   }
}

   handleChangeS(event) { 
    event.preventDefault();
    var valId=event.target.value;
    switch(event.target.name){
        case "choiceidI":
        {
            this.setState(
                {
                    choiceidI:valId
                },
                ()=>{
                    console.log("value"+this.state.choiceidI)
                }
            );
            break;
        }                
        default:
        {
                console.log("Found it");
        }
    }                   
   }


   handleSubmit(event) 
   {          
       event.preventDefault();
              
       const url ="/deletechoice";
       fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(this.state.updatechoice),
        mode:'cors'
      })
      .then((res) => res.json())      
      .then((data)=>{console.log(data)})
      .catch((error)=>console.log(error))     
      
    }
           
   render() {
     
      return (
            <div className="App">
            <div>
                <form className="playerForm" onSubmit={this.handleSubmit} >
                        <label>Search by Choices Id 
                            <input type="text" name="choiceidI" value={this.state.choiceidI||''} onChange={this.handleChangeS}/> <br/>
                        </label>
                        <label>Choice Id 
                            <input type="text" name="choiceid" readOnly value={this.state.updatechoice.id||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Question id
                            <input type="text" name="questionid" onKeyDown={this.handleKeyDown} value={this.state.updatechoice.questionid||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Choice statement
                            <input type="text" name="choicestatement" value={this.state.updatechoice.choicestatement||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Choice description
                            <input type="text" name="choicedescription" value={this.state.updatechoice.choicedescription||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Weight
                            <input type="text" name="weight" value={this.state.updatechoice.weight||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Answer 
                            <input type="text" name="answer" value={this.state.updatechoice.answer||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>
                        <button
                            className="btn btn-link float-left"
                            onClick={this.handleClearForm}>Clear
                        </button>
                        <input type="button" name="Delete" onClick={this.handleSearch} value="Search"/>                        
                        <button type="submit">Delete</button>                                        
                        </label>
                </form>
            </div>            
      </div>
    );
  }
}

export default RemoveUser;
