import React, { useEffect, useState } from 'react';
import ListTable from '../ListTable';

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

    return (
        <ListTable tableData={{
            columns: columns,
            title: 'List of Players',
            confirmMsg: 'Are you sure you want to delete the player',
            hasActionBtns: true,
            data: user,
            callbackAfterDelete: getPlayers
        }} 
        />
    );
}

export default ListPlayers;
