import React, { Component } from 'react'
import {Progress} from '../../components/Game'
import {MatchCard} from '../../components/Card'

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
                        <MatchCard
                            text="This is a term"
                        />
                    </div>
                    <div className="col-6">
                        <MatchCard
                            text="This is a definition"
                        />
                    </div>
                </div>
            </div>
        )
    }
}