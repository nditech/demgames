import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Home from './pages/Home';
// import {Module1, Module2, Module3} from './pages/Modules';
// import {Level1, Level2, Level3} from './pages/Levels';
// import User from './pages/User';
// import Game from './pages/Game';
// import NoMatch from './pages/NoMatch';
// import Done from './pages/Done';
import {Admin, Home, Game, Module, Level, User, Done, NoMatch, Question} from './pages';

const App = () =>
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin/:name" component={Admin} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/module/:name" component={Module} />
            <Route exact path="/module/:name/level/:number" component={Level} />
            <Route exact path="/user" component={User} />
            <Route exact path="/done" component={Done} />
            <Route exact path="/question/:id" component={Question} />
            <Route component={NoMatch} />
        </Switch>
    </Router>

export default App