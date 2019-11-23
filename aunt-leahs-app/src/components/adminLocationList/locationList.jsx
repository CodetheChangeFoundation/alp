import React from 'react';
import { List, Fab } from '@material-ui/core';
import { LocationListItem } from './locationListItem.jsx';
import AddIcon from '@material-ui/icons/Add';
import CustomButton from '../customButton/customButton'

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
        this.addNewLocation = this.addNewLocation.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);
    }

    saveLocation(id, newName) {

        var updatedLocations = this.state.locations.slice(0);
        updatedLocations.find(l => l.id === id).name = newName;
        this.setState({ locations: updatedLocations });
    }

    deleteLocation(id) {
        var newLocations = this.state.locations.slice(0);
        var indexToDelete = newLocations.findIndex(l => { return l.id === id; });
        newLocations.splice(indexToDelete, 1);
        this.setState({ locations: newLocations });
    }

    addNewLocation() {
        var newLocations = this.state.locations.slice(0);
        newLocations.push({name: "", address: ""});
        this.setState({ locations: newLocations });
    }

    render() {
        return <React.Fragment>
            <div>
                <List dense={false}>
                    {this.state.locations.map(location =>
                        <React.Fragment>
                            <LocationListItem location={location} key={location.id} onEdit={this.saveLocation} onDelete={this.deleteLocation} />
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
            <div style={{paddingTop:"2em"}}>
                <CustomButton size='small' color='primary'>Save</CustomButton>
            </div>
        </React.Fragment>;
    }
}
