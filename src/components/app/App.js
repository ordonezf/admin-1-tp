import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from '../navbar/NavBar'
import SignIn from '../authentication/SignIn'
import SignUp from '../authentication/SignUp'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route path="/" exact component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                </div>
            </Router>
        )
    }
}

export default App;