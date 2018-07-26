import React, {Component} from 'react'
import {Wrap} from '../../components/Grid'
import {GameWrap} from '../../components/GameItem'
// import photo from '../../img/done.png'
// import API from '../../utils/API'

class Done extends Component {
    state = {
    }

    render() {
        return (
            <Wrap>
                <GameWrap backURL="/game">
                    <div className="row p-0 m-0 align-items-center done-page text-center">
                        <div className="col m-0 p-0">
                            <h3 className="m-0">CONGRATULATIONS!</h3>
                            <p><small>YOU'VE FINISHED THE GAME!</small></p>
                        </div>
                    </div>
                </GameWrap>
            </Wrap>
        )
    }
}

export default Done