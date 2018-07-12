import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import flag from './Guatemala.png'

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.toggleIcon = this.toggleIcon.bind(this);
        this.state = {
            iconCollapsed: true
        };
    }

    toggleIcon() {
        this.setState({
            iconCollapsed: !this.state.iconCollapsed
        });
    }

    render() {
        return (
            <div>
                <nav className="navbar justify-content-between py-0">
                    <a href="/"><i className="material-icons">phonelink_setup</i></a>
                    <img src={flag}/>
                    <a href="/user"><i className="material-icons">settings</i></a>
                </nav>
            </div>
        );
    }
}

export default NavBar;