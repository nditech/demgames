import React, { Component } from 'react';

import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Question Id',
        selector: 'questionid',
        sortable: true,
    },
    {
        name: 'Choice Statement',
        selector: 'choicestatement',
        sortable: true,
    },
    {
        name: 'Choice Description',
        selector: 'choicedescription',
        sortable: true,
    },
    {
        name: 'Weight',
        selector: 'weight',
        sortable: true,
    },
    {
        name: 'Answer',
        selector: 'answer',
        sortable: true,
    }
];

class ListChoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [{
            }]
        };
        this.simpleTable = this.simpleTable.bind(this);
    }

    pool() {
        const url = 'http://localhost:9000/listchoices';
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
                data.map(choice => choice.answer ===1? choice.answer = 'yes': choice.answer = 'no');
                this.setState({choices: data});
            })
            .catch(err => console.log(err));
        console.log(this.state.choices);
    }
    componentDidMount() {
        this.pool();
    }

    simpleTable() {

        return (
            <DataTable
                title="List of Choices"
                columns={columns}
                data={this.state.choices}
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

export default ListChoices;
