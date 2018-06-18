import React, {Component} from 'react'

export class MatchItem extends Component {
    render() {
        return (
            <div className={`match-item${this.props.active ? "-active" : ""}`} data-id={this.props.id} data-type={this.props.type} onClick={() => this.props.handleClick(this.props.type, this.props.id)}>
                {this.props.text}
            </div>
        )
    }
}