import React, {Component} from 'react'
import {Container, Row, Col} from '../../components/Grid'
import './Home.css'

class Home extends Component {
    state = {
    }

    render() {
        return (
            <Row custom="align-items-center justify-content-center mx-0 px-0">
                <Col size="sm-12 md-8 lg-6" custom="text-center m-0 p-0">
                    <div className="login-box p-2">
                        <i className="material-icons my-3">phonelink_setup</i>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Your phone number" aria-label="Your phone number" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <a href="/game"><button className="btn" type="button">Sign in</button></a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Home