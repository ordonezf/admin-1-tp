import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../navbar/NavBar';
import SignIn from '../authentication/SignIn';
import SignUp from '../authentication/SignUp';
import SearchAppointments from '../search/SearchAppointments';
import AppointmentList from '../appointments/AppointmentList';
import AppointmentForm from '../appointments/AppointmentForm';
import PrivateRoute from '../privateRoute/PrivateRoute';
import ServerConnector from '../../connectors/ServerConnector';

class App extends React.Component {
  state = {
    isAuthenticated: false,
    serverConnector: new ServerConnector(),
    userId: -1,
  };

  setIsAuthenticated = value => {
    console.log(`Received value: ${value}`);
    this.setState({ isAuthenticated: true });
    this.setState({ userId: value});
    console.log(
      `New value setted for isAuthenticated: ${this.state.isAuthenticated}`
    );
  };

  getUserId = () => {
    return this.state.userId;
  }

  render() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    return (
      <Router>
        <div>
          <NavBar
            isAuthenticated={this.state.isAuthenticated}
            setIsAuthenticated={this.setIsAuthenticated}
          />
          <Route
            path="/"
            exact
            render={() => (
              <SignIn setIsAuthenticated={this.setIsAuthenticated} />
            )}
          />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute
            path="/search"
            component={SearchAppointments}
            isAuthenticated={this.state.isAuthenticated}
          />
          <PrivateRoute
            path="/appointments"
            component={AppointmentList}
            isAuthenticated={this.state.isAuthenticated}
          />
          <Route
            path="/newappointment"
            render={() => (
              <AppointmentForm getUserId={this.getUserId} />
            )}
            isAuthenticated={this.state.isAuthenticated}
          />
        </div>
      </Router>
    );
  }
}

export default App;
