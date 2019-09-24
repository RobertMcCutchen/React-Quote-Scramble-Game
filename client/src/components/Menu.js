import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

function Menu(props) {
    const handleSignout = () => {
        // remove the jsonwebtoken from local storage 
        localStorage.removeItem('jsonwebtoken')
        // update global state to set isAuthenticated = false 
        props.onSignout() 
    }

    return (
        <ul>
            { props.authenticated ?  <li><NavLink to = "/api/home">Home</NavLink></li> : null }
            { props.authenticated ? <li><NavLink to = "#">Favorite Quotes</NavLink></li> : null } 
            { props.authenticated ?  <li><a href="/Login" onClick={() => handleSignout()}>Sign out</a></li> : null } 
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.isAuthenticated  // props.authenticated 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignout: () => dispatch({type: 'SIGN_OUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)