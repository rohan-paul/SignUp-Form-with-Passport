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
        console.log('login handleSubmit, username: ') // only debugging code
        console.log(this.state.username); // only debugging code
        event.preventDefault();

        axios.post('/user/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            console.log('response from server after sending login request')
            console.log('handleSubmit')
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                })
                // after successful login, update the state to redirect to home
                this.setState({
                    redirectTo: '/'
                })
            }
        }).catch(error => {
            console.log('login error')
            console.log(error)
        })
    }

render () {
    if(this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
        return (
            <div>
                <h4>Login</h4>
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
                                <label className="form-label" htmlFor="password">Password</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="please put your password here"
                                value={this.state.password}
                                onChange={this.handleChange}                                
                                />
                            </div>
                        </div>

                    </form>
            </div>
        )
    }
  }
}

export default LoginForm

/* 1> From this LoginForm components is sent the request from user's browsers to the server for logging in with axios.post

The HTTP post request is performed by calling axios.post(). In its first parameter we’re passing in the URI of the service endpoint. In the second parameter, we’re passing in the full user object which contains the properties of the user: username and password. By default these two properties are set to be empty string.

2> axios.post() - Good explanation - (https://www.sitepoint.com/axios-beginner-guide/)

The post, put, and patch methods take a data object as their second argument, and an optional config object as the third

The response object
When the request is successful, your then() callback will receive a response object with the following properties:

data: the payload returned from the server. By default, Axios expects JSON and will parse this back into a JavaScript object for you.
status: the HTTP code returned from the server.
statusText: the HTTP status message returned by the server.
headers: all the headers sent back by the server.
config: the original request configuration.
request: the actual XMLHttpRequest object (when running in a browser).

*******************************************
3> Redirect Component -

( first as a theory remember that Redirect and history are related )


3-A> Official Doc - https://reacttraining.com/react-router/web/api/Redirect

Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.

3-B> https://medium.com/@anneeb/redirecting-in-react-4de5e517354a

The easiest way to redirect to a new location is by using its Redirect component. When the component is rendered, the existing location of the history object is replaced with a new location.

On the other hand - If you don’t want to override the existing history location, then including the push property will push a new entry onto the history.

So, basically here in this file, above, if the user is successfully logged-in then inside the handleSubmit() function, I am setting 'redirectTo' to be the home url ('/') and then within the render() function, I am re-directing whatever is the value of  < this.state.redirectTo >

And if I did not use this Redirect to way of doing this, then I had to use < this.props.history.push('/') >   But that is not ideal, in the case - if the component that needs the redirect functionality is nested super deep - then Passing these props through all the components between the route and your child component is not ideal


3-C> react-router Redirect vs history.push

https://stackoverflow.com/questions/48619733/react-router-redirect-vs-history-push

Redirect

Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.

whereas History

push function Pushes a new entry onto the history stack

https://stackoverflow.com/questions/46757676/in-react-is-it-always-better-to-render-a-redirect-than-use-this-props-history-pu?rq=1

rendering redirects has its negative issues, as it is kind of counterintuitive that you have to render a component in order to change the page however it does provide some clear benefits

so the issue with this.props.history.push() is mostly when you are dealing with child components that are triggering redirects

Component A # the one Rendered by the Route
  Component B
    Component C # the one triggering the redirect

in the example above, unless you are diligent with passing down the route props from Component A down to Component C, then you wouldn't be able to use history.push() in Component C

Rendering Redirect was supposed to be the answer to that scenario that was provided by the maintainer of react-router but some people just dont like the idea at all(me included).

Functioanally speaking, there doesnt seem to be major differences in functionality between Redirect and history.push as Redirect uses it under the hood. The major reason to use Redirect over history.push is that Redirect is future proofed from possible changes on how history would work or if they decide to handle context differently at a later date.


*******************************************
Quick note on history.push from ../Curated-List-For-JavaScript-Interviews/React/this.props.history.push.md

The real work horse of React Router is the History library. Under the hood it’s what’s keeping track of session history for React Router.
When a component is rendered by React Router, that component is passed three different props: location, match, and history. This history prop comes from the History library and has a ton of fancy properties on it related to routing. In this case, the one we’re interested is history.push. What it does is it pushes a new entry onto the history stack - **aka redirecting the user to another route**.

Most obvious implementation will be in a handleClick or onSubmit - after clicking / submitting I wanto the user to get redirected to a new URL and also simultaneously add this page to browser history

4> form-horizontal class - https://picturepan2.github.io/spectre/elements.html#forms-horizontal

If you want to have a horizontal form, add the form-horizontal class to the <form> container. And add the col-<1-12> and col-xs/sm/lg/xl-<1-12> class to the child elements for responsive form row layout.
*/