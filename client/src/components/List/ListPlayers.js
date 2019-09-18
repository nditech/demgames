import React, { Component } from 'react';

import DataTable from 'react-data-table-component';

import Auth from '../../Auth';

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
];

class ListPlayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [{
                
            }]
        };
        this.simpleTable = this.simpleTable.bind(this);
    }

    pool() {
        console.log(this.props.auth);
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
                this.setState({user: data});
            })
            .catch(err => console.log(err));
        console.log(this.state.user);
    }
    componentDidMount() {
        this.pool();
    }

    simpleTable() {

        return (
            <DataTable
                title="List of Players"
                columns={columns}
                data={this.state.user}
                pagination
            />
            
        );
    }
    render() {
        return (
            <div className="App">
                <div>

                    {this.simpleTable()}

                </div>
            </div>
        );
    }
}

export default ListPlayers;
