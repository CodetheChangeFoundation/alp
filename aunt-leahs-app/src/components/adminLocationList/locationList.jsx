import React from 'react';
import { List, Fab } from '@material-ui/core';
import { LocationListItem } from './locationListItem.jsx';
import AddIcon from '@material-ui/icons/Add';
import CustomButton from '../customButton'

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
                }],
            newLocations: [],
            nextId: 0
        };

        this.save = this.save.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateNewLocation = this.updateNewLocation.bind(this);
        this.addNewLocation = this.addNewLocation.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);
        this.deleteNewLocation = this.deleteNewLocation.bind(this);
    }

    save() {
        if (this.hasName(this.state.locations) && this.hasName(this.state.newLocations)) {
            //save this.state.locations to db
            //insert this.state.newLocations
        }
        else {
            alert("All locations require a name!");
        }
    }

    hasName(locations) {
        return locations.every(location => location.name != null && location.name.length > 0);
    }

    updateLocation(id, newName) {
        let updatedLocations = this.state.locations.slice(0);
        updatedLocations.find(location => location.id === id).name = newName;
        this.setState({ locations: updatedLocations });
    }

    updateNewLocation(id, newName) {
        let updatedLocations = this.state.newLocations.slice(0);
        updatedLocations.find(location => location.id === id).name = newName;
        this.setState({ newLocations: updatedLocations });
    }

    deleteLocation(id) {
        let newLocations = this.state.locations.slice(0);
        let indexToDelete = newLocations.findIndex(location => { return location.id === id; });
        newLocations.splice(indexToDelete, 1);
        this.setState({ locations: newLocations });
    }

    deleteNewLocation(id) {
        let newLocations = this.state.newLocations.slice(0);
        let indexToDelete = newLocations.findIndex(location => { return location.id === id; });
        newLocations.splice(indexToDelete, 1);
        this.setState({ newLocations: newLocations });
    }

    addNewLocation() {
        let newLocations = this.state.newLocations.slice(0);
        newLocations.push({ name: "", address: "", id: this.state.nextId });
        this.setState({ newLocations: newLocations, nextId: this.state.nextId + 1 });
    }

    render() {
        return <React.Fragment>
            <div>
                <List dense={false} style={{ paddingBottom: 0 }}>
                    {this.state.locations.map(location =>
                        <React.Fragment>
                            <LocationListItem location={location} key={location.id} onEdit={this.updateLocation} onDelete={this.deleteLocation} />
                        </React.Fragment>
                    )}
                </List>
                <List dense={false} style={{ paddingTop: 0 }}>
                    {this.state.newLocations.map(location =>
                        <React.Fragment>
                            <LocationListItem location={location} key={location.id} onEdit={this.updateNewLocation} onDelete={this.deleteNewLocation} />
                        </React.Fragment>
                    )}
                </List>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={this.addNewLocation}>
                    <AddIcon />
                </Fab>
            </div>
            <div style={{ paddingTop: "2em" }}>
                <CustomButton size='small' color='primary' onClick={this.save}>Save</CustomButton>
            </div>
        </React.Fragment>;
    }
}
