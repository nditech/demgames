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
        this.toggleColour = this.toggleColour.bind(this)
        this.checkQA = this.checkQA.bind(this)

        // TODO:
        // handle colour change for questions and answers click
        // handle logic to recognise correct question-answer
        // handle logic to recognise answered questions
        this.state = {
            questions: [],
            answered: [],
            active: true,
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
            this.setState({selectedQ: id})
        }
        else this.setState({selectedA: id})
    }

    toggleColour = id => {
        this.setState({clicked: !this.state.active})
    }

    checkQA() {
        if ((this.state.selectedQ !== '') && (this.state.selectedA !== '') && (this.state.selectedQ === this.state.selectedA)) {
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
                                                    active={this.state.active}
                                                    text={question.question}
                                                    handleClick={this.handleQAClick}
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
                                                    text={question.option1}
                                                    handleClick={this.handleQAClick}
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