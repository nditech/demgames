import React, {Component} from 'react';
import API from '../utils/API';
import { Alert, Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, 
    ListGroup, ListGroupItem,
    Form, FormGroup, Label, Input, FormText 
    } from 'reactstrap';
import '../css/Question.css';

/**
 * TODO:
 * Group changing notice message and colour.
 * Style
 */
export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            noticeMessage: '',
            noticeColour: '',
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

    handleDeleteQuestion = () => {
        const id = this.state.data._id;
        API.delete(id)
        .then((res) => {
            if (res && (res.status === 200)) {
                const message = 'Your question has been deleted successfully.';
                const colour = 'warning';
                this.setState({
                    noticeMessage: message,
                    noticeColour: colour
                });
            }
            else {
                const message = 'Error: Question was not deleted. Please try again later.';
                const colour = 'danger';
                this.setState({
                    noticeMessage: message,
                    noticeColour: colour
                });
            }
            
            // Hide the message after 2 second(s)
            setTimeout((() => {
                this.setState({
                    noticeMessage: '',
                });
                this.props.history.push('/admin');
            }), 2000);
        });
    }

    handleSaveQuestion = () => {
        const question = {
            _id: this.state.data._id,
            question: this.state.question,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            answer: this.state.answer,
            type: this.state.type,
            language: this.state.language
        };

        API.update(question)
        .then((res) => {
            if (res && (res.status === 200)) {
                const message = 'Your question has been saved successfully.';
                const colour = 'success';
                this.setState({
                    noticeMessage: message,
                    noticeColour: colour
                });
            }
            else {
                const message = 'Error: Question was not saved. Please try again later.';
                const colour = 'danger';
                this.setState({
                    noticeMessage: message,
                    noticeColour: colour
                });
            }
            
            // Hide the message after 2 second(s)
            setTimeout((() => {
                this.setState({
                    noticeMessage: '',
                })
            }), 2000);
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
        });
    }

    toUpper = (str) => {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    /**
     * TODO: Save Changes or Cancel
     */
    render() {
        return (
            <div className="question-page">
                <h5>Edit Question ID: {this.state.data._id}</h5>
                {
                    this.state.noticeMessage !== ''
                    ? (<Alert color={this.state.noticeColour}>{this.state.noticeMessage}</Alert>)
                    : (null)
                }
                <Form>
                    <FormGroup>
                        <Label for="language">Language:</Label>
                        <p>{this.state.language}</p>
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
                        <p>{this.state.type}</p>
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
                            <textarea rows="5" name="option1" id="option1" value={this.state.option1} onChange={this.handleInputChange} />
                        </div>
                        {
                            this.state.type === 'Matching'
                            ? (null)
                            : (
                                <div>
                                    <Label for="option2">Option 2:</Label>
                                    <div>
                                        <textarea rows="5" name="option2" id="option2" value={this.state.option2} onChange={this.handleInputChange} />
                                    </div>
                                    <Label for="option3">Option 3:</Label>
                                    <div>
                                        <textarea rows="5" name="option3" id="option3" value={this.state.option3} onChange={this.handleInputChange} />
                                    </div>
                                    <Label for="option4">Option 4:</Label>
                                    <div>
                                        <textarea rows="5" name="option4" id="option4" value={this.state.option4} onChange={this.handleInputChange} />
                                    </div>
                                </div>   
                            )
                        }
                    </FormGroup>
                </Form>
                <Button color="success" onClick={this.handleSaveQuestion}>Save</Button>
                <a href="/admin"><Button color="warning">Cancel</Button></a>
                <Button color="danger" onClick={this.handleDeleteQuestion}>Delete</Button>
            </div>
        )
    }
}