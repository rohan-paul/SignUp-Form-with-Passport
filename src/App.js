import React, { Component } from 'react';
import axios from 'axios'

import { Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'

import './App.css';
// import { runInContext } from 'vm';

class App extends Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,
          username: null
        }
    
        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
      }
    
      componentDidMount() {
        this.getUser()
      }
    
      updateUser (userObject) {
        this.setState(userObject)
      }

    getUser() {
        axios.get('/user/').then(response => {
          console.log('Get user response: ')
          console.log(response.data)
          if (response.data.user) {
            console.log('Get User: There is a user saved in the server session: ')

            this.setState({
              loggedIn: true,
              username: response.data.user.username
            })
          } else {
            console.log('Get user: no user');
            this.setState({
              loggedIn: false,
              username: null
            })
          }
        })
      }


  render() {
    return (
      <div className="App">
      <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />

      {/* Greet the user if he/she is logged-in (i.e. loggedIn is true) */}
      {this.state.loggedIn && <p>Join the party, {this.state.username}</p>}
        <Route
        exact path="/"
        component={Home} />

        <Route
        path="/login"
        render={() =>
            <LoginForm
            updateUser={this.updateUser}
            />}
        />

        <Route
        path="/signup"
        render={() =>
            <Signup/>}
        />
      </div>
    );
  }
}

export default App;

/* The above is a case of the need to pass a prop to a component being rendered by React Router, instead of using Routes component prop, use its render prop passing it an inline function then pass along the arguments to the element you’re creating.

I could have done like below

<Route
        path='/login'
        component={() => <LoginForm updateUser={this.updateUser />}
        />

The above would work technically but bad for performance - the reason is below :
I pass an inline function to render the component within React Router because of performance. According to the offical docs… - “When you use the component props, the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component attribute, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component.”

See my detail note in - ../Curated-List-For-JavaScript-Interviews/React/pass-prop-to-component-rendered-by-React-Router.md

*/