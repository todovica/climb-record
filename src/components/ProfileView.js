import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RoomIcon from '@material-ui/icons/Room';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { userService } from '../services';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [rutes, setRutes] = React.useState([]);

  const handleClickOpen = () => {
    userService.getRutesForUser()
    .then((rutes) => setRutes(rutes))
    .then(setOpen(true));
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const { user } = props;

  console.log(user.image)
  return (
    <div>
      <Button fullWidth variant="outlined" color="primary" onClick={handleClickOpen} >
        <Grid container direction="row" justify="space-between" alignItems="center" >
          {(user.image) ? <img style={{ width: "2.4em"}} src={user.image} alt="Profie Photo" /> : <AccountCircleIcon fontSize="large" />}
          {user.firstName + ' ' + user.lastName}
        </Grid>
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {user.firstName + ' ' + user.lastName}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              ...
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
        <div className="container profileheader d-flex justify-content-between">
            <div>
                <div>
                {(user.image) ? <img src={user.image} alt="Profie Photo" /> : <AccountCircleIcon style={{ width: "150px", height: "150px" }} />}
                </div>
                <div>
                    {props.user.firstName + ' ' + props.user.lastName}
                </div>
                <hr />
            </div>
        </div>
        <List>{rutes.map((rutes, index) => {
            if(rutes.username === user.username) {
                return <div className="container" key={index}>
                    <a data-toggle="collapse"
                       href={'#'+rutes.ruteName.replace(/\s+/g,'')}
                       role="button"
                       aria-expanded="false"
                       aria-controls={rutes.ruteName.replace(/\s+/g,'')}>
                       <div className="row justify-content-between">
                           <div>{rutes.ruteName}</div>
                           <div>{rutes.grade}</div>
                        </div>
                    </a>
                    <hr></hr>
                    <div className="collapse" id={rutes.ruteName.replace(/\s+/g,'')}>
                        <div className="row expandedarea justify-content-between">
                            <div className="expandedtext">
                                <div><RoomIcon />{' ' + rutes.location}</div>
                                <div><InsertCommentIcon />{' ' + rutes.comment}</div>
                            </div>
                        </div>
                    </div>
                    </div>
                } else {
                    return null;
                }})}
        </List>
        </Container>
      </Dialog>
    </div>
  );
}