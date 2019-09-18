import React, { Component } from 'react';

import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Game Id',
        selector: 'game_id',
        sortable: true,
    },
    {
        name: 'Difficulty Level',
        selector: 'difficulty_level',
        sortable: true,
    },
    {
        name: 'Question',
        selector: 'question_statement',
        sortable: true,
    },
    {
        name: 'Weight',
        selector: 'weight',
        sortable: true,
    },
    {
        name: 'Explanation',
        selector: 'explanation',
        sortable: true,
    },
    {
        name: 'Is it Media',
        selector: 'isitmedia',
        sortable: true,
    }
];

class ListQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [{
            }]
        };
        this.simpleTable = this.simpleTable.bind(this);
    }

    pool() {
        const url = 'http://localhost:9000/listquestions';
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
                data.map(obj => (obj.isitmedia === 1? obj.isitmedia = 'yes': obj.isitmedia='no' ));
                this.setState({questions: data});
            })
            .catch(err => console.log(err));
        console.log(this.state.questions);
    }
    componentDidMount() {
        this.pool();
    }

    simpleTable() {

        return (
            <DataTable
                title="List of Questions"
                columns={columns}
                data={this.state.questions}
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

export default ListQuestions;
