import React, {Component} from 'react'
import {LevelCard, CardGroup} from '../../components/Card'
import {GameWrap, Progress, MatchItem} from '../../components/Game'
import {Row, Col, Wrap} from '../../components/Grid'

export class Module2 extends Component {
    render() {
        return (
            <GameWrap backURL="/game">
                <div className="text-center">
                    <h1>This is Module 2</h1>
                    <h1>🚧</h1>
                    <h1>Under construction</h1>
                    <h1>👷</h1>
                </div>
            </GameWrap>
        )
    }
}