import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import Card from '../../components/Card';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';
import data from './topics.json';

class Saved extends Component {
    state = {
        articles: data.topics
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
                            <Card title="Topics" icon="assignment">
                                <List>
                                    {this.state.articles.map(article => (
                                        <Article
                                            key={article.id}
                                            id={article.id}
                                            name={article.name}
                                        />
                                    ))}
                                </List>
                            </Card>
                        </Col>
                    </Row>
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default Saved;