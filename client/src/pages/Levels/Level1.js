import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import {Card} from '../../components/Card';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import API from '../../utils/API';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';

export class Level1 extends Component {
    state = {
        articles: []
    };

    componentDidMount() {
        this.getSavedArticles();
    }

    getSavedArticles = () => {
        API.getSavedArticles()
        .then(res =>
            this.setState({
                articles: res.data
            })
        )
        .catch(err => console.log(err));
    };

    handleArticleDelete = id => {
        API.deleteArticle(id).then(res => this.getSavedArticles());
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="text-center">
                        <strong>Medical News Today Reader</strong>
                    </h1>
                    <h2 className="text-center">
                        List of saved articles
                    </h2>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col size="md-12">
                            <Card title="Saved Articles" icon="file_download">
                                {this.state.articles.length ? (
                                    <List>
                                    {this.state.articles.map(article => (
                                    <Article
                                    key={article.url.slice(-10).slice(0, 6)}
                                    id={article.url.slice(-10).slice(0, 6)}
                                    title={article.title}
                                    url={article.url}
                                    date={article.date}
                                    handleClick={this.handleArticleDelete}
                                    buttonText="Delete Article"
                                    saved
                                    />
                                    ))}
                                    </List>
                                ) : (
                                    <h2 className="text-center">No Saved Articles</h2>
                                )}
                            </Card>
                        </Col>
                    </Row>
                    <Footer />
                </Container>
            </div>
        );
    }
}