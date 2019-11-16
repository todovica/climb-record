import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import MessageIcon from '@material-ui/icons/Message';
import Loading from './Loading';

const useStyles = makeStyles(theme => ({
  border: {
    "&:hover": {
      cursor: 'pointer',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    }
  },
  button: {
    backgroundColor: '#ffff',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },

}));


function UsersCardComponent(props) {
  const classes = useStyles();

  const { users } = props;
  return (
    <Grid item sx={12} sm={4} md={2} style={{ minWidth: '18em' }}>

      {users.loading && <Loading />}
      {users.length &&
        <List>
          {users.map((user, index) =>
            <ListItem key={index} className={classes.border}
              onClick={() => { props.history.push({ pathname: '/climb-record/id/' + user.username }) }}
            >
              <ListItemAvatar>
                <Avatar>
                  {(user.image) ? <img style={{ width: "2.4em" }} src={user.image} alt="Profie" /> : <AccountCircleIcon fontSize="large" />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.firstName + ' ' + user.lastName}
              />
              <ListItemSecondaryAction>
              <Fab size="small" aria-label="scroll back to top" className={classes.button}>
                <MessageIcon color="primary" />
              </Fab>
                
              </ListItemSecondaryAction>
            </ListItem>)
          }
        </List>}

    </Grid>
  );
}

export default withRouter(UsersCardComponent);








