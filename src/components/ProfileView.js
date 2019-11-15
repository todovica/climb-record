import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userService } from '../services';
import NavBarComponent from './NavBarComponent';
import RoutesTable from './RoutesTable';
import Loading from './Loading';

import { LOADING, USER_FOUND, USER_NOT_FOUND, INTERNAL_ERROR } from '../constants/loading';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  imageBorder: {
    margin: '20px',
    marginRight: '20px',
    border: '2px solid',
    borderRadius: '10em',
    borderColor: '#beee33',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
  },
  imageSize: {
    width: "150px",
    height: "150px"
  },
}));

export default function ProfileView(props) {
  const classes = useStyles();

  const { username } = props.match.params;

  const [open, setOpen] = React.useState('LOADING');
  const [user, setUser] = React.useState({});
  
  if(open===LOADING) {
    userService.getAll()
      .then(users => {
        let value = users.find((el)=>el.username===username);
        if(value) {
          setUser(value);
          setOpen(USER_FOUND);
        } else {
          setOpen(USER_NOT_FOUND);
          alert(username + ' username not found')
        }
      })
      .catch(()=>{ setOpen(INTERNAL_ERROR); })
  }


  const userFound = <Container>
                      <Grid container
                        direction="row"
                        justify="flex-start"
                        alignItems="center" 
                        >
                      <Button className={classes.imageBorder} onClick={()=>{}} >
                        {(user.image) ? <img src={user.image} className={classes.imageSize} alt="Profie" /> : <AccountCircleIcon className={classes.imageSize} />}
                      </Button>
                      <Grid style={{ margin: '10px'}}>
                        {user.firstName + ' ' + user.lastName}
                      </Grid>
                    </Grid>
  <RoutesTable user={user} /></Container>
  ;

  let body;
  
  switch(open) {
    case LOADING:
      body = <Loading />;
      break;
    case USER_FOUND:
       body = userFound;
      break;
    case USER_NOT_FOUND:
       body = <Grid container direction="row" justify="center" alignItems="center">
                User Not Found
              </Grid>;
      break;
    case INTERNAL_ERROR:
       body = <Grid container direction="row" justify="center" alignItems="center">
                Internal Error
              </Grid>;
      break;
    default:
       body =  <Grid container direction="row" justify="center" alignItems="center">
                Unknown Error
              </Grid>;
  };

  return (
      <React.Fragment>
        <NavBarComponent />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop:'70px', flex: 1}}
          >
            {body}
        </Grid>
      </React.Fragment>
      );
}