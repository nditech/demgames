import React, {Component} from 'react'
import './MatchItem.css'

export class MatchItem extends Component {
    render() {
        return (
            <div className={this.props.name === this.props.selectedQ ? "selected-question" : null || this.props.name === this.props.selectedA ? "selected-answer" : null || this.props.name === 'done' ? "done" : null} data-id={this.props.id} data-type={this.props.type} name={this.props.name} onClick={() => this.props.handleClick(this.props.type, this.props.id, this.props.name)}>
                {this.props.text}
            </div>
        )
    }
}