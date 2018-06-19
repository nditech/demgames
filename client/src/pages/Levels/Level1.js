import React, { Component } from 'react'
import {Progress, MatchItem} from '../../components/Game'
import {Card} from '../../components/Card'
import {List, ListItem} from '../../components/List'
import {Row, Col, Wrap} from '../../components/Grid'
import API from '../../utils/API'

export class Level1 extends Component {
    constructor(props) {
        super(props)
        // this.handleChange = this.handleChange.bind(this)
        this.handleQAClick = this.handleQAClick.bind(this)
        // this.toggleColour = this.toggleColour.bind(this)
        this.checkQA = this.checkQA.bind(this)

        // TODO:
        // handle colour change for questions and answers click
        // handle logic to recognise correct question-answer
        // handle logic to recognise answered questions
        this.state = {
            questions: [],
            answered: [],
            // answeredId: [],
            notice: '',
            questionId: '',
            answerId: '',
            selectedQ: '',
            selectedA: ''
        }
    }

    componentDidMount() {
        API.getQuesitons()
        .then(res => {
            const questions = res.data
            this.setState({questions})
        })
    }

    componentDidUpdate() {
        // check remaining questions
        if (this.state.questions.length === this.state.answered.length) console.log('All done!') // ERR: wrong if half way through
    }

    handleQAClick = (type, id) => {
        if (type === 'question') {
            const   questionId = id,
                    selectedQ = `q-${id}`
            this.checkQA(this.state.answerId, id)
            this.setState({questionId, selectedQ})
        }
        else {
            const   answerId = id,
                    selectedA = `a-${id}`
            this.checkQA(this.state.questionId, id)
            this.setState({answerId, selectedA})
        }
    }

    checkQA = (a, b) => {
        if ((a !== '') && (a === b)) {
            const   questions = this.state.questions.filter(q => q._id !== b),
                    notice = 'Well done! That is correct!'
                    
            this.setState({questions, notice})
        }
    }

    // checkQA() {
    //     if ((this.state.selectedQ !== '') && (this.state.selectedA !== '') && (this.state.questionId === this.state.answerId)) {
    //         console.log('Correct!!!')
    //         // push answered id to array
    //         this.state.answeredId.push(this.state.questionId)
    //         // push answered question to array
    //         const answered = this.state.questions.find(q => {return q._id === this.state.questionId})
    //         this.state.answered.push(answered)
    //         const questions = this.state.questions.filter(q => !this.state.answeredId.includes(q._id))
    //         this.setState({questions})
    //     }
    // }

    render() {
        return (
            <Wrap>
                <Progress
                    level="level1"
                    title="Aliquam erat volutpat"
                    text="Curabitur cursus nisi a magna semper lobortis."
                    num="15"
                    notice={this.state.notice}
                />
                <Row custom="my-3 mx-1">
                    <Col size="6" custom="p-0">
                        <Card>
                            {this.state.questions.length 
                                ? (
                                    <List>
                                        {this.state.questions.map(question => (
                                            <ListItem key={`q-${question._id}`}>
                                                <MatchItem
                                                    id={question._id}
                                                    name={`q-${question._id}`}
                                                    type="question"
                                                    text={question.question}
                                                    handleClick={this.handleQAClick}
                                                    selectedQ={this.state.selectedQ}
                                                    selectedA={this.state.selectedA}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )
                                : ('No questions found')                        
                            }
                        </Card>
                    </Col>
                    <Col size="6" custom="p-0">
                        <Card>
                            {this.state.questions.length 
                                ? (
                                    <List>
                                        {this.state.questions.map(question => (
                                            <ListItem key={`a-${question._id}`}>
                                                <MatchItem
                                                    id={question._id}
                                                    name={`a-${question._id}`}
                                                    type="answer"
                                                    text={question.option1}
                                                    handleClick={this.handleQAClick}
                                                    selectedQ={this.state.selectedQ}
                                                    selectedA={this.state.selectedA}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )
                                : ('No questions found')                        
                            }
                        </Card>
                    </Col>
                </Row>
            </Wrap>
        )
    }
}