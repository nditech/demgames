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
            answeredId: [],
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
        this.checkQA()
        if (this.state.questions.length === this.state.answered.length) console.log('All done!')
    }

    handleQAClick = (type, id) => {
        if (type === 'question') {
            const   questionId = id,
                    selectedQ = `q-${id}`
            this.setState({questionId, selectedQ})
        }
        else {
            const   answerId = id,
                    selectedA = `a-${id}`
            this.setState({answerId, selectedA})
        }
        const questions = this.state.questions.filter(q => !this.state.answeredId.includes(q._id))
        this.setState({questions})
    }

    checkQA() {
        if ((this.state.selectedQ !== '') && (this.state.selectedA !== '') && (this.state.questionId === this.state.answerId)) {
            console.log('Correct!!!')
            // push answered id to array
            this.state.answeredId.push(this.state.questionId)
            // push answered question to array
            const answered = this.state.questions.find(q => {return q._id === this.state.questionId})
            this.state.answered.push(answered)
        }
    }

    render() {
        return (
            <Wrap>
                <Progress
                    level="level1"
                    title="Aliquam erat volutpat"
                    text="Curabitur cursus nisi a magna semper lobortis."
                    num="15"
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
                                                    type="question"
                                                    name={`q-${question._id}`}
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
                            {this.state.answered.length 
                                ? (
                                    <List>
                                        {this.state.answered.map(question => (
                                            <ListItem key={`done-q-${question._id}`}>
                                                <MatchItem
                                                    id={question._id}
                                                    type="question"
                                                    name="done"
                                                    text={question.question}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )
                                : ('')                        
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
                                                    type="answer"
                                                    name={`a-${question._id}`}
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
                            {this.state.answered.length 
                                ? (
                                    <List>
                                        {this.state.answered.map(question => (
                                            <ListItem key={`done-a-${question._id}`}>
                                                <MatchItem
                                                    id={question._id}
                                                    type="answer"
                                                    name="done"
                                                    text={question.option1}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )
                                : ('')                        
                            }
                        </Card>
                    </Col>
                </Row>
            </Wrap>
        )
    }
}