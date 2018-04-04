import React from 'react';
import {ListItem} from '../List';

const Article = ({name}) => (
    <ListItem>
        <a href="/topic">{name}</a>
    </ListItem>
)

export default Article;