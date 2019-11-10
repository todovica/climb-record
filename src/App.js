import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './index.scss';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
                
    <Router>
        <div>
            <PrivateRoute exact path="/climb-record/home" component={HomePage} />
            <Route path="/climb-record/login" component={LoginPage} />
            <Route path="/climb-record/signup" component={SignUpPage} />
            {/*<Redirect from='/climb-record*' to='/climb-record/home'/>*/}
        </div>
    </Router>

);
}

export default App;
