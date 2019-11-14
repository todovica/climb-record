import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

export default function Copyright(props) {
  const classes = (makeStyles(theme => ({
    root: {
      position: props.position,
      marginTop: '40px',
      padding: '10px',
      left: "0",
      right: "0",
      bottom: "0"
    },
  })))();

  return (
    <Typography className={classes.root} variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://todovica.github.io/">
        Ana Todovic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};