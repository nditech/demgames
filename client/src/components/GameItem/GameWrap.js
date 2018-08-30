import React, {Component} from 'react';
import {BackBtn, InfoBtn} from '../Button';
import {GameInfo} from '../GameItem';
import './GameItem.css';

export class GameWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false
        };
        this.infoClick = this.infoClick.bind(this);
    }

    infoClick() {
        this.setState(prevState => ({
            showInfo: !prevState.showInfo
        }));
    }

    render = () => {
        return (
            <div className="game-wrap">
                <div className="game-wrap-child">
                    {this.props.children}
                </div>
                {
                    this.state.showInfo
                    ? (<GameInfo/>)
                    : ("")
                }
                <div className="game-footer">
                    <div className="row m-0 p-0 game-footer-content">
                        <div className="col-6">
                            <div className="row justify-content-center">
                            <BackBtn backURL={this.props.backURL}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row justify-content-center">
                            <InfoBtn
                                handleClick={this.infoClick}
                            />
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}