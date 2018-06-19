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
            questionId: '',
            answerId: '',
            selectedQ: '',
            selectedA: '',
            full: 0,
            complete: ''
        }
    }

    componentDidMount() {
        API.getQuesitons()
        .then(res => {
            const   questions = res.data,
                    full = questions.length
            this.setState({questions, full})
        })
    }

    componentDidUpdate() {
        // check remaining questions
        if (this.state.questions.length === 0) console.log('All done!') // ERR: wrong if half way through
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
                    full = this.state.full,
                    complete = ((full - questions.length) * 100 / full).toString()
            this.setState({questions, complete})
        }
    }

    render() {
        return (
            <Wrap>
                <Progress
                    level="level1"
                    title="Aliquam erat volutpat"
                    text="Curabitur cursus nisi a magna semper lobortis."
                    num={this.state.complete}
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