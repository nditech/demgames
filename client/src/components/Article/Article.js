import React from 'react';
import formatDate from '../../utils/formatDate';
import {ListItem} from '../List';

const Article = ({title, url, id, date, handleClick, buttonText, saved}) => (
    <ListItem>
        <h3>
        <p>{title}</p>{" "}
        <span className="btn-group float-right">
            <a className="btn btn-outline-success" href={url} rel="noopener noreferrer" target="_blank">
            View Article
            </a>
            <button onClick={() => handleClick(id)} className="btn btn-success">
            {buttonText}
            </button>
        </span>
        </h3>
        <p>
        Date {saved ? "Saved" : "Published"}: {formatDate(date)}
        </p>
    </ListItem>
)

export default Article;