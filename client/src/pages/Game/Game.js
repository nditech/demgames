import React, {Component} from 'react'
import {ModuleCard, CardGroup} from '../../components/Card'
import {GameWrap} from '../../components/Game'
import {Row, Col, Wrap} from '../../components/Grid'

class Game extends Component {
    state = {
    }

    render() {
        return (
            <Wrap>
            <GameWrap backURL="/">
                <div className="game-page">
                    <ModuleCard
                        href="/module1"
                        title="Designing an Argument"
                    />
                    <ModuleCard
                        href="/module2"
                        title="Finding Evidence"
                    />
                    <ModuleCard
                        href="/module3"
                        title="Finding Flaws in Arguments"
                    />
                </div>
            </GameWrap>
            </Wrap>
        )
    }
}

export default Game