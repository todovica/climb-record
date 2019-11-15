import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { DialogTitle, DialogContent, DialogActions } from './DialogComponents';
import InputFieldComponent from './InputFieldComponent';

import { userService } from '../services';

function AddRuteComponent(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [open, setOpen] = React.useState(false);
  const [ruteName, setRuteName] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    if(name==='ruteName') {
      setRuteName(value);
    } else if(name==='comment') {
      setComment(value);
    } else if(name==='location') {
      setLocation(value);
    } else if(name==='grade') {
      setGrade(value);
    } else {
      console.log('error!!!!!!!!!');
    }
  }
  
  function submitNewRute(e) {
    setSubmitted(true);
    // stop here if form is invalid
    if (!(props.username && ruteName && comment && location && grade)) {
      console.log("form input is invalid");
      return;
    }
    userService.addRuteForUser(props.username, ruteName, comment, location, grade)
               .then(() => props.updateRoutesList());
    
    setOpen(false);
  }
  
  return (<div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Add new route
            </Button>
            <Dialog fullScreen={fullScreen} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add new route
              </DialogTitle>
              <DialogContent dividers >
              <form name="form" className="formmargin">
                <InputFieldComponent label={'Route Name'} htmlLabel={'ruteName'} filedInput={ruteName} submitted={submitted} handleChange={handleChange} />
                <div className="d-flex flex-wrap">
                  <InputFieldComponent label={'Location'} htmlLabel={'location'} filedInput={location} submitted={submitted} handleChange={handleChange} />
                  <div className="gradepicker">
                    <InputFieldComponent label={'Grade'} htmlLabel={'grade'} filedInput={grade} submitted={submitted} handleChange={handleChange} />
                  </div>
                </div>
                <InputFieldComponent label={'Comment'} htmlLabel={'comment'} filedInput={comment} submitted={submitted} handleChange={handleChange} />
                {/*error && <div className={'alert alert-danger'}>{error}</div> */}
              </form>
              </DialogContent>
              <DialogActions>
                <Button autoFocus variant="contained" color="primary" onClick={submitNewRute}>
                  Save changes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
}

export default AddRuteComponent; 