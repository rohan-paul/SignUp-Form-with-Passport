// It contains a login form. On clicking submit, it makes an axios post request with the username and password:

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {

    }
}