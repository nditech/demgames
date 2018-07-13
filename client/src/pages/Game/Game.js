import React, {Component} from 'react'
import {ModuleCard, CardGroup} from '../../components/Card'
import {GameWrap} from '../../components/GameItem'
import {Row, Col, Wrap} from '../../components/Grid'
import {BackBtn, InfoBtn} from '../../components/Button'

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
                        colour="blue"
                    />
                    <ModuleCard
                        href="/module2"
                        module="module2"
                        title="Finding Evidence"
                        colour="green"
                    />
                    <ModuleCard
                        href="/module3"
                        module="module3"
                        title="Finding Flaws in Arguments"
                        colour="peach"
                    />
                </div>
            </GameWrap>

                {/* <div className="game-footer">
                    <div className="row m-0 p-0 game-footer-content">
                        <div className="col-6">
                            <div className="row justify-content-center">
                            <BackBtn backURL={this.props.backURL}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row justify-content-center">
                            <InfoBtn/>
                            </div>
                        </div>    
                    </div>
                </div> */}
            </Wrap>
        )
    }
}

export default Game