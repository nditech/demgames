import React, {Component} from 'react';
import API from '../utils/API';

export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.getInfo = this.getInfo.bind(this);
    }

    componentDidMount = () => {
        this.getInfo(this.props.match.params.id);
    }

    getInfo = (id) => {
        // let params = {_id: id};
        API.getOneQuestion(id)
        .then((res) => {
            console.log(res);
        });
    }

    render() {
        return (
            <div> This is the question page for question Id: {this.props.match.params.id} </div>
        )
    }
}