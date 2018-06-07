import React, { Component } from 'react'
import {Progress, MatchItem} from '../../components/Game'
import {Card} from '../../components/Card'
import {List, ListItem} from '../../components/List'

export class Level1 extends Component {
    render() {
        return (
            <div>
                <Progress
                    level="level1"
                    title="Aliquam erat volutpat"
                    text="Curabitur cursus nisi a magna semper lobortis."
                    num="15"
                />
                <div className="row my-3 mx-1">
                    <div className="col-6">
                        <Card>
                            <List>
                                <ListItem>
                                    <MatchItem id="1" type="term" text="This is 1st term"/>
                                </ListItem>
                                <ListItem>
                                    <MatchItem id="2" type="term" text="This is 2nd term"/>
                                </ListItem>
                                <ListItem>
                                    <MatchItem id="3" type="term" text="This is 3rd term"/>
                                </ListItem>
                            </List>
                        </Card>
                    </div>
                    <div className="col-6">
                        <Card>
                            <List>
                                <ListItem>
                                    <MatchItem id="2" type="definition" text="This is 2nd definition"/>
                                </ListItem>
                                <ListItem>
                                    <MatchItem id="3" type="definition" text="This is 3rd definition"/>
                                </ListItem>
                                <ListItem>
                                    <MatchItem id="1" type="definition" text="This is 1st definition"/>
                                </ListItem>
                            </List>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}