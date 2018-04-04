import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import Card from '../../components/Card';
import Question from '../../components/Question';
import Footer from '../../components/Footer';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';
import data from './questions.json';

class Saved extends Component {
    state = {
        articles: data.questions
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="text-center">
                        <strong>Hello John!</strong>
                    </h1>
                    <h2 className="text-center">
                        0% completed
                    </h2>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col size="md-12">
                            <Card title="Topic: Phasellus id augue eu elit placerat viverra." icon="assignment">
                                <List>
                                    {this.state.articles.map(article => (
                                        <Question
                                            key={article.id}
                                            id={article.id}
                                            question={article.question}
                                            questionID={article.id}
                                            answer1={article.answer1}
                                            answer2={article.answer2}
                                            answer3={article.answer3}
                                        />
                                    ))}
                                </List>
                            </Card>
                        </Col>
                    </Row>
                    <div className="text-center">
                    <Link to="/result"><button className="btn btn-lg btn-primary" onClick={this.props.handleClick}>Finish</button>
                    </Link>
                    </div>
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default Saved;