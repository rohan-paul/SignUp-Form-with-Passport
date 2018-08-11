import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre.min.css'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)


registerServiceWorker();

/* I used the BrowserRouter from react-router-dom, which will allow some client-side routing. Specifically, we’ll use it to render the signup form when the url has “/signup” and the login form when the url has “/login”.  */