import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from "react-router-dom";
import './index.css';
import searchHeader from './Components/searchHeader/searchHeader';
import home from './Components/home/home';
import root from './Components/root/root';
import paceBendParent from './Components/PaceBendParent/paceBendParent';

// import components I want to use

const routing = (
    <Router>
        <div>
            <Route exact path = "/" component = {root} />
            <Route path = "/" component = {searchHeader} />
            <Route exact path ="/home" component = {home} />
            <Route exact path ="/pacebend" component = {paceBendParent} />

            {/* <Route exact path ="/auth/" component = {auth}/> */}
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
