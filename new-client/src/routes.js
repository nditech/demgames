import React from "react";
import {Switch, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';

export default ({childProps}) => 
    <Switch>
        <Route path="/" exact component={LandingPage} props={childProps} />
        <Route path="/profile" exact component={Profile} props={childProps} />
        {/* <Route {...rest} render={props => <C {...props} {...cProps} />} /> */}
    </Switch>
