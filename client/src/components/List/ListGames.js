import React, { Component } from 'react';

import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Caption',
        selector: 'caption',
        sortable: true,
    },
    {
        name: 'Description',
        selector: 'gamedescription',
        sortable: true,
    },
    {
        name: 'Type',
        selector: 'gametype',
        sortable: true,
    }
];

class ListGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [{
            }]
        };
        this.simpleTable = this.simpleTable.bind(this);
    }

    pool() {
        const url = 'http://localhost:9000/listgames';
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
                this.setState({games: data});
            })
            .catch(err => console.log(err));
        console.log(this.state.games);
    }
    componentDidMount() {
        this.pool();
    }

    simpleTable() {

        return (
            <DataTable
                title="List of Games"
                columns={columns}
                data={this.state.games}
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

export default ListGames;
