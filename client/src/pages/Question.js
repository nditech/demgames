import React, {Component} from 'react';
import API from '../utils/API';

export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {}
        };
        this.getInfo = this.getInfo.bind(this);
    }

    componentDidMount = () => {
        this.getInfo(this.props.match.params.id);
    }

    getInfo = (id) => {
        API.getOneQuestion(id)
        .then((res) => {
            const question = res.data;
            this.setState({question});
        });
    }

    render() {
        const q = this.state.question;
        return (
            <div>
                <p> This is the question page for question Id: {this.props.match.params.id}</p>
                <p>Question ID: {q._id}</p>
                <p>Type: {q.type}</p>
                <p>Language: {q.language}</p>
                <p>Question: {q.question}</p>
                <p>Right answer option: {parseInt(q.answer) + 1}</p>
                <p>Option 1: {q.option1}</p>
                <p>Option 2: {q.option2}</p>
                <p>Option 3: {q.option3}</p>
                <p>Option 4: {q.option4}</p>
            </div>
        )
    }
}