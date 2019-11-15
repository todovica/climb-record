

import React from 'react';
import AddRuteComponent from './AddRuteComponent';
import RoutesTable from './RoutesTable';
import Loading from './Loading';

import { FaTrashAlt } from "react-icons/fa";
import { FaEdit, FaMapMarker, FaComment } from "react-icons/fa";
import Grid from '@material-ui/core/Grid';

import { userService } from '../services';

class RoutesCardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rutes: [],
            searchstr: '',
            reload: false
        };

        this.handleAddingRute = this.handleAddingRute.bind(this);
        this.updateRoutesList = this.updateRoutesList.bind(this);
    }

    componentDidMount() {
        userService.getRutesForUser().then((rutes) => this.setState({ rutes }));
    }


    handleAddingRute(e) {
        document.getElementById("addRouteOverlay").style.display = "block";
    }

    updateRoutesList(e) {
        this.setState({reload: true});
        userService.getRutesForUser()
            .then(rutes => this.setState({ rutes }))
            .then(() => this.setState({reload: false}));
    }

    render() {
        const { user } = this.props;
        const { reload } = this.state;

        if(reload) return <Loading />;

        return (
            <Grid item sx={12} style={{ flex: 1, minWidth: '18em', margin: '20px' }}>
                <AddRuteComponent username={user.username} updateRoutesList={this.updateRoutesList} /> 
                <RoutesTable user={user} reload={reload} />
                
                  
                </Grid>
            );
        }
}

export default RoutesCardComponent; 