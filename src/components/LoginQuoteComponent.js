import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import background from '../resources/background.png';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '500px'
    },
    space: {
      padding: theme.spacing(2),
    },
  }));


export default function LoginQuoteComponent() {
    const classes = useStyles();

    return (
            <Grid container className={classes.root} spacing={2} direction="column" justify="center" alignItems="center">
                <Typography className={classes.space} color='primary' component="h1" variant="h1">
                  Climb Record App
                </Typography>
                <Typography className={classes.space} color='primary' component="h1" variant="h5">
                  "It is not the mountain we conquer, but ourselves."
                  <footer className="blockquote-footer">Sir Edmund Hillary</footer>
                </Typography>
               
            </Grid>

        );

}
