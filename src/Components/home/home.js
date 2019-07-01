import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';


class home extends React.Component {
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
        // console.log("this.props", this.props.match.url);
        // console.log("this.props", this.props.location.search);
        //make call to backend
        const cookies = new Cookies();
        //console.log('cookie', cookies.get('cuckie'));
        
        //window.location.reload(true);
        
        if (cookies.get('cuckie') == null) {
            return <Redirect to='/login' />
        } else {
            return <Redirect to='/search' />
        }

        

        return (
            <div className="home-container">
                <p>Thank you for helping us create a better Tomorrow :)</p>
            </div>
        );
    }
}

export default home;