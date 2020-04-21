import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from "react-router-dom";
import './index.css';
import searchHeader from './Components/searchHeader/searchHeader';
import login from './Components/login/login';
import home from './Components/home/home';
import root from './Components/root/root';
import searchResults from './Components/searchResults/searchResults';
import EnhancedTable from './Components/newsearch/EnhancedTable';
import segmentParent from './Components/segmentParent/segmentParent';
import paceBendParent from './Components/PaceBendParent/paceBendParent';

import * as serviceWorker from './serviceWorker';
// import components I want to use

const routing = (
    <Router>
        <div>
            <Route exact path = "/" component = {root} />
            <Route path = "/" component = {searchHeader} />
            <Route path = "/login" component = {login} />
            {/* <Route path = "/search" component = {searchResults} /> */}
            <Route path = "/search" component = {EnhancedTable} />

            <Route exact path ="/home" component = {home} />
            <Route exact path ="/segment" component = {segmentParent} />
            <Route exact path ="/pacebend" component = {paceBendParent} />

            {/* <Route exact path ="/auth/" component = {auth}/> */}
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
