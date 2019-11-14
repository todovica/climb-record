import React from 'react';
import ProfileView from './ProfileView';
import Grid from '@material-ui/core/Grid';

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
              <ProfileView user={user} key={index} />
            )}
            </ul>}
            </div>
        </Grid>
        );
    }
}

export default UsersCardComponent; 








