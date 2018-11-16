import React, {Component} from 'react';
import {Wrap} from '../components/Grid';
import {HelpModal} from '../components/Modal';
import { WithContext as ReactTags } from 'react-tag-input';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import API from '../utils/API';

import { Alert, 
    Button, 
    Card, CardText, CardBody, CardTitle, CardSubtitle, 
    Form, FormGroup, FormText, 
    Input, 
    Label, ListGroup, ListGroupItem, 
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: {
                addEvent: false,
                addQuestion: false,
                editQuestion: false,
                help: false
            },
            addQuestion: false,
            notice: '',
            noticeColour: '',
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
            searchDone: false, /* searchDone prevents componentDidUpdate infinitive loops */
            language: 'English',
            type: 'Matching',
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '1',
            event: {
                date: moment()
            }
        };
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleHelp = this.toggleHelp.bind(this);
        this.toggleAddQuestion = this.toggleAddQuestion.bind(this);
        this.toggleAddEvent = this.toggleAddEvent.bind(this);
        this.renderQuestionAnswer = this.renderQuestionAnswer.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.gotoQuestionPage = this.gotoQuestionPage.bind(this);
    }

    // Show questions when page loaded
    componentDidMount = () => {
        this.handleSearch(this.state.tags);
    }

    // Update questions whenever the tags are changed
    componentDidUpdate = () => {
        if (!this.state.searchDone) this.handleSearch(this.state.tags);
    }

    handleChangeDate = (date) => {
        this.setState({
            event: {date: date}
        });
    }

    // Search database for questions based on current tags
    handleSearch = (tags) => {
        let params = {};
        tags.map((t) => {
            const key = t.type;
            const value = t.id;
            params[key] = value;
        });

        API.getQuesitons(params)
        .then((res) => {
            const questions = res.data;
            const searchDone = true;
            this.setState({questions, searchDone});
        });
    }

    // Change notice based on conditions
    handleNotice = () => {

    }

    /**
     * FUNCTIONS FROM react-tag-input
     */
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

    /**
     * FUNCTIONS FOR INPUT
     */
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'select' ? target.selected : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    toggleHelp = () => {
        this.setState({
            show: {help: !this.state.show.help}
        });
    }

    toggleAddEvent = () => {
        this.setState({
            show: {addEvent: !this.state.show.addEvent}
        });
    }

    toggleAddQuestion = () => {
        this.setState({
            show: {addQuestion: !this.state.show.addQuestion}
        });
    }

    /**
     * FUNCTIONS FOR EVENTS
     */

    saveEvent = () => {
        const event = {
            name: '',
            date: '',
            address: '',
            city: '',
            region: '',
            country: ''
        }

        /**
         * TODO: API create event
         */
    }

    /**
     * FUNCTIONS FOR QUESTIONS
     */
    gotoQuestionPage = (id) => {
        let path = `/question/${id}`;
        this.props.history.push(path);
    }

    editQuestion = (id) => {
        this.gotoQuestionPage(id);
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
        };

        API.create(question)
        .then((res) => {
            if (res && (res.status === 200)) {
                const message = 'Your question has been saved successfully.';
                const colour = 'success';
                this.setState({
                    notice: message,
                    noticeColour: colour
                });
                this.handleSearch(this.state.tags);
            }
            else {
                const message = 'Error: Question was not saved. Please try again later.';
                const colour = 'danger';
                this.setState({
                    notice: message,
                    noticeColour: colour
                });
            }
            
            // Hide the message after 2 second(s)
            setTimeout((() => {
                this.setState({
                    notice: '',
                })
            }), 2000);
        });
    }
    
    /**
     * FUNCTIONS FOR RENDERING
     */

    /**
     * TODO: 
     * Save event to database.
     */
    renderAddEvent = () => {
        return (
            <Modal isOpen={this.state.show.addEvent} toggle={this.toggleAddEvent} className={this.props.className}>
                <ModalHeader toggle={this.toggleAddEvent}>Add Event</ModalHeader>
                <ModalBody>
                    {
                        this.state.notice !== ''
                        ? (<Alert color={this.state.noticeColour}>{this.state.notice}</Alert>)
                        : (null)
                    }
                
                    <Form>
                        <FormGroup>
                            <Label for="event-name">Name:</Label>
                            <Input type="text" name="eventName" id="event-name" placeholder="Event Name" 
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="event-date">Date:</Label>
                            <DatePicker
                                selected={this.state.event.date}
                                onChange={this.handleChangeDate}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="event-address">Address:</Label>
                            <Input type="text" name="eventAddress" id="event-address" placeholder="e.g. 123 First St" 
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="event-city">City/Town:</Label>
                            <Input type="text" name="eventCity" id="event-city" placeholder="City Name" 
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="event-region">Region/State/Province:</Label>
                            <Input type="text" name="eventRegion" id="event-region" placeholder="Province Name" 
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="event-country">Country:</Label>
                            <Input type="text" name="eventCountry" id="event-country" placeholder="Country Name" 
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <Button color="success" onClick={this.saveEvent}>Save</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleAddEvent}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderAddQuestion = () => {
        return (
            <Modal isOpen={this.state.show.addQuestion} toggle={this.toggleAddQuestion} className={this.props.className}>
                <ModalHeader toggle={this.toggleAddQuestion}>Add Question</ModalHeader>
                <ModalBody>
                    {
                        this.state.notice !== ''
                        ? (<Alert color={this.state.noticeColour}>{this.state.notice}</Alert>)
                        : (null)
                    }
                
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
                            {
                                this.state.type === 'Matching'
                                ? (null)
                                : (
                                    <div>
                                        <Input type="text" name="option2" id="option2" placeholder="Option 2" 
                                        onChange={this.handleInputChange}
                                        />
                                        <Input type="text" name="option3" id="option3" placeholder="Option 3" 
                                            onChange={this.handleInputChange}
                                        />
                                        <Input type="text" name="option4" id="option4" placeholder="Option 4" 
                                            onChange={this.handleInputChange}
                                        />
                                    </div>   
                                )
                            }
                        </FormGroup>
                        {
                            this.state.type === 'Matching'
                            ? (
                                <FormGroup>
                                    <Label for="rightAnswer">Right Answer:</Label>
                                    <Input type="select" name="answer" id="rightAnswer"
                                        value={this.state.answer}
                                        onChange={this.handleInputChange}
                                    >
                                        <option>1</option>
                                    </Input>
                                </FormGroup>
                            )
                            : (
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
                            )
                        }
                        <Button color="success" onClick={this.saveQuestion}>Save</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleAddQuestion}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderHelpModal = () => {
        return (
            <HelpModal
                open={this.state.show.help}
                toggle={this.toggleHelp}
                className={this.props.className}
            />
        );
    }

    /**
     * If question type is Matching, only render the answer.
     * If not: 
     * Render with answer position + 1 to avoid position 0 which can cause confusion.
     */
    renderQuestionAnswer = (q) => {
        if (q.type === 'Matching') {
            return (<div>Answer: {q.option1}</div>);
        }
        else {
            return (
                <div>
                    <div>Answer position: {parseInt(q.answer) + 1}</div>
                    <div>
                        <div>Option 1: {q.option1}</div>
                        <div>Option 2: {q.option2}</div>
                        <div>Option 3: {q.option3}</div>
                        <div>Option 4: {q.option4}</div>
                    </div>
                </div>
            );
        }
    }

    /**
     * Render page with:
     * ReactTags for search bar.
     * Conditions to show help modal, add question modal, add event modal.
     * All questions found.
     */
    render = () => {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <h3>Admin Page</h3>
                <ReactTags
                    placeholder={'Type to search, e.g. language'}
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    handleTagClick={this.handleTagClick}
                />
                <i className="material-icons" onClick={this.toggleHelp}>help</i>

                <div>
                    <i className="material-icons" onClick={this.toggleAddQuestion}>add_circle</i>
                    Add Question
                </div>
                <div>
                    <i className="material-icons" onClick={this.toggleAddEvent}>add_circle</i>
                    Add Event
                </div>

                {this.state.show.help? this.renderHelpModal() : null}
                {this.state.show.addQuestion? this.renderAddQuestion() : null}
                {this.state.show.addEvent? this.renderAddEvent() : null}
                
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