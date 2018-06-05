import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import {Card} from '../../components/Card';
import Footer from '../../components/Footer';
import API from '../../utils/API';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';

export class Level1 extends Component {
    render() {
        return (
            <div>
                <p>This is level 1</p>
            </div>
        )
    }
}