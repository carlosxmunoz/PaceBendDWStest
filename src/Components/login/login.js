import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';


// import "./searchHeader.css";

class login extends React.Component {
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

    render() {
        const imageClick = () => {
            this.openUrl(process.env.REACT_APP_AUTH + process.env.REACT_APP_CLIENT_ID + "&redirect_uri=" + process.env.REACT_APP_REDIRECT_URI + process.env.REACT_APP_REPONSE_TYPE);
            window.close ();
        }
        const cookies = new Cookies();
        if (cookies.get('cuckie')) {
            return <Redirect to='/home' />
        }
        return (
            <div className="button-container">
                <img
                    src={require("../../assets/btn_strava_connectwith_orange.png")}
                    height="32"
                    onClick={() => imageClick()}
                /> 
            </div>
        );
    }
}

export default login;