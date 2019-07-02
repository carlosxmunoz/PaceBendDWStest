import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from '@material-ui/core/TableHead';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";




class searchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsedRow: null,
            reverse: false
        };
    }

    // getData() {
    //     axios.get("http://66.68.130.115:5000/search")
    //         .then(response => {
    //             return response.data;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    async  getJSONAsync() {
        const queryString = require('query-string');
        var parsed = queryString.parse(this.props.location.search);
        //console.log('parsed', parsed.q);
        let url = "http://66.68.130.115:5000/search";
        if (parsed.q) {
            url = url + "?q=" + parsed.q;
        }
        if (parsed.size) {
            url = url + "&size=" + parsed.size;
        }

        //console.log('parsed', parsed);
        // The await keyword saves us from having to write a .then() block.    
        let json = await axios.get(url)
            .then(response => {
                //console.log('response.data', response.data);
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
        var data = this.getJSONAsync();
        //console.log('this.sssstate', this.state);
    }

    render() {
        const cookies = new Cookies();

        if (cookies.get('cuckie') == null) {
            return <Redirect to='/login' />
        }
        console.log('cuckie', cookies.get('cuckie'))

        return (<div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Trail System</TableCell>
                        <TableCell onClick={() => sortState('distance')} align="right">Distance</TableCell>
                        <TableCell onClick={() => sortState('city')} align="center">City</TableCell>
                        <TableCell onClick={() => this.state.data.sort(compareValues('state'))} align="center">State</TableCell>
                        <TableCell onClick={() => this.state.data.sort(compareValues('distance'))} align="center">Country</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{tablenode.bind(this)()}</TableBody>
            </Table>
            <button onClick={() => this.setState({ reverse: !this.state.reverse })}>
                Reverse order
                </button>
        </div>
        );
    }

}

function sortState(a) {
    if (this.state.data) {
        this.state.data.sort(compareValues(a))
    }
    console.log('Sorting', a);
}

// async function getJSONAsync() {

//     // The await keyword saves us from having to write a .then() block.    
//     let json = await axios.get("http://66.68.130.115:5000/search")
//         .then(response => {
//             console.log('response.data', response.data);
//             return response.data;
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     // The result of the GET request is available in the json variable.
//     // We return it just like in a regular synchronous function.
// }

Number.prototype.toFixedDown = function (digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};
// function for dynamic sorting
function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ? (comparison * -1) : comparison
        );
    };
}
function tablenode() {
    //console.log('yeet', this.state);
    if (this.state.data) {
        this.state.data.sort(compareValues('distance'));



        return this.state.data.map((row, index) => [
            <TableRow
                hover
                style={{ cursor: "pointer" }}
            >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{(row.distance * 0.000621371).toFixedDown(2)} miles</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center">{row.country}</TableCell>
            </TableRow>
        ])
            //.sort(compareValues('distance'))
            .sort(a => (this.state.reverse ? -1 : 1));
    }
}




const rows = [
    createData('Walnut Park', 159, 6.0, [createData("Inner Log Loop", 14, 24), createData("Outer Log Loop", 11, 22)]),
    createData('Brushy Creek', 237, 9.0, [createData("Deception", 24, 25)]),
    createData('BCBG', 262, 16.0, [createData("Candy Land", 21, 11)]),
];

function createData(name, today, yesterday, trails) {
    return { name, today, yesterday, trails };
}

// function getData() {
//     axios.get("http://66.68.130.115:5000/search")
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

export default searchResults;