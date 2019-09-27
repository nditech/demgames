import React, { Component, Fragment } from "react";
import { Gamebox } from "../Gamebox";
import { Details } from "../Details";
import ListQuestion from "../List/ListQuestions";
import "./styles.scss";
import Icon from "@material-ui/core/Icon";

class ListGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [{}],
      activeGameDetails:[],
      activeGame: null,
      activeTab: 1,
      loadQuestionsComponent: false
    };
    this.simpleTable = this.simpleTable.bind(this);
    this.handleGameBoxClick = this.handleGameBoxClick.bind(this);
  }

  pool() {
    const url = "http://localhost:9000/listgames";
    fetch(url, {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "Application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("api data -->", JSON.stringify(data));
        this.setState({
          games: data,
          activeGame: data[0].id,
          activeIndex:0,
          activeGameDetails: [
            { key: "Name", value: data[0].caption },
            { key: "Description", value: data[0].gamedescription },
            { key: "Game Type", value: data[0].gametype }
          ]
        });
      })
      .catch(err => console.log(err));
    console.log(this.state.games, this.state.activeGame, "fre");
  }
  componentDidMount() {
    this.pool();
  }
  // shouldComponentUpdate(nextProp,nextState){
  //   if(nextProp.editedDetals.caption===this.state.activeGameDetails[0].value && nextProp.editedDetals.gamedescription===this.state.activeGameDetails[1].value)
  //     return false;
  //   else{
  //     updateDetails(nextProp.editedDetals);
  //     return true;
  //   }
  // }
  
  shouldComponentUpdate(nextProp, nextState){
    // debugger;
    if(nextProp.editedDetals)
    {console.log(nextProp.editedDetals.caption!==this.state.activeGameDetails[0].value||nextProp.editedDetals.gamedescription!==this.state.activeGameDetails[1].value,"..............................");
    if(nextProp.editedDetals.caption!==nextState.activeGameDetails[0].value || nextProp.editedDetals.gamedescription!==nextState.activeGameDetails[1].value)
    {this.updateDetails(nextProp.editedDetals);}
    }
    return true;
      
  }
  copyGameCb=(id)=>{
    console.log(id);
    const url = 'http://localhost:9000/duplicatGame';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({game_id:id})
        })
            .then(res => res.json())
            .then((data) => {
              const a=[...this.state.games,data];
              console.log(a,"gaga");
                this.setState({games:a});
            })
            .catch((error) => console.log(error));
  }

  handleGameBoxClick = id => {
    this.setState({
      activeGameDetails: [
        { key: "Name", value: this.state.games[id].caption },
        { key: "Description", value: this.state.games[id].gamedescription },
        { key: "Game Type", value: this.state.games[id].gametype }
      ],
      activeGame: this.state.games[id].id,
      activeIndex:id
    });
  };
  updateDetails=(data)=>{
    debugger;
    this.setState({
      activeGameDetails: [
        { key: "Name", value: data.caption },
        { key: "Description", value: data.gamedescription },
        { key: "Game Type", value: this.state.activeGameDetails[2].value }
      ],
      games:[...this.state.games,this.state.games[this.state.activeIndex]=data]
    },()=>console.log(this.state.activeGameDetails,this.state.games,"..............................."));
  }

  simpleTable() {
    return (
      <Fragment>
        <Gamebox
          games={this.state.games}
          activeGame={this.state.activeGame}
          handleGameBoxClick={this.handleGameBoxClick}
        />
        <div className="detail-box">
          <div className="tab-container">
            <div
              className={`tab ${this.state.activeTab === 1 ? "active" : ""}`}
              onClick={() => this.setState({ activeTab: 1 })}
            >
              Game Details
            </div>
            <div
              className={`tab ${this.state.activeTab === 2 ? "active" : ""}`}
              onClick={() =>
                this.setState({ activeTab: 2, loadQuestionsComponent: true })
              }
            >
              Questions
            </div>
            {this.state.activeTab===1&&<div className='tab-option'>
              <Icon color="primary" className="tab-icons" onClick={()=>this.copyGameCb(this.state.activeGame)} style={{color:"#0d9eea",cursor:'pointer'}}>file_copy</Icon>
              <span className="tab-icons-details">Duplicate Game</span>
              <Icon color="primary" onClick={()=>this.props.editGame(this.state.activeGameDetails,this.state.activeGame)} style={{color:"#0d9eea",cursor:'pointer'}}>edit</Icon>
              <span className="tab-icons-details">Edit Game details</span>
            </div>}
          </div>
          {this.state.activeTab === 1 && (
           <Details data={this.state.activeGameDetails} />
          )}
          {this.state.activeTab === 2 && (
            <ListQuestion activeGameDetails={this.state.activeGameDetails} activeGame={this.state.activeGame} />
          )}
        </div>
      </Fragment>
    );
  }
  render() {
    return (
      <div className="App">
        <div>{this.simpleTable()}</div>
      </div>
    );
  }
}

export default ListGames;
