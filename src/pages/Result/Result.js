import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import Card from '../../components/Card';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';

class Saved extends Component {
    state = {
        articles: []
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="text-center">
                        <strong>Congratulations John!</strong>
                    </h1>
                    <h2 className="text-center">
                        You have completed 100%
                    </h2>
                </Jumbotron>
                <Container>
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default Saved;