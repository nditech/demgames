import React, {Component} from 'react'
import {BackBtn, InfoBtn} from '../Button'
import './GameItem.css'

export class GameWrap extends Component {
    render = () => {
        return (
            <div className="game-wrap">
                <div className="game-wrap-child">
                    {this.props.children}
                </div>
                <div className="game-footer">
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
                </div>
            </div>
        )
    }
}