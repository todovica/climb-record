import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
                
    <Router>
        <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
        </div>
    </Router>

);
}

export default App;
