import React, {Component} from 'react';
import {ModuleCard} from '../components/Card';
import {GameWrap} from '../components/GameItem';
import {Wrap} from '../components/Grid';
// import {BackBtn, InfoBtn} from '../../components/Button';
import data from '../data/game-data-es.json';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data
        };
    }

    render() {
        return (
            <Wrap>
                {this.state.data.length > 0
                    ? (
                        <GameWrap backURL="/">
                            <div className="game-page">
                                {
                                    this.state.data.map((m) => (
                                        <ModuleCard
                                            key={m.id}
                                            id={m.id}
                                            href={m.href}
                                            style={m.style}
                                            title={m.title}
                                            colour={m.colour}
                                        />
                                    ))
                                }
                            </div>
                        </GameWrap>
                    )
                    : (
                        <div>Error loading data.</div>
                    )
                }
            </Wrap>
        )
    }
}