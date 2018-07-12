import React, {Component} from 'react'
import {ModuleCard, CardGroup} from '../../components/Card'
import {GameWrap} from '../../components/GameItem'
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
                        module="module1"
                        title="Designing an Argument"
                        textBg="blue"
                    />
                    <ModuleCard
                        href="/module2"
                        module="module2"
                        title="Finding Evidence"
                        textBg="green"
                    />
                    <ModuleCard
                        href="/module3"
                        module="module3"
                        title="Finding Flaws in Arguments"
                        textBg="peach"
                    />
                </div>
            </GameWrap>
            </Wrap>
        )
    }
}

export default Game