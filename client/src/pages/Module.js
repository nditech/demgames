import React, {Component} from 'react'
import {LevelCard} from '../components/Card'
import {GameWrap} from '../components/GameItem'
import {Wrap} from '../components/Grid'

export class Module extends Component {
    state = {
    }

    render() {
        return (
            <Wrap>
            <GameWrap backURL="/game">
                <div className="module-page">
                    <LevelCard
                        level="level1"
                        href={`${this.props.match.url}/level/1`}
                        title="Nivel 1"
                        textBg="blue"
                    />
                    <LevelCard
                        level="level2"
                        href={`${this.props.match.url}/level/2`}
                        title="Nivel 2"
                        textBg="green"
                    />
                    <LevelCard
                        level="level3"
                        href={`${this.props.match.url}/level/3`}
                        title="Nivel 3"
                        textBg="peach"
                    />
                </div>
            </GameWrap>
            </Wrap>
        )
    }
}