import React, { useEffect, useState } from 'react';
import ListTable from '../ListTable';

const ListQuestions = () => {

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

    return (
        <ListTable tableData={{
            columns: columns,
            title: 'List of Questions',
            confirmMsg: 'Are you sure you want to delete the question',
            hasActionBtns: true,
            data: questions,
            callbackAfterDelete: getQuestions
        }} />
    );

}

export default ListQuestions;
