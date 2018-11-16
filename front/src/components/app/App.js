import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from '../navbar/NavBar'
import SignIn from '../authentication/SignIn'
import SignUp from '../authentication/SignUp'
import SearchTurns from '../turns/SearchTurns'
import AppointmentList from '../controls/AppointmentList';
import AppointmentForm from '../controls/AppointmentForm';
import PrivateRoute from '../privateRoute/PrivateRoute'

class App extends React.Component {
    state = {
        isAuthenticated: false,
    };

    setIsAuthenticated = value => {
        console.log(`Received value: ${value}`);
        this.setState({ isAuthenticated: value });
        console.log(`New value setted for isAuthenticated: ${this.state.isAuthenticated}`);
    };

    render() {
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        return (
            <Router>
                <div>
                    <NavBar isAuthenticated={this.state.isAuthenticated} setIsAuthenticated={this.setIsAuthenticated} />
                    <Route path="/" exact render={ () => <SignIn setIsAuthenticated={this.setIsAuthenticated} />} />
                    <Route path="/signup" component={SignUp} />
                    <PrivateRoute path="/search" component={SearchTurns} isAuthenticated={this.state.isAuthenticated} />
                    <PrivateRoute path="/appointments" component={AppointmentList} isAuthenticated={this.state.isAuthenticated} />
                    <PrivateRoute path="/new-appointment" component={AppointmentForm} isAuthenticated={this.state.isAuthenticated} />
                </div>
            </Router>
        )
    }
}

export default App;
