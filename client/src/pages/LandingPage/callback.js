import React, { Component } from 'react';
import Auth from '../../Auth';


class Callback extends Component {
  componentDidMount() {
    // console.log(this.props.auth.getProfile());
    const auth = new Auth();

    auth.handleAuthentication();
  }

  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <p>Loading...</p>
      </div>
    );
  }
}

export default Callback;
