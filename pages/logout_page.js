import React from "react";
import Router from 'next/router'

export default class Logout extends React.Component {
  async componentDidMount() {
    let aT = sessionStorage.getItem('accessToken')
    if (aT) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('idToken');
        sessionStorage.removeItem('level');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('CTime');
        sessionStorage.removeItem('refreshToken');
        Router.reload(window.location.pathname)
    }
    
  }
  render() {
  
  return (
        
      <div>
        <div>Successfully logged out.</div>
      </div>
      )
    }
  }
