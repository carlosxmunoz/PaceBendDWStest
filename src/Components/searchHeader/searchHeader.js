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
        window.location.href = "search?q=" + this.state.q;
    }

    render() {

        const imageClick = () => {
            this.openUrl("https://yahoo.com");
        }

        const close_window = () => {
            window.close();
        };
        const queryString = require('query-string');

        var parsed = queryString.parse(this.props.location.search);

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
                    <div className="search-container">
                        <MuiThemeProvider>
                            <SearchBar
                                value = {parsed.q}
                                onChange={(onChange) => this.setState({ q: onChange })}
                                onRequestSearch={() => this.search()}
                                style={{
                                    margin: '0 auto',
                                    maxWidth: 800
                                }}
                            />
                        </MuiThemeProvider>
                    </div>


                    <div className="header-component-close-container">
                        {/* <Close className="close-button" onClick={() => close_window()}></Close> */}
                    </div>
                </Toolbar>
            </div>
        );
    }
}

export default searchHeader;