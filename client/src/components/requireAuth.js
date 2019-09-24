import React, { Component } from 'react';
import { connect } from 'react-redux'

// higher order component which takes in another component 
export default function(ComposedComponent) {

  class Authenticate extends Component {
    constructor(props) {
      super(props)
      if(!this.props.isAuthenticated) {
        this.props.history.push('/api/home')
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.isAuthenticated
    }
  }

  return connect(mapStateToProps)(Authenticate)
}