import React, { useEffect, useState } from 'react';
import ListTable from '../ListTable';
import Icon from "@material-ui/core/Icon";
import Auth from '../../Auth';
const auth0=new Auth();

const ListPlayers = () =>  {

    const columns = [
        {
            name: 'Sl. No.',
            selector: 'sl',
            sortable: true,
        },
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'firstname',
            sortable: true,
        },
        {
            name: 'Country',
            selector: 'country',
            sortable: true,
        }
    ];

    const leadershipcolumns = [
        {
            name: 'Sl. No.',
            selector: 'sl',
            sortable: true,
        },
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Rank',
            selector: 'total_rank',
            sortable: true,
        },
        {
            name: 'Score',
            selector: 'score',
            sortable: true,
        }
    
    ];

    const [playersData, setPlayersData] = useState({ 
        user: [{}],
        globalleadership: [{}],
        cohortleadership: [{}],
        noOfPlayers: 0
    });
    const [cohort, setCohort] = useState(null);
    const [activeTab,setActiveTab]=useState(1);
    // const []

    const { user, globalleadership, cohortleadership, noOfPlayers } = playersData;

    const getPlayers = () => {
        // console.log(this.props.auth);
        const url = 'http://localhost:9000/users';
        fetch(url, {
            method: 'get',
            headers: {
                "authorization": "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "Application/json",
                "Accept": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                let numberOfPlayers = data.length;
                console.log('api data -->', JSON.stringify(data))
                data.map((item,index) => {
                    item.sl = index+1;
                });
                setPlayersData({...playersData, user: data, noOfPlayers:numberOfPlayers});
            })
            .catch(err => console.log(err));
        console.log(user);
    };
    const getCohort = () => {
        // console.log(this.props.auth);
        const url = 'http://localhost:9000/listCohort';
        fetch(url, {
            method: 'get',
            headers: {
                "authorization": "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "Application/json",
                "Accept": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('api data -->', JSON.stringify(data))
                setCohort(data);
            })
            .catch(err => console.log(err));
        
    };

    useEffect(()=>{
        getPlayers();
        getCohort();
    }, []);
    console.log(cohort,"suyash");
    const handleLeaderShip=(type, id)=>{
        let api;
        switch(type){
            case "all":
                api="http://localhost:9000/users";
                break;
            case "global":
                api="http://localhost:9000/list_leaderBoard";
                break;
            case "cohort":
                api=`http://localhost:9000/list_cohort_leaderBoard/${id? id:'1'}`;
                break;
            default:
                break;
        }
        fetch(api, {
            method: 'get',
            headers: {
                "authorization": "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "Application/json",
                "Accept": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('api data -->', data)
                
                if(type === "global"){
                    let objArray = [];
                    data.map((item, index) => {
                        let obj = {};
                        obj.sl = index+1;
                        obj.id = item.Player.id;
                        obj.name = item.Player.firstname;
                        obj.total_rank = item.total_rank;
                        obj.score = item.score;
                        objArray.push(obj);
                    });
                    setPlayersData({...playersData, globalleadership: objArray});
                }
                if(type === "cohort"){
                    let objArray = [];
                    data.map((item,index) => {
                        let obj = {};
                        obj.sl = index+1;
                        obj.id = item.Player.id;
                        obj.name = item.Player.firstname;
                        obj.total_rank = item.total_rank;
                        obj.score = item.score;
                        objArray.push(obj);
                    });
                    setPlayersData({...playersData, cohortleadership: objArray});
                }

                if(type === "all"){
                    data.map((item,index) => {
                        item.sl = index+1;
                    });
                    setPlayersData({...playersData, user: data});
                }

                console.log('playerrrrrr ---- ', playersData);
                
            })
            .catch(err => console.log(err));

    }
    return (
            <>
            <div className="player-header">
                <div className="playerbox-wrapper">
                    <div className="playerbox">
                        <div className="playerbox-title">Total Number of Players</div>
                        <div className="playerbox-value">{noOfPlayers}</div>
                    </div>
                </div>
                <div className="graph"></div>
            </div>
            <div className="detail-box">
              <div className="tab-container">
                <div
                  className={`tab ${activeTab===1?"active":""}`}
                  onClick={() => {setActiveTab(1);handleLeaderShip("all");}}
                >
                  All Players
                </div>
                <div
                  className={`tab ${activeTab===2?"active":""}`}
                  onClick={() =>
                    {setActiveTab(2);handleLeaderShip("global");}
                  }
                >
                  Global Leadership
                </div>
                <div
                  className={`tab ${activeTab===3?"active":""}`}
                  onClick={() =>
                    {setActiveTab(3);handleLeaderShip("cohort");}
                  }
                >
                  Cohort Leadership
                </div>
                {/* <div className='tab-option'>
                  <Icon color="primary" style={{color:"#0d9eea"}}>add_box</Icon>
                  <span className="tab-icons-details">Add Player</span>
                </div> */}
                <div className="listing-players">
                   {activeTab===3&& <div className="cohort-dropdown">
                        <span className="cohort-dropdown-title">Choose Cohort</span>
                        <select className="cohort-dropdown-value" onChange={e => handleLeaderShip('cohort',e.target.value)}>
                            {cohort.map(({id,name})=>
                                <option key={id} value={id}>{name}</option>
                            )}
                            
                        </select>
                    </div>}
                        <ListTable tableData={{
                        columns: activeTab===1? columns:(activeTab===2? leadershipcolumns:leadershipcolumns),
                        confirmMsg: 'Are you sure you want to delete the player',
                        hasActionBtns: false,
                        data: activeTab===1? user:(activeTab===2? globalleadership:cohortleadership),
                        callbackAfterDelete: getPlayers
                        }} 
                    />
                </div>
              </div>
                
            </div>
        </>

    );
}

export default ListPlayers;
