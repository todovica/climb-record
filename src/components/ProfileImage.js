import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles(theme => ({
    input: {
      display: 'none',
    }
  }));


export default function ProfileImage() {
  const classes = useStyles();
  
  function handleCapture(target) {
    const fileReader = new FileReader();
    //const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      // upload image to server
    };
  };
  
  return (
      <Fragment>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            onChange={handleCapture}
            type="file"
        />
        <label htmlFor="contained-button-file">
            <IconButton>
                <Avatar style={{ margin: "10px", width: "60px", height: "60px" }} >
                    <AccountCircleIcon />
                </Avatar> 
            </IconButton>
        </label>
        
        <input
            accept="image/*"
            className={classes.input}
            id="icon-button-photo"
            onChange={handleCapture}
            type="file"
        />
        <label htmlFor="icon-button-photo">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
        </label>

        </Fragment>
      );
}
