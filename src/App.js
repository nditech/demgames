import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import { HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Topic from './pages/Topic';
import Result from './pages/Result';
import NoMatch from './pages/NoMatch';
import NavBar from './components/NavBar';
import './App.css';

const App = () =>
    <Router>
        <div>
        <NavBar />
        <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/g4g-debate/'} component={Home} />
            <Route exact path='/saved' component={Saved} />
            <Route exact path='/topic' component={Topic} />
            <Route exact path='/result' component={Result} />
            <Route component={NoMatch} />
        </Switch>
        </div>
    </Router>;

export default App;