import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

export default function Loading() {

  return (
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center">
            <CircularProgress />
    </Grid>
  );
}