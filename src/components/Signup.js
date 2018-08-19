import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [this.target.name]: this.target.value
        })
    }



    render () {
        return (
            <div>
            </div>
        )
    }
}

export default Signup