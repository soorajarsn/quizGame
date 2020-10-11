import React, { useEffect, useContext } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SigninPage, SignupPage } from "./pages/Authpages";
import Index from "./pages/Index";
import Store, { AuthContext, InfoContext } from "../state/Store";
import { loadUser } from "../state/auth/authActions";
import TestPage from "./pages/TestPage";
import { ToasterComponent } from "./Toaster";
import AdminPage from "./pages/AdminPage";
function App() {
  const auth = useContext(AuthContext);
  const info = useContext(InfoContext);
  useEffect(() => {
    loadUser(auth.dispatch, auth.state);
  }, [auth.state.userLoggedIn, loadUser]);

  return (
    // <Store>
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact={true} path="/" render={props => <Index {...props} />} />
          <Route exact={true} path="/signin" render={props => <SigninPage {...props} />} />
          <Route exact={true} path="/signup" render={props => <SignupPage {...props} />} />
          <Route exact={true} path="/test/:topic" render={props => <TestPage {...props} />} />
          <Route exact={true} path="/admin/createQuestion" render={props => <AdminPage {...props} />} />
        </Switch>
      </Router>
      {info.state.error && ReactDOM.createPortal(<ToasterComponent text={info.state.error} failure/>,document.getElementById('info-portal'))}
      {info.state.warning && ReactDOM.createPortal(<ToasterComponent text={info.state.warning} warning/>,document.getElementById('info-portal'))}
      {info.state.success && ReactDOM.createPortal(<ToasterComponent text={info.state.success} success/>,document.getElementById('info-portal'))} 
    </React.Fragment>
    // </Store>
  );
}
function AppWithStore() {
  return (
    <Store>
      <App />
    </Store>
  );
}

export default AppWithStore;
