import React from 'react'
import {List, ListItem} from '../List'

export const MatchCard = ({text}) => (
    <div className="card">
        <List>
            <ListItem>
                {text}
            </ListItem>
            <ListItem>
                {text}
            </ListItem>
            <ListItem>
                {text}
            </ListItem>
        </List>
    </div>
)