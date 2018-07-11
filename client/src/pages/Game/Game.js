import React, {Component} from 'react'
import {ModuleCard, CardGroup} from '../../components/Card'
import {Row, Col, Wrap} from '../../components/Grid'

class Game extends Component {
    state = {
    }

    render() {
        return (
            <div>
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
        )
    }
}

export default Game