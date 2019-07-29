import React, { Component } from 'react';
import {Route, Nav, Link, BrowserRouter as Router} from "react-router-dom";
import list from '../../components/List/List';
import UpdatePlayer from '../../components/Update/UpdateProfile';
import Register from '../Add/Register';
import AddGame from '../Add/AddGame';
import AddChoices from '../Add/AddChoices';
import AddQuestion from '../Add/AddQuestion';
import ListQuestions from '../List/ListQuestions';
import ListChoices from '../List/ListChoices';
import ListGames from '../List/ListGames';

/*
import RemoveQuestion from './RemoveQuestion';
import UpdateQuestion from './UpdateQuestion.js';
import UpdateChoice from './UpdateChoice.js';

import RemoveUser from './RemoveUser';
import RemoveChoice from './RemoveChoice';
import Game from './Game';
import game from './Game';

import NotFound from './NotFound';
import { withRouter } from 'react-router-dom';
import UpdateGame from './UpdateGame';
*/

import Auth from '../../Auth';
//import notfound from './NotFound';
import Callback from '../../pages/LandingPage/callback';


const auth=  new Auth();

class Admin extends Component{
   constructor(props){
       super(props);
       this.state={
           score:0,
           email:this.props.email||null,
           id:null,
           given_name:this.props.given_name,
           family_name:this.props.family_name,
           picture:this.props.picture,
           gender:this.props.gender,
           total:0,
           program_rank:null,
           total_rank:null
       }

       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
   }
   
   componentDidMount(){
    if(this.props.email!==null)
    {
        const encodedValue = encodeURIComponent(this.state.email);               
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
                username:data[0].username,
                score:data[0].score,
                total:data[0].total,
                gender:data[0].gender,
                city:data[0].city,
                country:data[0].country,
                program:data[0].program,
                program_rank:data[0].program_rank,
                total_rank:data[0].total_rank,
                email:data[0].email
            });
        })
        .catch((error)=>console.log(error))   
    }
   }

   handleChange(e){
       e.preventDefault();
       const sc=e.target.value;
       this.setState({
           score:sc}
       );      
   }


   handleSubmit(e){
        e.preventDefault();
        
        this.setState({
            total:Number(this.state.score)+Number(this.state.total)}
        );
       
        const url ="http://localhost:9000/updateplayerscore";
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
            
            console.log(data)
        })
      .catch((error)=>console.log(error))  
   }
    render(){
  ;      
        return (
                <div> 
                   
                    <Router>
                       <div>
                        <div>
                            <Link to="/list">List players</Link> || 
                            <Link to="/listgames">List games</Link> || 
                            <Link to="/listquestions">List questions</Link> || 
                            <Link to="/listchoices">List choices</Link> || 
                            <Link to="/UpdatePlayer">Update player</Link> || 
                            <Link to="/registerplayer">Register new player</Link> || 
                            <Link to="/addgame">Add game</Link> ||
                            <Link to="/addchoices">Add choices</Link> || 
                            <Link to="/addquestion">Add question</Link> || 
                                               
                        </div>
                        <div>
                            <Route path="/list" component={list} />
                            <Route path="/UpdatePlayer" component={UpdatePlayer} />
                            <Route path="/registerplayer" component={Register} />
                            <Route path="/addgame" component={AddGame} />
                            <Route path="/addchoices" component={AddChoices} />
                            <Route path="/addquestion" component={AddQuestion} />
                            <Route path="/listquestions" component={ListQuestions} />  
                            <Route path="/listchoices" component={ListChoices} />
                            <Route path="/listgames" component={ListGames} />

                        </div>
                       </div>
                    </Router>   

                </div>
        )
    }
}

export default Admin;

/*

<Router>
                        <div>
                           <Link to="/Register">Register</Link> || <Link to="/List">List players</Link> || <Link to="/ListGames">List games</Link> || 
                           <Link to="/ListQuestions">List questions</Link> || <Link to="/ListChoices">List choices</Link> || <Link to="/UpdatePlayer">Update Player</Link> || <Link to="/updateGame">Update Game</Link>  
                           || <Link to="/UpdateQuestion">Update question</Link> || <Link to="/UpdateChoice">Update choice</Link> || <Link to="/AddGame">Add game</Link>
                            || <Link to="/AddQuestion">Add question</Link> || <Link to="/AddChoice">Add choice</Link> || <Link to="/RemoveUser">Remove player</Link>
                            || <Link to="/RemoveQuestion">Remove question</Link> || <Link to="/RemoveChoice">Remove choice</Link>           
                        </div>

                        <div>
                            <Route path="/Register" component={Register} />
                            <Route path="/List" component={List} />
                            <Route path="/ListGames" component={ListGames} />
                            <Route path="/ListQuestions" component={ListQuestions}/>
                            <Route path="/ListChoices" component={ListChoices}/>
                            <Route path="/UpdatePlayer" component={UpdatePlayer}/>
                            <Route path="/UpdateQuestion" component={UpdateQuestion}/>
                            <Route path="/UpdateChoice" component={UpdateChoice}/>
                            <Route path="/AddGame" component={AddGame}/>
                            <Route path="/AddQuestion" component={AddQuestion}/>
                            <Route path="/AddChoice" component={AddChoices}/>
                            <Route path="/RemoveUser" component={RemoveUser}/>
                            <Route path="/RemoveQuestion" component={RemoveQuestion}/>
                            <Route path="/RemoveChoice" component={RemoveChoice}/>
                            <Route path="/updateGame" component={UpdateGame}/>
                            

                        </div>
                        </Router>   


*/







