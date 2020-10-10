import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SigninPage,SignupPage } from "./pages/Authpages";
import Index from "./pages/Index";
import Store, { AuthContext } from '../state/Store';
import {loadUser} from '../state/auth/authActions';
import TestPage from './pages/TestPage';
function App() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    loadUser(auth.dispatch,auth.state);
  },[auth.state.userLoggedIn,loadUser]);

  return (
    // <Store>
        <Router>
        <Switch>
          <Route exact={true} path="/" render={props => <Index {...props} />} />
          <Route exact={true} path="/signin" render={props => <SigninPage {...props} />} />
          <Route exact={true} path="/signup" render={props => <SignupPage {...props} />} />
          <Route exact={true} path="/test/:topic" render={props => < TestPage {...props }/>} />
        </Switch>
      </Router>
    // </Store>
  );
}
function AppWithStore(){
  return <Store>
    <App />
  </Store>
}

export default AppWithStore;
