import React from 'react'
import { Signin, Signup } from './Form_view'
import { SigninPage, SignupPage } from './pages/Authpages'
import {BrowserRouter as Router} from 'react-router-dom';
function App() {
    return (
        <Router>
            <SigninPage />
            <SignupPage />
        </Router>
    )
}

export default App
