import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
            <Route exact path="/" component={Home} />
            <Route path="/saved" component={Saved} />
            <Route path="/topic" component={Topic} />
            <Route path="/result" component={Result} />
            <Route component={NoMatch} />
        </Switch>
        </div>
    </Router>;

export default App;