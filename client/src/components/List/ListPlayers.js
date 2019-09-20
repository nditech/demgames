import React, { Fragment, useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';

const ListPlayers = () =>  {

    const deleteClickHandle = (choiceId) => {
        console.log('choice id ------------> ', choiceId);
        if(window.confirm("Are you sure you want to delete the game")){
            console.log('question will be deleted');
        } else {
            console.log('will not be deleted');
        }

    }
    const editClickHandle = (choiceId) => {
        
    }

    const EditButton = (props) => (
        <button type="button" onClick={e=> editClickHandle(props.row.id)} data-id={props.row.id} data-question-id={props.row.questionid} data-row={JSON.stringify(props)} className="dt-btn btn btn-info mr-1">
            <i className="fa fa-edit"></i>
        </button>
    );

    const DeleteButton = (props) => (
        <button type="button" onClick={e=> deleteClickHandle(props.row.id)} data-id={props.row.id} data-question-id={props.row.questionid} className="dt-btn btn btn-danger">
            <i className="fa fa-trash"></i>
        </button>
    );

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
        },
        {
            name: 'Actions',
            button: true,
            cell: (row) => <Fragment><EditButton row={row} /> <DeleteButton row={row} /></Fragment>,
        }
    ];

    const [playersData, setPlayersData] = useState({ user: [{}] });

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

    useEffect(()=>{
        getPlayers();
    }, []);

    
    const simpleTable = () => {

        return (
            <DataTable
                title="List of Players"
                columns={columns}
                data={user}
                pagination
            />
        );
    }
    return (
        <div className="App">
            <div>{simpleTable()}</div>
        </div>
    );
}

export default ListPlayers;
