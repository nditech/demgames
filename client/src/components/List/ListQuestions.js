import React, { Fragment, useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';

const ListQuestions = () => {

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
        },
        {
            name: 'Actions',
            button: true,
            cell: (row) => <Fragment><EditButton row={row} /> <DeleteButton row={row} /></Fragment>,
        }
    ];

    const [questionsData, setQuestionsData] = useState({ questions: [{}] });
    const { questions } = questionsData;

    const getQuestions = () => {
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
                data.map(obj => (obj.isitmedia === 1 ? obj.isitmedia = 'yes' : obj.isitmedia = 'no'));
                setQuestionsData({ questions: data });
            })
            .catch(err => console.log(err));
        console.log(questions);
    }
    useEffect(() => {
        getQuestions();
    }, []);

    const simpleTable = () => {

        return (
            <DataTable
                title="List of Questions"
                columns={columns}
                data={questions}
                pagination
            />

        );
    }
    return (
        <div className="App">
            <div>
                {simpleTable()}
            </div>
        </div>
    );
}

export default ListQuestions;
