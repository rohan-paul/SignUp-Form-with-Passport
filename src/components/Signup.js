import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
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
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        })
        .then(response => {
            console.log(response) // only debugging code
            if(!response.data.error && (this.state.password == this.state.confirmPassword)) {
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


    // the render() function is pretty much the same as loginForm

    render() {
        if (this.state.redirectTo) {
                return <Redirect to={{ pathname: this.state.redirectTo }} />
            } else {
                return (
                    <div className="SignupForm">
                        <h4>Sign up</h4>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="username">Username</label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input className="form-input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="password">Password: </label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input className="form-input"
                                        placeholder="password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="confirmPassword">Confirm Password: </label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input className="form-input"
                                        placeholder="confirm password"
                                        type="password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group ">
                                <div className="col-7"></div>
                                <button
                                    className="btn btn-primary col-1 col-mr-auto"
                                    onClick={this.handleSubmit}
                                    type="submit"
                                >Sign up</button>
                            </div>
                        </form>
                    </div>

                )
            }
        }
    }

export default Signup