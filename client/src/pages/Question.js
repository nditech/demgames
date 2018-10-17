import React, {Component} from 'react';
import API from '../utils/API';
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, 
    ListGroup, ListGroupItem,
    Form, FormGroup, Label, Input, FormText 
    } from 'reactstrap';
import '../css/Question.css';

export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            language: '',
            type: '',
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '1'
        };
        this.getInfo = this.getInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        this.getInfo(this.props.match.params.id);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'select' ? target.selected : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = (event) => {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    getInfo = (id) => {
        API.getOneQuestion(id)
        .then((res) => {
            const data = res.data;
            const language = data.language;
            const type = data.type;
            const question = data.question;
            const option1 = data.option1;
            const option2 = data.option2;
            const option3 = data.option3;
            const option4 = data.option4;
            this.setState({
                data, language, type, question, option1, option2, option3, option4
            });
            console.log(this.state.data);
        });
    }

    render() {
        return (
            <div className="question-page">
                <Form>
                    <FormGroup>
                        <Label for="language">Language:</Label>
                        <Input type="select" name="language" id="language"
                            value={this.state.language}
                            onChange={this.handleInputChange}
                        >
                            <option>English</option>
                            <option>Spanish</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="questionType">Type:</Label>
                        <Input type="select" name="type" id="questionType"
                            value={this.state.type}
                            onChange={this.handleInputChange}
                        >
                            <option>Matching</option>
                            <option>Multiple Choice</option>
                            <option>Scenario</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="question">Question:</Label>
                        <div>
                            <textarea name="question" id="question" value={this.state.question} onChange={this.handleInputChange} />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="option1">Option 1:</Label>
                        <div>
                            <textarea name="option1" id="option1" value={this.state.option1} onChange={this.handleInputChange} />
                        </div>
                        {
                            this.state.type === 'matching'
                            ? (null)
                            : (
                                <div>
                                    <Label for="option2">Option 2:</Label>
                                    <div>
                                        <textarea name="option2" id="option2" value={this.state.option2} onChange={this.handleInputChange} />
                                    </div>
                                    <Label for="option3">Option 3:</Label>
                                    <div>
                                        <textarea name="option3" id="option3" value={this.state.option3} onChange={this.handleInputChange} />
                                    </div>
                                    <Label for="option4">Option 4:</Label>
                                    <div>
                                        <textarea name="option4" id="option4" value={this.state.option4} onChange={this.handleInputChange} />
                                    </div>
                                </div>   
                            )
                        }
                    </FormGroup>
                </Form>
            </div>
        )
    }
}