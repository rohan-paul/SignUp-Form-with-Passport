import React, { Component } from 'react';
import axios from 'axios'

import { Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'

import './App.css';
import { runInContext } from 'vm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
            exact path="/"
            component={Home} />

      </div>
    );
  }
}

export default App;
