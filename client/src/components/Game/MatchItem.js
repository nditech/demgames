import React, {Component} from 'react'

export class MatchItem extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.state = {
            
        }
    }

    handleClick = (e, id, type) => {
        console.log(type)
        console.log(id)
    }

    render() {
        return (
            <div data-id={this.props.id} data-type={this.props.type} onClick={e => this.handleClick(e, this.props.id, this.props.type)}>
                {this.props.text}
            </div>
        )
    }
}