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
        const Protected = () => <h3>Protected</h3>

        return (
            <Router>
                <div>
                    <NavBar isAuthenticated={this.state.isAuthenticated} setIsAuthenticated={this.setIsAuthenticated} />
                    <Route path="/" exact render={ () => <SignIn setIsAuthenticated={this.setIsAuthenticated} />} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/search" component={SearchTurns} />
                    <Route path="/appointments" component={AppointmentList} />
                    <Route path="/new-appointment" component={AppointmentForm} />
                    <PrivateRoute path='/protected' component={Protected} />
                </div>
            </Router>
        )
    }
}

export default App;
