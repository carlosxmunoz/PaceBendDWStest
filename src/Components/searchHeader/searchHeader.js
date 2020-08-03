import React from "react";
import { Toolbar } from "@material-ui/core";
import "./searchHeader.css";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { thisExpression } from "@babel/types";






class searchHeader extends React.Component {
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
        if (this.state && this.state.q) {
            let queryString = "q=" + this.state.q;
            //window.open("/search?q=" +this.state.q, "_self")
            this.props.history.push(`/search?${queryString}`);
            
            window.location.href = "search?q=" + this.state.q;
        }
        //window.location.href = "search";

    }

    render() {

        const imageClick = () => {
            this.search();
        }

        const close_window = () => {
            window.close();
        };
        const queryString = require('query-string');

        var parsed = queryString.parse(this.props.location.search);
        const cookies = new Cookies();


        let search;
        if (cookies.get('cuckie')) {
            search = <div className="search-container">
                <MuiThemeProvider>
                    <SearchBar
                        value={parsed.q}
                        onChange={(onChange) => this.setState({ q: onChange })}
                        onRequestSearch={() => this.search()}
                        style={{
                            margin: '0 auto',
                            maxWidth: 800
                        }}
                    />
                </MuiThemeProvider>
            </div>;
        }

        return (

            <div className="header-container">
                <Toolbar className="toolbar-container">
                    <div className="header-component-logo-container">
                        <img
                            src={require("../../assets/jellyfish.svg")}
                            height="32"
                            onClick={() => imageClick()}
                        />
                    </div>
                    {search}
                    <div className="header-component-close-container">
                        {/* <Close className="close-button" onClick={() => close_window()}></Close> */}
                    </div>
                </Toolbar>
            </div>
        );
    }
}

export default searchHeader;