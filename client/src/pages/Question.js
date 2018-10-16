import React, {Component} from 'react';
import API from '../utils/API';
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import '../css/Question.css';

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
            <div className="question-page">
                <Card>
                    <CardHeader>Question ID: {q._id}</CardHeader>
                    <CardBody>
                        <CardTitle>Question: {q.question}</CardTitle>
                        <div>Right answer option: {parseInt(q.answer) + 1}</div>
                        <ListGroup>
                            <ListGroupItem>Option 1: {q.option1}</ListGroupItem>
                            <ListGroupItem>Option 2: {q.option2}</ListGroupItem>
                            <ListGroupItem>Option 3: {q.option3}</ListGroupItem>
                            <ListGroupItem>Option 4: {q.option4}</ListGroupItem>
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                        <Button>Save</Button>
                        <Button>Delete</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}