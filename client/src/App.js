import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Home from './pages/Home';
// import {Module1, Module2, Module3} from './pages/Modules';
// import {Level1, Level2, Level3} from './pages/Levels';
// import User from './pages/User';
// import Game from './pages/Game';
// import NoMatch from './pages/NoMatch';
// import Done from './pages/Done';
import {Admin, Home, Game, Module1, Module2, Module3, Level1, Level2, Level3, User, Done, NoMatch} from './pages';

const App = () =>
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/module1" component={Module1} />
            <Route exact path="/module2" component={Module2} />
            <Route exact path="/module3" component={Module3} />
            <Route exact path="/level1" component={Level1} />
            <Route exact path="/level2" component={Level2} />
            <Route exact path="/level3" component={Level3} />
            <Route exact path="/user" component={User} />
            <Route exact path="/done" component={Done} />
            <Route component={NoMatch} />
        </Switch>
    </Router>

export default App