import React, {Component} from 'react'
import {Card, CardGroup} from '../../components/Card'
import './Home.css'
import level1 from './level1.png'
import level2 from './level2.png'
import level3 from './level3.png'

class Home extends Component {
    state = {
    }

    render() {
        return (
            <CardGroup>
                <Card
                    img={level1}
                    alt="level 1"
                    title="LEVEL 1"
                />
                <Card
                    img={level2}
                    alt="level 2"
                    title="LEVEL 2"
                />
                <Card
                    img={level3}
                    alt="level 3"
                    title="LEVEL 3"
                />
            </CardGroup>
        )
    }
}

export default Home;