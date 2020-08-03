import React from "react";
import { Toolbar } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { thisExpression } from "@babel/types";
import Maps from '../PaceBend/segment'





class paceBendParent extends React.Component {
    openUrl(url) {
        if (
            url.toLocaleLowerCase().includes("http") ||
            url.toLocaleLowerCase().includes("ftp")
        ) {
            window.open(url, "_blank");
        } else {
            window.open("//" + url, "_blank");
        }
    }

    search() {
        window.location.href = "search?q=" + this.state.q;
    }



    componentWillMount() {
        // const state = this.props.location.state
        // console.log('state', state.id);
        //console.log('this.sssstate', this.state);
    }

    componentDidMount() {
        const state = this.props.location.state
        console.log('state', state);

        // const { id } = this.props.match.params    
        // this.props.location.pathname = '/segments?id=' + state.id
        // console.log(this.props.location.pathname);
        // this.setState({row: state});

    }

    render() {
        // const state = this.props.location.state;
        // if (state && this.state && !this.state.row) {        
        //     this.setState({row: state});
        // }
        return (

            <div className="parent-container">
                <Maps></Maps>
            </div>
        );

    }
}

export default paceBendParent;
