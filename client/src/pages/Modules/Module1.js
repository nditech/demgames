import React, {Component} from 'react'
import {LevelCard, CardGroup} from '../../components/Card'
import {Row, Col, Wrap} from '../../components/Grid'

export class Module1 extends Component {
    state = {
    }

    render() {
        return (
            <div className="module-page">
                <LevelCard
                    level="level1"
                    href="/level1"
                    title="LEVEL 1"
                    textBg="blue"
                />
                <LevelCard
                    level="level2"
                    href="/level2"
                    title="LEVEL 2"
                    textBg="green"
                />
                <LevelCard
                    level="level3"
                    href="/level3"
                    title="LEVEL 3"
                    textBg="peach"
                />
            </div>
        )
    }
}