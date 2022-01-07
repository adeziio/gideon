import React, { Component } from 'react';
import './../css/style.css';
import CircularProgress from '@mui/material/CircularProgress';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    render() {
        return (
            <>
                <CircularProgress />
                <p className='roboto-mono'>Coming soon...</p>
            </>
        )
    }

}