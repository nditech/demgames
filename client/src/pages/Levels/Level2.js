import React, { Component } from 'react'
import {GameWrap, Progress, MatchItem} from '../../components/GameItem'
import {Card} from '../../components/Card';
import Footer from '../../components/Footer';
import API from '../../utils/API';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';

export class Level2 extends Component {
    render() {
        return (
            <GameWrap backURL="/module1">
                <div className="text-center">
                    <h1>This is level 2</h1>
                    <h1>🚧</h1>
                    <h1>Under construction</h1>
                    <h1>👷</h1>
                </div>
            </GameWrap>
        )
    }
}