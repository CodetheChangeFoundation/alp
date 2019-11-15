import React from 'react';
import List from '@material-ui/core/List';
import { LocationListItem } from './locationListItem.jsx'
import { Divider } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export class LocationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                    name: "Tree Lot",
                    id: 1,
                    address: "1234 East Mall"
                },
                {
                    name: "Thrift Store",
                    id: 2,
                    address: "1234 Robson St"
                },
                {
                    name: "Fundraising Event",
                    id: 3,
                    address: "1234 Wesbrook Mall"
                }]
        };

        this.saveLocation = this.saveLocation.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);
    }

    saveLocation(id, newName) {

        var updatedLocations = this.state.locations.slice(0);
        updatedLocations.find(l => l.id === id).name = newName;
        this.setState(updatedLocations);
    }

    deleteLocation(id) {
        var newLocations = this.state.locations.slice(0);
        var indexToDelete = newLocations.findIndex(l => { return l.id === id; });
        newLocations.splice(indexToDelete, 1);
        this.setState({ locations: newLocations });
    }

    render() {
        return <div>
            <List dense={false}>
                <Divider />
                {this.state.locations.map(location =>
                    <React.Fragment>
                        <LocationListItem location={location} key={location.id} onEdit={this.saveLocation} onDelete={this.deleteLocation} />
                        <Divider />
                    </React.Fragment>
                )}
            </List>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>;
    }
}
