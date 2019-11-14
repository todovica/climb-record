import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
    flex1: {
      flexGrow: 1,
    },
    appbar: {
      color: 'primary',
      backgroundColor: '#aeea00',
      opacity: '0.8',
    },
    menuButton: {
        color: 'white !important'
    }
  }));


export default function NavBarComponent() {

    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appbar} >
        <Toolbar>
          <Typography variant="h6" className={classes.flex1}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
            <MenuIcon onClick={()=> {}} /> 
          </IconButton>
          <IconButton disabled edge="start" className={classes.menuButton}>
            {'Climb Record App'}
          </IconButton>
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=> { window.location.href='/climb-record/login'}}>
            <ExitIcon  />
          </IconButton>
        </Toolbar>
        </AppBar>
      );
}