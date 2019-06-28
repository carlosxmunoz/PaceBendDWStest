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
            this.openUrl("https://www.strava.com/oauth/authorize?client_id=33111&redirect_uri=http://http://www.austintrailstatus.com/&response_type=code&scope=read,read_all,profile:read_all,activity:read,activity:read_all");
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