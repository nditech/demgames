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
            const selectedQ = `q-${id}`
            this.setState({selectedQ})
        }
        else {
            const selectedA = `a-${id}`
            this.setState({selectedA})
        }
    }

    // toggleColour = id => {
    //     this.setState({clicked: !this.state.active})
    // }

    checkQA() {
        if ((this.state.selectedQ !== '') && (this.state.selectedA !== '') && (this.state.selectedQ.substr(2) === this.state.selectedA.substr(2))) {
            console.log('Correct!!!')
            this.state.answered.push(this.state.selectedQ)
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
                                            <ListItem key={question._id}>
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
                        </Card>
                    </Col>
                    <Col size="6" custom="p-0">
                        <Card>
                            {this.state.questions.length 
                                ? (
                                    <List>
                                        {this.state.questions.map(question => (
                                            <ListItem key={question._id}>
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
                        </Card>
                    </Col>
                </Row>
            </Wrap>
        )
    }
}