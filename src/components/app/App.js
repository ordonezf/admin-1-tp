import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from '../navbar/NavBar'
import SignIn from '../authentication/SignIn'
import SignUp from '../authentication/SignUp'
import SearchTurns from '../turns/SearchTurns'
import AppointmentList from '../controls/AppointmentList';
import AppointmentForm from '../controls/AppointmentForm';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route path="/" exact component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/search" component={SearchTurns} />
                    <Route path="/appointments" component={AppointmentList} />
                    <Route path="/new-appointment" component={AppointmentForm} />
                </div>
            </Router>
        )
    }
}

export default App;
