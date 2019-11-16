import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import { userService } from '../services';
import Loading from './Loading';

import { LOADING, ROUTES_FOUND, INTERNAL_ERROR } from '../constants/loading';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  border: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',

  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function RoutesTable(props) {
  const classes = useStyles();

  const { user } = props;

  const [routes, setRoutes] = React.useState([]);
  const [searchstr, setSearchstr] = React.useState([]);
  const [open, setOpen] = React.useState('LOADING');

  if (open === LOADING || props.reload === true) {
    userService.getRutesForUser()
      .then(routes => {
        setRoutes(routes);
        setOpen(ROUTES_FOUND);
      })
      .catch(() => { setOpen('INTERNAL_ERROR'); })
  }

  function handleChange(e) {
    setSearchstr(e.target.value);
  }

  /*
  submitDeletionOfRoute(username, ruteName, comment, location, grade) {
    this.setState({reload: true});
    console.log('delete'  + ' ' + username + ' ' + ruteName + ' ' +  comment + ' ' +  location + ' ' +  grade);
    userService.deleteRuteForUser(username, ruteName, comment, location, grade)
        .then(rutes => this.setState({ rutes }))
        .then(() => this.setState({reload: false}));
  }*/

  const routesFound = <Grid item sx={12} style={{ flex: 1, minWidth: '15em' }}>

    <div className="searchbutton mb-4">
      <input className="form-control" type="text" value={searchstr} onChange={handleChange} name="searchstr" placeholder="Search" aria-label="Search" />
    </div>
    {routes.map((routes, index) => {
      if (routes.username === user.username && (searchstr.length === 0 || routes.ruteName.search(searchstr) > -1)) {
        return <ExpansionPanel key={index} className={classes.border}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>{routes.ruteName}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{routes.grade}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{routes.comment}</Typography>
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                {routes.location}
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Fab size="small" aria-label="scroll back to top" className={classes.border} onClick={props.submitDeletionOfRoute}>
              <DeleteOutlineIcon color="primary" />
            </Fab>
            <Fab size="small" aria-label="scroll back to top" className={classes.border}>
              <EditIcon color="primary" />
            </Fab>
            <Fab size="small" aria-label="scroll back to top" className={classes.border}>
              <FavoriteIcon color="primary" />
            </Fab>
          </ExpansionPanelActions>
        </ExpansionPanel>
      }
      else {
        return null;
      }

    })}</Grid>;

  let body;

  switch (open) {
    case LOADING:
      body = <Loading />;
      break;
    case ROUTES_FOUND:
      body = routesFound;
      break;
    case INTERNAL_ERROR:
      body = <Grid container direction="row" justify="center" alignItems="center">
        Internal Error
              </Grid>;
      break;
    default:
      body = <Grid container direction="row" justify="center" alignItems="center">
        Unknown Error
              </Grid>;
  };

  return (
    <div className={classes.root}>
      {body}

    </div>
  );
}