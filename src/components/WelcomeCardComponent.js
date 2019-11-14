import React from 'react';
import { FaSpa } from "react-icons/fa";
import UploadAvatar from './UploadAvatar';
import Grid from '@material-ui/core/Grid';

class WelcomeCardComponent extends React.Component {

    render() {
        return (
            <Grid item sx={12} sm={12} md={3}>
                <UploadAvatar />
                  <h5 className="card-title">Hi {this.props.user.firstName}! <FaSpa /></h5>
                  <h6 className="card-subtitle mb-2 text-muted">Welcome to Climb Record App!!</h6>
                  <p className="card-text">This is a perfect place for you to keep track of climbing scores and get in touch with awesome people.</p>
                </Grid>
            );
        }
}

export default WelcomeCardComponent; 