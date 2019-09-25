import React, { useEffect, useState } from 'react';
import ListTable from '../ListTable';
import Icon from "@material-ui/core/Icon";

const ListPlayers = () =>  {

    const columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: 'lastname',
            sortable: true,
        },
        {
            name: 'First Name',
            selector: 'firstname',
            sortable: true,
        },
        {
            name: 'Gender',
            selector: 'gender',
            sortable: true,
        },
        {
            name: 'Country',
            selector: 'country',
            sortable: true,
        },
        {
            name: 'Program',
            selector: 'program',
            sortable: true,
        }
    ];

    const [playersData, setPlayersData] = useState({ user: [{}] });
    const [cohort, setCohort] = useState(null);
    const [activeTab,setActiveTab]=useState(1);
    // const []

    const { user } = playersData;

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
                console.log('api data -->', JSON.stringify(data))
                setPlayersData({user: data});
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
    return (
            <>
            <div className="player-header">
                <div className="playerbox-wrapper">
                    <div className="playerbox">
                        <div className="playerbox-title">Total Number of Player</div>
                        <div className="playerbox-value">563</div>
                    </div>
                </div>
                <div className="graph"></div>
            </div>
            <div className="detail-box">
              <div className="tab-container">
                <div
                  className={`tab ${activeTab===1?"active":""}`}
                  onClick={() => setActiveTab(1)}
                >
                  All Players
                </div>
                <div
                  className={`tab ${activeTab===2?"active":""}`}
                  onClick={() =>
                    setActiveTab(2)
                  }
                >
                  Global Leadership
                </div>
                <div
                  className={`tab ${activeTab===3?"active":""}`}
                  onClick={() =>
                    setActiveTab(3)
                  }
                >
                  Cohort Leadership
                </div>
                <div className='tab-option'>
                  <Icon color="primary" style={{color:"#0d9eea"}}>add_box</Icon>
                  <span className="tab-icons-details">Add Player</span>
                </div>
                <div className="listing-players">
                   {activeTab===3&& <div className="cohort-dropdown">
                        <span className="cohort-dropdown-title">Choose Cohort</span>
                        <select className="cohort-dropdown-value">
                            {cohort.map(({id,name})=>
                                <option key={id} value={name}>{name}</option>
                            )}
                            
                        </select>
                    </div>}
                        <ListTable tableData={{
                        columns: columns,
                        confirmMsg: 'Are you sure you want to delete the player',
                        hasActionBtns: true,
                        data: user,
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
