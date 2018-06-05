import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import {Level1, Level2, Level3} from './pages/Levels';
import User from './pages/User'
import Game from './pages/Game'
import NoMatch from './pages/NoMatch';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import './App.css'

const App = () =>
    <Router>
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/game" component={Game} />
                <Route exact path="/level1" component={Level1} />
                <Route exact path="/level2" component={Level2} />
                <Route exact path="/level3" component={Level3} />
                <Route exact path="/user" component={User} />
                <Route component={NoMatch} />
            </Switch>
            <Footer />
        </div>
    </Router>;

export default App;