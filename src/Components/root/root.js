import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import paceBendParent from '../PaceBendParent/paceBendParent';


class root extends React.Component {


    render() {
        return <paceBendParent/>
    }
}

export default root;