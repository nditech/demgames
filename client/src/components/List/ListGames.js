import React, { Component, Fragment } from "react";
import { Gamebox } from "../Gamebox";
import { Details } from "../Details";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListQuestion from "../List/ListQuestions";
import "./styles.scss";
import DialogBox from "../DialogBox/DialogBox";
import Icon from "@material-ui/core/Icon";
import Auth from '../../Auth';
const auth0=new Auth();

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

  pool(fullUpdate) {
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
        if(fullUpdate)
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
        else{
          this.setState({
            games: data
          });
        }
      })
      .catch(err => console.log(err));
    console.log(this.state.games, this.state.activeGame, "fre");
  }
  componentDidMount() {
    this.pool(true);
  }
  shouldComponentUpdate(nextProp,nextState){
    console.log(nextProp,"----------------------------------------------");
    if(nextProp.gameAdded)
    {
      nextProp.handleGameStatus();
      this.pool(false);
    }
    return true;
  }
  
  // shouldComponentUpdate(nextProp, nextState){
  //   // debugger;
  //   if(nextProp.editedDetals)
  //   {console.log(nextProp.editedDetals.caption!==this.state.activeGameDetails[0].value||nextProp.editedDetals.gamedescription!==this.state.activeGameDetails[1].value,"..............................");
  //   if(nextProp.editedDetals.caption!==nextState.activeGameDetails[0].value || nextProp.editedDetals.gamedescription!==nextState.activeGameDetails[1].value)
  //   {this.updateDetails(nextProp.editedDetals);}
  //   }
  //   return true;
      
  // }
  copyGameCb=(id)=>{
    console.log(id);
    const url = 'http://localhost:9000/duplicatGame';
        fetch(url, {
            method: 'POST',
            headers: {
              authorization: "Bearer "+auth0.getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({game_id:id})
        })
            .then(res => res.json())
            .then((data) => {
              const a=[...this.state.games,data];
                this.setState({games:a});
                toast.info("Done...", {
                  position: toast.POSITION.TOP_CENTER
                });
            })
            .catch((error) => toast.error("Sorry...some technical issue", {
              position: toast.POSITION.TOP_CENTER
            }));
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
          activeGameDetails: [
            { key: "Name", value: data[this.state.activeIndex].caption },
            { key: "Description", value: data[this.state.activeIndex].gamedescription },
            { key: "Game Type", value: data[this.state.activeIndex].gametype }
          ]
        });
      })
      .catch(err => console.log(err));
    // this.setState({
    //   activeGameDetails: [
    //     { key: "Name", value: data.caption },
    //     { key: "Description", value: data.gamedescription },
    //     { key: "Game Type", value: this.state.activeGameDetails[2].value }
    //   ],
    //   games:[...this.state.games,this.state.games[this.state.activeIndex]=data]
    // });
  }

  // updateDetails=(data)=>{
  //   debugger;
  //   this.setState({
  //     activeGameDetails: [
  //       { key: "Name", value: data.caption },
  //       { key: "Description", value: data.gamedescription },
  //       { key: "Game Type", value: this.state.activeGameDetails[2].value }
  //     ],
  //     games:[...this.state.games,this.state.games[this.state.activeIndex]=data]
  //   },()=>console.log(this.state.activeGameDetails,this.state.games,"..............................."));
  // }
  onCancel = () => {
    this.setState({ showMessage: false });
  };
  editGame=(game,id)=>{
    console.log(game,id);
    const data ={
      id,
      values:[
      {
        key:"Title",
        type: "text",
        title: "Title",
        value: game[0].value,
        editable:true
      },
      {
        key:"Description",
        type: "text",
        title: "Description",
        value: game[1].value,
        multiline: true,
        editable: true
      },
    ]};
    this.setState({ data,
      // showMessage:true,
      confirmButtonValue:"UPDATE",
      messageTitle:"",
      messageDescription: "",
      onConfirm: this.editGameCb,
      isConfirmation: true,
      title: "EDIT GAME",
      messageBox: false,
      edit: true,
      create: false,
      onDelete: null,
      removeMessage: false},()=>{
        this.setState({
          // activeGameTab:tab
          showMessage: true
        });
    });
  }
  editGameCb = (data,id) => {
    const editGameForm={id,caption:data.Title,gamedescription:data.Description};
    console.log(editGameForm);
    console.log("game edited. ",data);
    const url = 'http://localhost:9000/Updategame';
        fetch(url, {
            method: 'POST',
            headers: {
                authorization: "Bearer "+auth0.getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editGameForm)
        })
            .then(res => res.json())
            .then((data) => {
              this.setState({showMessage:false});
              this.updateDetails(editGameForm);
              toast.info("Successfully Updated !", {
                position: toast.POSITION.TOP_CENTER
              });
              // editGameForm=null;
            })
            .catch((error) => toast.info("Sorry...some technical issue", {
              position: toast.POSITION.TOP_CENTER
            }));
  };
  removePopup = (id) => {
    this.setState({
      showMessage: true,
      confirmButtonValue: "Remove",
      messageTitle: "",
      messageDescription:
        "Are you sure you want to delete this Game?",
      onConfirm: ()=>this.deleteGame(id),
      isConfirmation: true,
      title: "Remove Game",
      messageBox: true,
      edit: false,
      create: false,
      onDelete: null,
      removeMessage: false,
      isRemove: true
    });
  };
  deleteGame=(id)=>{
    console.log(id);
    const deleteGameForm={game_id:id};
    console.log(deleteGameForm);
    // console.log("game edited. ",data);
    const url = 'http://localhost:9000/DeleteGame';
        fetch(url, {
            method: 'POST',
            headers: {
                authorization: "Bearer "+auth0.getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteGameForm)
        })
            .then(res => res.json())
            .then((data) => {
              this.setState({showMessage:false});
              this.pool(true);
              toast.info("Deleted Successfully !", {
                position: toast.POSITION.TOP_CENTER
              });
            })
            .catch((error) => toast.error("Sorry...some technical issue", {
              position: toast.POSITION.TOP_CENTER
            }));
  }

  simpleTable() {
    const {
      showMessage,
      confirmButtonValue,
      messageTitle,
      messageDescription,
      onConfirm,
      isConfirmation,
      title,
      data,
      messageBox,
      edit,
      create,
      fields,
      onDelete,
      removeMessage,
      isRemove
    } = this.state;
    return (
      <Fragment>
        <DialogBox
            confirmButtonValue={confirmButtonValue}
            showMessage={showMessage}
            messageTitle={messageTitle}
            messageDescription={messageDescription}
            onConfirm={onConfirm}
            isConfirmation={isConfirmation}
            onCancel={this.onCancel}
            title={title}
            data={create ? fields : data}
            messageBox={messageBox}
            edit={edit}
            create={create}
            onDelete={onDelete}
            removeMessage={removeMessage}
            isRemove={isRemove}
          />
        <Gamebox
          games={this.state.games}
          activeGame={this.state.activeGame}
          handleGameBoxClick={this.handleGameBoxClick}
          deleteGame={this.removePopup}
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
            {this.state.activeTab===1&&this.state.games[this.state.activeIndex]&&this.state.games[this.state.activeIndex].gametype!=="scenario"&&<div className='tab-option'>
              <Icon color="primary" className="tab-icons" onClick={()=>this.copyGameCb(this.state.activeGame)} style={{color:"#0d9eea",cursor:'pointer'}}>file_copy</Icon>
              <span className="tab-icons-details">Duplicate Game</span>
              <Icon color="primary" onClick={()=>this.editGame(this.state.activeGameDetails,this.state.activeGame)} style={{color:"#0d9eea",cursor:'pointer'}}>edit</Icon>
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
