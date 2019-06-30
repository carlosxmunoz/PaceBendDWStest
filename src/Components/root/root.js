import React from "react";
import { Toolbar } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';


class root extends React.Component {


    render() {

        const cookies = new Cookies();



        // TODO Send backend this this.props.location.search
        const queryString = require('query-string');
        var parsed = queryString.parse(this.props.location.search);

        if (this.props.location.search) {
            axios.get('http://66.68.130.115:5000/login?bearer=' + parsed.code)
                .then(response => {
                    //console.log(response.data);
                    const cookies = new Cookies();
                    cookies.set('cuckie', parsed.code, { path: '/' });
                    window.location.reload(true);
                    //TODO Make Cuckie expire
                    //console.log(cookies.get('cuckie'));

                })
                .catch(error => {
                    console.log(error);
                });
        }

        console.log('search props', this.props)
        console.log('parsed.code', parsed.code)
        if (parsed.code) {
            return <Redirect to='/home' />
        } else {
            const cookies = new Cookies();
            if (cookies.get('cuckie') == null || cookies.get('cuckie') == '') {
                console.log('checkin for cookie');
            }
            return <Redirect to='/login' />
        }
    }
}

export default root;