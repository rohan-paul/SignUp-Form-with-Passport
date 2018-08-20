import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [this.target.name]: this.target.value
        })
    }

    handleSubmit(event) {
        console.log('signup handleSubmit, username: ') // only debugging code
        console.log(this.state.username); // only debugging code
        event.preventDefault()

        //request to server to add a new username/password
        axios.post('/user/', {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            console.log(response) // only debugging code
            if(!response.data.error) {
                console.log('successful signup') // only debugging code to see result in devtool
                this.setState({ // redirect to home page
                    redirectTo: '/login'
                })
            } else {
                console.log('Username already taken');
            }
        }).catch(error => {
            console.log('Signup error');
            console.log('error');
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