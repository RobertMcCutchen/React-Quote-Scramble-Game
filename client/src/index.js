import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { setAuthenticationHeader } from './utils/authenticate'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './store/reducer'
import requireAuth from './components/requireAuth'

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Get the token 
let token = localStorage.getItem('jsonwebtoken')
// and attach it to the header 
setAuthenticationHeader(token)

ReactDOM.render(
    <BrowserRouter>
    <Provider store = {store} >
        <App>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/api/home" component={requireAuth(Home)}/>
            </Switch>
        </App>
    </Provider>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
