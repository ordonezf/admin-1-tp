import React, { Component } from 'react';
import './App.css';

class Authentication extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__Aside"></div>
        <div className="App__Form">
            <div className="PageSwitcher">
              <a href="#" className="PageSwitcher__Item">Sign In</a>
              <a href="#" className="PageSwitcher__Item PageSwitcher__Item--Active">Sign Up</a>
            </div>

            <div className="FormTitle">
              <a href="#" className="FormTitle__Link">Sign In</a> or
              <a href="#" className="FormField__Link FormField__Link--Active">Sign Up</a>
            </div>

            <div className="FormCenter">
              <form className="FormFields" onSubmit={this.handleSubmit}>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="name">Full Name</label>
                  <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name"/>
                </div>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">Password</label>
                  <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password"/>
                </div>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="email">Enter email</label>
                  <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email"/>
                </div>
                <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button>
                  <a href="#" className="FormField__Link">Already a member!</a>
                </div>
              </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Authentication;
