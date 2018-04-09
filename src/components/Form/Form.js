import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Form.css';

class Form extends Component {
    state = {
        // hide input fields not needed on friends page
        friendsPage: false
    };
    
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="text">Enter your phone number</label>
                    <input type="text" className="form-control" placeholder="0123456789" name="keyword" value={this.props.keyword} onChange={this.props.handleInputChange}/>
                </div>
                <div className="text-center">
                    <Link to="/saved"><button className="btn btn-lg btn-primary">Login</button>
                    </Link>
                </div>
            </form>
        )
    }
}

export default Form;