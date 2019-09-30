import React, { useState } from 'react';
import axios from 'axios';
import { setAuthenticationHeader } from '../utils/authenticate';
import { connect } from 'react-redux';
import './Login.css'

function Login(props) {
    
    const [user, setUser] = useState({username: '', password: ''})

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    const handleRegister = () => {
        axios.post('http://localhost:8888/register',{
            username: user.username, 
            password: user.password
        }).then(response => {
            if( user.username && user.password) {
            const token = response.data.token
            // save token in local storage 
            localStorage.setItem('jsonwebtoken',token)
            // set default axios header 
            setAuthenticationHeader(token)
            // change redux state to isAuthenticated true 
            props.onAuthenticated(token)
            props.onAuthenticated(token)
            props.history.push('/api/home')
            }
            
        })
    }

    const handleLogin = () => {
        axios.post('http://localhost:8888/login',{
            username: user.username, 
            password: user.password
        }).then(response => {
            if(user.username && user.password) {
            const token = response.data.token
            localStorage.setItem('jsonwebtoken',token)
            setAuthenticationHeader(token)
            props.onAuthenticated(token)
            props.history.push('/api/home')
            }
        })
    }

    return (
        <div>
            <div className="Form">
                <span>Register</span>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    onChange={(e) => handleTextChange(e)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => handleTextChange(e)}
                    required
                />
                <button onClick={() => handleRegister()}>Sign me up!</button>
            </div>
            <div className="Form">
                <span>Login</span>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    onChange={(e) => handleTextChange(e)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => handleTextChange(e)}
                    required
                />
                <button onClick={() => handleLogin()}>Log me in!</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token) => dispatch({type: 'ON_AUTHENTICATED', token: token})
    }
}

export default connect(null,mapDispatchToProps)(Login);