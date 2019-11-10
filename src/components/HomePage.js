import React from 'react';
import NavBarComponent from './NavBarComponent';
import WelcomeCardComponent from './WelcomeCardComponent';
import UsersCardComponent from './UsersCardComponent';
import RoutesCardComponent from './RoutesCardComponent';

import { userService } from '../services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: [],
            rutes: [],
            submitted: false,
            ruteName: '',
            comment: '',
            location: '',
            grade: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { user, users, rutes, ruteName, comment, submitted, location, grade } = this.state;
        return (
            <React.Fragment>
                <NavBarComponent />
                <div className="row home">
                    <WelcomeCardComponent user={user} />
                    <RoutesCardComponent
                            user={user}
                            users={users}
                            ruteName={ruteName}
                            comment={comment}
                            location={location}
                            grade={grade}
                            submitted={submitted}
                        />
                    <UsersCardComponent users={users} />
                </div>
            </React.Fragment>
        );
    }
}

export default HomePage;