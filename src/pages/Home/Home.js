import React, {Component} from 'react';
import Jumbotron from '../../components/Jumbotron';
import Form from '../../components/Form';
import Card from '../../components/Card';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';

class Home extends Component {
    state = {
        articles: [],
        message: "Click Get Articles",
        keyword: ''
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    formCheck = () => {
        this.props.history.push('/saved');
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="text-center">
                        <strong>Games 4 Good Debate</strong>
                    </h1>
                </Jumbotron>
                <Container>
                    <Row>
                    <Col size="md-12">
                        <Card title="Login" icon="account_circle">
                            <Form
                                keyword={this.state.keyword}
                                handleInputChange={this.handleInputChange}
                                handleClick={this.formCheck}
                            />
                        </Card>
                    </Col>
                    </Row>
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default Home;