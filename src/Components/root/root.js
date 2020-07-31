import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';


class root extends React.Component {


    render() {
        return <Redirect to='/pacebend' />
    }
}

export default root;