import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }


    render() {
        return (
            <div>
                <header className="navbar App-header" id="nav-container">
                    {/* the below div will hold the section section for login signup */}
                    <div className="col-4">
                    </div>
                </header>
            </div>

        );
    }
}

export default Navbar;