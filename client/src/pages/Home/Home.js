import React, {Component} from 'react'
import {Container, Row, Col, Wrap} from '../../components/Grid'
import './Home.css'

class Home extends Component {
    state = {
    }

    render() {
        return (
            <Wrap>
            <Row custom="align-items-center justify-content-center mx-0 login-box">
                <Col size="sm-12 md-8 lg-6" custom="text-center m-0 p-0">
                    <div className="p-2">
                        <i className="material-icons my-3">phonelink_setup</i>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter your phone number" aria-label="Phone number" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <a href="/game"><button className="btn" type="button">SIGN IN</button></a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            </Wrap>
        )
    }
}

export default Home