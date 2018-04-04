import React from 'react';
import {ListItem} from '../List';

const Article = ({question, questionID, answer1, answer2, answer3}) => (
    <ListItem>
        <i className="material-icons">help</i>
        <p>Question {questionID}: {question}</p>
        <p><i className="material-icons">label_outline</i>A: {answer1}</p>
        <p><i className="material-icons">label_outline</i>B: {answer2}</p>
        <p><i className="material-icons">label_outline</i>C: {answer3}</p>
    </ListItem>
)

export default Article;