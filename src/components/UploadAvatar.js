import React from 'react';
import { connect } from "react-redux";
import { updateUser } from "../actions/index";
import { userService } from '../services';
import Avatar from 'react-avatar-edit'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions } from './DialogComponents';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


function mapStateToProps(state) {
  console.log(state)
  return {
    user: {
      username: state.user.username,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      image: state.user.image,
    }
  };
}

function UploadAvatar(props) {

  const { user } = props;
  const [open, setOpen] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [src, setSrc] = React.useState(null);

  if(!props.user.username){
    props.updateUser(JSON.parse(localStorage.getItem('user')));
    return <Grid container direction="row" justify="center" alignItems="center">
             <CircularProgress color="secondary" />
           </Grid>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  function onClose() {
    setPreview(null)
  }

  function onCrop(preview) {
    setPreview(preview)
  }

  function handleCapture() {

    let username= props.user.username;
    let image = preview;

    
    userService.uploadPhotoForUser(username, image)
            .then(() => {
              props.updateUser(JSON.parse(localStorage.getItem('user')));
              setOpen(false);
            })
            .catch((error) => {setOpen(false); alert(error);});

  };

  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen} style={{ marginBottom: '20px', border: '2px solid', borderRadius: '10em', borderColor: '#beee33', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'}}>
        {(user.image) ? <img src={user.image} alt="Profie" style={{ width: "150px", height: "150px" }} /> : <AccountCircleIcon style={{ width: "150px", height: "150px" }} />}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upload Image
        </DialogTitle>
        <DialogContent dividers >
          <Avatar 
          width={390}
          height={295}
          onCrop={onCrop}
          onClose={onClose}
          src={src}
          imageWidth={250}
        />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCapture} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(mapStateToProps, { updateUser } )(UploadAvatar);