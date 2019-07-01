import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from '@material-ui/core/TableHead';
import axios from 'axios';


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
        return (<div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Trail System</TableCell>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center">Country</TableCell>
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


function tablenode() {
    //console.log('yeet', this.state);
    if (this.state.data) {
        return this.state.data.map((row, index) => [
            <TableRow
                hover
                style={{ cursor: "pointer" }}
            >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center">{row.country}</TableCell>
            </TableRow>
        ])
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