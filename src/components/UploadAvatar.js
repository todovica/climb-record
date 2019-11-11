import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Avatar from 'react-avatar-edit'
import { userService } from '../services';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function UploadAvatar(props) {

  const { user } = props;
  const [open, setOpen] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [src, setSrc] = React.useState(null);

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

    let username= user.username;
    let image = preview;

    
    userService.uploadPhotoForUser(username, image)
            .then(() => setOpen(false))
            .catch((error) => {setOpen(false); alert(error);});

  };

  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen} >
        {(user.image) ? <img src={user.image} alt="Profie Photo" /> : <AccountCircleIcon style={{ width: "150px", height: "150px" }} />}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upload Image
        </DialogTitle>
        <DialogContent dividers>
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