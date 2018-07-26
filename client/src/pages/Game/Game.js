import React, {Component} from 'react'
import {ModuleCard} from '../../components/Card'
import {GameWrap} from '../../components/GameItem'
import {Wrap} from '../../components/Grid'
// import {BackBtn, InfoBtn} from '../../components/Button'

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
                        title="Diseñando un argumento"
                        colour="blue"
                    />
                    <ModuleCard
                        href="/game"
                        module="module2"
                        title="Encontrando evidencia"
                        colour="green"
                    />
                    <ModuleCard
                        href="/game"
                        module="module3"
                        title="Encontrando defectos en los argumentos"
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