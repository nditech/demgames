import React, {Component} from 'react'
import {BackBtn, InfoBtn} from '../Button'
import './GameItem.css'

export class GameWrap extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <div className="game-wrap">
                <div className="game-push">
                    {this.props.children}
                </div>
                <div className="game-footer">
                    <div className="game-footer-content">
                        <div className="ml-4 float-left">
                            <BackBtn backURL={this.props.backURL}/>
                        </div>
                        <div className="mr-4 float-right">
                            <InfoBtn/>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}