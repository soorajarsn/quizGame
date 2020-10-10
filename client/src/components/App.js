import React from 'react'
import { Signin, Signup } from './Form_view'
import { SigninPage, SignupPage } from './pages/Authpages'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={props => <Index {...props} /> }/>
                <Route exact path="/signin" render={props => <SigninPage {...props} />} />
                <Route exact paht="/signup" render={props => <SignupPage {...props} />} />
            </Switch>
        </Router>
    )
}

export default App
