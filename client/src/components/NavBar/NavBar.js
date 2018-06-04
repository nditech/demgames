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
                <nav className="navbar justify-content-between">
                    <a href=""><i className="fas fa-gamepad fa-2x"></i></a>
                    <a href=""><img src={flag}/></a>
                    <a href=""><i className="fas fa-user-cog fa-2x"></i></a>
                </nav>
            </div>
        );
    }
}

export default NavBar;