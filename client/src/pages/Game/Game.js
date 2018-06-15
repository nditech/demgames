import React, {Component} from 'react'
import {LevelCard, CardGroup} from '../../components/Card'
import {Row, Col, Wrap} from '../../components/Grid'

class Game extends Component {
    state = {
    }

    render() {
        return (
            <Wrap>
            <CardGroup>
                <LevelCard
                    level="level1"
                    bgcolour="blue"
                    href="/level1"
                    // img={level1}
                    // alt="level 1"
                    title="Aliquam erat volutpat"
                    text="Curabitur cursus nisi a magna semper lobortis."
                />
                <LevelCard
                    level="level2"
                    bgcolour="green"
                    href="/level2"
                    // img={level2}
                    // alt="level 2"
                    title="Proin eget rutrum odio"
                    text="Aenean justo neque, fringilla sit amet maximus nec."
                />
                <LevelCard
                    level="level3"
                    bgcolour="peach"
                    href="/level3"
                    // img={level3}
                    // alt="level 3"
                    title="Donec elementum quam sit"
                    text="Mauris sem nisi, dignissim a sem sit amet."
                />
            </CardGroup>
            </Wrap>
        )
    }
}

export default Game