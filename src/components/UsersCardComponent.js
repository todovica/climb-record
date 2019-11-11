import React from 'react';

import { userService } from '../services';
import ProfileView from './ProfileView';

class UsersCardComponent extends React.Component {
    
  render() {
    const { users } = this.props;
      return (
        <div className="col-12 col-sm-3">
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
        </div>
        );
    }
}

export default UsersCardComponent; 








