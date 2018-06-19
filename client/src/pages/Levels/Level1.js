import React, { Component } from 'react'
import {Progress, MatchItem} from '../../components/Game'
import {Card} from '../../components/Card'
import {List, ListItem} from '../../components/List'
import {Row, Col, Wrap} from '../../components/Grid'
import API from '../../utils/API'

export class Level1 extends Component {
    constructor(props) {
        super(props)
        this.handleQAClick = this.handleQAClick.bind(this)
        this.checkQA = this.checkQA.bind(this)
        this.shuffleData = this.shuffleData.bind(this)
        this.state = {
            questions: [],
            answers: [],
            questionId: '',
            answerId: '',
            selectedQ: '',
            selectedA: '',
            full: 0,
            complete: ''
        }
    }

    // NOTE: works but questions and answers are in the same row
    shuffleData = data => {
        let i = data.length - 1
        while (i > 0) {
            const   j = Math.floor(Math.random() * (i + 1)),
                    temp = data[i]
            data[i] = data[j]
            data[j] = temp
            i--
        }
        return data
    }

    componentDidMount() {
        API.getQuesitons()
        .then(res => {
            const   questions = res.data,
                    full = questions.length
            this.setState({questions, full})
        })
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

    // check if a match
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
                                : ('No questions to display')                        
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
                                : ('No answers to display')                        
                            }
                        </Card>
                    </Col>
                </Row>
            </Wrap>
        )
    }
}