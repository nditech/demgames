import React, {Component} from 'react';
import {Wrap} from '../components/Grid';
// import {Button, FormGroup, Label, Input} from 'reactstrap';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import API from '../utils/API';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { Button, 
    Card, CardText, CardBody, CardTitle, CardSubtitle, 
    Form, FormGroup, FormText, 
    Input, 
    Label, ListGroup, ListGroupItem, 
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addQuestion: false,
            questions: [],
            tags: [
                { id: "English", text: "Language: English", type: "language"  }
            ],
            suggestions: [
                { id: 'Guatemala', text: 'Location: Guatemala', type: "location" },
                { id: 'debate', text: 'Game: Debate', type: "game" },
                { id: 'Spanish', text: 'Language: Spanish', type: "language" },
                { id: 'English', text: 'Language: English', type: "language" }
            ],
            selectedOption: null,
            openHelp: false,
            searchDone: false, /**searchDone prevents componentDidUpdate infinitive loops */
            language: '',
            type: '',
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: ''
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openHelp = this.openHelp.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.renderQuestionAnswer = this.renderQuestionAnswer.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
    }

    componentDidMount = () => {
        this.handleSearch(this.state.tags);
    }

    componentDidUpdate = () => {
        if (!this.state.searchDone) this.handleSearch(this.state.tags);
    }

    /**
     * =========================== HANDLERS:
     */

    handleSearch = (tags) => {
        let params = {};
        tags.map((t) => {
            const key = t.type;
            const value = t.id.toLocaleLowerCase();
            params[key] = value;
        });

        API.getQuesitons(params)
        .then((res) => {
            const questions = res.data;
            const searchDone = true;
            this.setState({questions, searchDone});
        });
    }

    handleDelete = (i) => {
        const tags = this.state.tags.filter((tag, index) => index !== i);
        const searchDone = false;
        this.setState({tags, searchDone});
    }
 
    handleAddition = (tag) => {
        const tags = [...this.state.tags, tag];
        const searchDone = false;
        this.setState({tags, searchDone});
    }
 
    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'select' ? target.selected : target.value;
        const name = target.name;

        // console.log(name);
        // console.log(value);
    
        this.setState({
            [name]: value
        });
    }

    handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    openHelp = () => {
        this.setState({
            openHelp: !this.state.openHelp
        });
    }

    /**
     * =========================== QUESTIONS FUNCTIONS:
     */

    addQuestion = () => {
        this.setState({
            addQuestion: !this.state.addQuestion
        });
    }

    editQuestion = (id) => {
        console.log(`clicked question id: ${id}`);
        // TODO: send to page: id to edit OR expand div to edit
    }

    saveQuestion = () => {
        const question = {
            question: this.state.question,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            answer: this.state.answer,
            type: this.state.type,
            language: this.state.language
        }

        API.create(question)
        .then((res) => {
            console.log('this is the res');
            console.log(res);
        })
    }

    /**
     * =========================== RENDER FUNCTIONS
     */

    renderAddQuestion = () => {
        return (
            <Modal isOpen={this.state.addQuestion} toggle={this.addQuestion} className={this.props.className}>
                <ModalHeader toggle={this.addQuestion}>Add Question</ModalHeader>
                <ModalBody>
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
                            <Input type="text" name="question" id="question" placeholder="Question" 
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="option1" id="option1" placeholder="Option 1" 
                                onChange={this.handleInputChange}
                            />
                            <Input type="text" name="option2" id="option2" placeholder="Option 2" 
                                onChange={this.handleInputChange}
                            />
                            <Input type="text" name="option3" id="option3" placeholder="Option 3" 
                                onChange={this.handleInputChange}
                            />
                            <Input type="text" name="option4" id="option4" placeholder="Option 4" 
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rightAnswer">Right Answer:</Label>
                            <Input type="select" name="answer" id="rightAnswer"
                                value={this.state.answer}
                                onChange={this.handleInputChange}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Input>
                        </FormGroup>
                        <Button color="success" onClick={this.saveQuestion}>Save</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.addQuestion}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderModalHelp = () => {
        return (
            <Modal isOpen={this.state.openHelp} toggle={this.openHelp} className={this.props.className}>
                <ModalHeader toggle={this.openHelp}>Admin Help</ModalHeader>
                <ModalBody>
                    <p>Type in 'location', 'language' and or 'game' to search for questions.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.openHelp}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderQuestionAnswer = (q) => {
        if (q.type === 'match') {
            return (<div>Answer: {q.option1}</div>);
        }
        else {
            return (
                <div>
                    <div>Answer position: {q.answer}</div>
                    <div>
                        <div>Option(s):</div>
                        <div>{q.option1}</div>
                        <div>{q.option2}</div>
                        <div>{q.option3}</div>
                        <div>{q.option4}</div>
                    </div>
                </div>
            );
        }
    }

    render = () => {
        const { tags, suggestions } = this.state;
        return (
            <div>
                This is Admin Page
                <ReactTags
                    placeholder={'Type to search, e.g. language'}
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    handleTagClick={this.handleTagClick}
                />
                <i className="material-icons" onClick={this.openHelp}>help</i>

                <div>
                    <i className="material-icons" onClick={this.addQuestion}>add_circle</i>
                    Add Question
                </div>

                {this.state.openHelp? this.renderModalHelp() : null}
                {this.state.addQuestion? this.renderAddQuestion() : null}
                
                {
                    this.state.questions.length > 0
                    ? (
                        <ListGroup>
                            {this.state.questions.map(q => (
                                <ListGroupItem key={q._id} id={q._id}>
                                    <p>Question: {q.question}</p>
                                    {this.renderQuestionAnswer(q)}
                                    <div onClick={() => this.editQuestion(q._id)}>
                                    <i className="material-icons">edit</i>
                                    </div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )
                    : (<div>No question found.</div>)
                }
            </div>
        )
    }
}