import React from "react";
import { Toolbar } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { thisExpression } from "@babel/types";
import Maps from '../segment/segment'





class segmentParent extends React.Component {
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

    async  getJSONAsync() {
        const queryString = require('query-string');
        var parsed = queryString.parse(this.props.location.search);
        // console.log('pasr', parsed);
        // console.log('state.row.id', this.props.location.state.id);        
        let url = process.env.REACT_APP_BACKEND + "segment?SegId=" + parsed.id//this.props.location.state.id;
        if (parsed.q) {
            url = url + "?q=" + parsed.q;
        }
        if (parsed.size) {
            url = url + "&size=" + parsed.size;
        }
        // console.log('url', url);
        // console.log('environment variable', process.env.REACT_APP_BACKEND);

        //console.log('parsed', parsed);
        // The await keyword saves us from having to write a .then() block.    
        let json = await axios.get(url)
            .then(response => {
                // console.log('response.data', response.data);
                this.setState({ data: response.data });
                //return response.data;
            })
            .catch(error => {
                console.log(error);
            });
        // The result of the GET request is available in the json variable.
        // We return it just like in a regular synchronous function.
    }

    componentWillMount() {
        // const state = this.props.location.state
        // console.log('state', state.id);
        var data = this.getJSONAsync();
        //console.log('this.sssstate', this.state);
    }
    
    componentDidMount(){
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
        if (this.state && this.state.data) {
            return (

                <div className="parent-container">
                    <Maps polylines={this.state.data}></Maps>
                </div>
            );
        } else {
            return null
        }
    }
}

export default segmentParent;
