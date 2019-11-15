import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
class UsersCardComponent extends React.Component {
    
  render() {
    const { users } = this.props;
      return (
        <Grid item sx={12} sm={4} md={2} style={{ minWidth: '18em' }}>
          <div className="card-body menu">
            <h5 className="card-subtitle mb-2 text-muted">Members</h5>
            {users.loading && <em>Loading users...</em>}
            {users.length &&
            <ul>
            {users.map((user, index) =>
              <Button key={index} fullWidth variant="outlined" color="primary"
                onClick={()=>{ this.props.history.push({ pathname: '/climb-record/id/'+user.username }) }} >
              <Grid container direction="row" justify="space-between" alignItems="center" >
                {(user.image) ? <img style={{ width: "2.4em"}} src={user.image} alt="Profie Photo" /> : <AccountCircleIcon fontSize="large" />}
                {user.firstName + ' ' + user.lastName}
              </Grid>
            </Button>
            )}
            </ul>}
            </div>
        </Grid>
        );
    }
}

export default withRouter(UsersCardComponent); 








