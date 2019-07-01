import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';


class root extends React.Component {


    render() {
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

        if (parsed.code) {
            return <Redirect to='/home' />
        } else {
            const cookies = new Cookies();
            if (cookies.get('cuckie') === null || cookies.get('cuckie') === '') {
                //console.log('checkin for cookie');
            }
            return <Redirect to='/login' />
        }
    }
}

export default root;