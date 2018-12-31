import React, {Component} from 'react';
import moment from 'moment';
import {Input, ListGroup, ListGroupItem} from 'reactstrap';
// Custom components
import API from '../utils/API';
import {Wrap} from '../components/Grid';
import {EventModal, HelpModal, QuestionModal} from '../components/Modal';
import Dashboard from '../components/Dashboard';
import {AdminBtn} from '../components/Button';
import {QuestionItem} from '../components/AdminItem';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: {
                addEvent: false,
                addQuestion: false,
                editQuestion: false,
                help: false
            },
            notice: '',
            noticeColour: '',
            questions: [],
            questionShown: [],
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
            },
            search: ''
        };
        this.changeDate = this.changeDate.bind(this);
        this.toggleHelp = this.toggleHelp.bind(this);
        this.toggleAddQuestion = this.toggleAddQuestion.bind(this);
        this.toggleAddEvent = this.toggleAddEvent.bind(this);
        this.renderQuestionAnswer = this.renderQuestionAnswer.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.gotoQuestionPage = this.gotoQuestionPage.bind(this);
    }

    // Fetch questions from database
    componentDidMount = () => {
        this.fetchQuestions();
    }

    changeDate = (date) => {
        this.setState({
            event: {date: date}
        });
    }

    fetchQuestions = () => {
        API.getQuesitons()
        .then((res) => {
            // By default, all questions are shown
            const questions = res.data;
            const questionShown = questions;
            this.setState({questions, questionShown});
        });
    }

    filterQuestionsBy = (key, val) => {
        return this.state.questions.filter((q) => q[key] === val);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'select' ? target.selected : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // TODO: group 3 toggle modal functions into 1
    toggleHelp = () => {
        this.setState({
            showModal: {help: !this.state.showModal.help}
        });
    }

    toggleAddEvent = () => {
        this.setState({
            showModal: {addEvent: !this.state.showModal.addEvent}
        });
    }

    toggleAddQuestion = () => {
        this.setState({
            showModal: {addQuestion: !this.state.showModal.addQuestion}
        });
    }

    gotoQuestionPage = (id) => {
        let path = `/question/${id}`;
        this.props.history.push(path);
    }

    editQuestion = (id) => {
        this.gotoQuestionPage(id);
    }

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
                });
                // Update questions
                this.fetchQuestions();
            }), 2000);
        });
    }

    // TODO: group 3 show question functions into 1
    showAllQuestions = () => {
        this.setState({questionShown: this.state.questions});
    }

    // Change the shown questions to English only
    showEnglishQuestions = () => {
        const questionShown = this.filterQuestionsBy('language', 'English');
        this.setState({questionShown});
    }

    // Change the shown questions to Spanish only
    showSpanishQuestions = () => {
        const questionShown = this.filterQuestionsBy('language', 'Spanish');
        this.setState({questionShown});
    }

    renderEventModal = () => {
        return (
            <EventModal
                open={this.state.showModal.addEvent}
                toggle={this.toggleAddEvent}
                className={this.props.className}
                notice={this.state.notice}
                noticeColour={this.state.noticeColour}
                eventDate={this.state.event.date}
                changeDate={this.changeDate}
                saveEvent={this.saveEvent}
                handleInputChange={this.handleInputChange}
            />
        );
    }

    renderQuestionModal = () => {
        return (
            <QuestionModal
                open={this.state.showModal.addQuestion}
                toggle={this.toggleAddQuestion}
                className={this.props.className}
                noticeColour={this.state.noticeColour}
                notice={this.state.notice}
                questionLanguage={this.state.language}
                questionType={this.state.type}
                handleInputChange={this.handleInputChange}
                answer={this.state.answer}
                saveQuestion={this.saveQuestion}
            />
        );
    }

    renderAdminButtons = () => {
        const buttons = [
            {
                "id": "help-btn",
                "style": "info",
                "action": this.toggleHelp,
                "icon": "help",
                "text": "Help"
            },
            {
                "id": "add-question-btn",
                "style": "primary",
                "action": this.toggleAddQuestion,
                "icon": "add_circle",
                "text": "Add Question"
            },
            {
                "id": "add-event-btn",
                "style": "primary",
                "action": this.toggleAddEvent,
                "icon": "add_circle",
                "text": "Add Event"
            }
        ];

        return (
            <AdminBtn buttons={buttons}/>
        );
    }

    renderDashboard = () => {
        const allEn = this.filterQuestionsBy('language', 'English');
        const allEs = this.filterQuestionsBy('language', 'Spanish');
        const dashboard = [
            {
                "id": "total-questions",
                "text": "Total questions",
                "num": this.state.questions.length,
                "action": this.showAllQuestions
            },
            {
                "id": "en-questions",
                "text": "English questions",
                "num": allEn.length,
                "action": this.showEnglishQuestions
            },
            {
                "id": "es-questions",
                "text": "Spanish questions",
                "num": allEs.length,
                "action": this.showSpanishQuestions
            }
        ];

        return (
            <Dashboard obj={dashboard}/>
        );
    }

    renderHelpModal = () => {
        return (
            <HelpModal
                open={this.state.showModal.help}
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
            return (<div><b>Answer:</b> {q.option1}</div>);
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
     * Conditions to show help modal, add question modal, add event modal.
     * Filters for questions' text (question.question) and language (questionShown)
     */
    render = () => {
        return (
            <div>
                <h3>Admin Page</h3>
                {this.renderAdminButtons()}
                {this.renderDashboard()}
                <Input placeholder="Search" name="search" value={this.state.search} onChange={this.handleInputChange}/>
                {this.state.showModal.help? this.renderHelpModal() : null}
                {this.state.showModal.addQuestion? this.renderQuestionModal() : null}
                {this.state.showModal.addEvent? this.renderEventModal() : null}
                {this.state.questionShown.length > 0
                    ? (
                        <ListGroup>
                            {this.state.questionShown
                            .filter((question) => question.question.toLowerCase().includes(this.state.search))
                            .map(q => (
                                <ListGroupItem key={q._id} id={q._id}>
                                    <QuestionItem
                                        key={q._id} id={q._id}
                                        question={q}
                                        onClick={this.editQuestion}
                                    >
                                        {this.renderQuestionAnswer(q)}
                                    </QuestionItem>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )
                    : (<div>No question found.</div>)
                }
            </div>
        )
    }
};
