import React, {Component} from 'react'
import {Wrap} from '../components/Grid'
import {GameWrap} from '../components/GameItem'
import cup from '../img/cup.png'
// import photo from '../../img/done.png'
// import API from '../../utils/API'

export class Done extends Component {
    state = {
    }

    render() {
        return (
            <Wrap>
                <GameWrap backURL="/game">
                    <div className="row p-0 m-0 align-items-center done-page text-center">
                        <div className="col m-0 p-0">
                            <h3 className="m-0">¡FELICIDADES!</h3>
                            <p><small>¡Has terminado el juego!</small></p>
                            <div className="done-cup"><img src={cup} alt="cup"/></div>
                        </div>
                    </div>
                </GameWrap>
            </Wrap>
        )
    }
}