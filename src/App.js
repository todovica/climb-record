import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './index.scss';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: { main: '#aeea00' }, // Purple and green play nicely together.
      secondary: { main: '#006400' }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
  });


function App() {
  return (
    <MuiThemeProvider theme={theme}>
                
    <Router>
        <div>
            <PrivateRoute exact path="/climb-record/home" component={HomePage} />
            <Route path="/climb-record/login" component={LoginPage} />
            <Route path="/climb-record/signup" component={SignUpPage} />
            <Redirect from='/climb-record*' to='/climb-record/home'/>
        </div>
    </Router>
</MuiThemeProvider>
);
}

export default App;
