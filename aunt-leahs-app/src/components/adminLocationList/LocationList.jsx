import React from 'react';
import { List, Fab } from '@material-ui/core';
import { LocationListItem } from './LocationListItem.jsx';
import AddIcon from '@material-ui/icons/Add';
import CustomButton from '../CustomButton';

export class LocationList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: [],
			newLocations: [],
			nextId: 0
		};
		// this.getLocations();
		this.save = this.save.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
		this.updateNewLocation = this.updateNewLocation.bind(this);
		this.addNewLocation = this.addNewLocation.bind(this);
		this.deleteLocation = this.deleteLocation.bind(this);
		this.deleteNewLocation = this.deleteNewLocation.bind(this);
	}

	save() {
		if (this.allHaveName(this.state.locations) && this.allHaveName(this.state.newLocations)) {
			//save this.state.locations to db
			//insert this.state.newLocations
		} else {
			alert('All locations require a name!');
		}
	}

	allHaveName(locations) {
		return locations.every((location) => location.name != null && location.name.length > 0);
	}

	updateLocation(id, newName) {
		const updatedLocations = this.state.locations.slice(0);
		const locationToUpdate = updatedLocations.find((location) => location.id === id);
		locationToUpdate.name = newName;
		this.setState({ locations: updatedLocations });
	}

	updateNewLocation(id, newName) {
		const updatedLocations = this.state.newLocations.slice(0);
		const locationToUpdate = updatedLocations.find((location) => location.id === id);
		locationToUpdate.name = newName;
		this.setState({ newLocations: updatedLocations });
	}

	deleteLocation(id) {
		const newLocations = this.state.locations.slice(0);
		const indexToDelete = newLocations.findIndex((location) => {
			return location.id === id;
		});
		newLocations.splice(indexToDelete, 1);
		this.setState({ locations: newLocations });
	}

	deleteNewLocation(id) {
		const newLocations = this.state.newLocations.slice(0);
		const indexToDelete = newLocations.findIndex((location) => {
			return location.id === id;
		});
		newLocations.splice(indexToDelete, 1);
		this.setState({ newLocations: newLocations });
	}

	addNewLocation() {
		const newLocations = this.state.newLocations.slice(0);
		newLocations.push({ name: '', address: '', id: this.state.nextId });
		this.setState({ newLocations: newLocations, nextId: this.state.nextId + 1 });
	}

	async getLocations() {
		try {
			console.log('fetch request');
			const response = await fetch('http://localhost:7071/api/location');
			console.log(response);
			console.log('line 79');
			let locations = await response.json();
			console.log('line 81');
			console.log(locations);
			let locationObjs = locations.map((loc) => ({
				name: loc.name,
				address: loc.address,
				id: this.state.nextId + 1
			}));
			this.setState({ locations: locationObjs, nextId: locationObjs.length });
		} catch (error) {
			console.log('Error fetching location names: ' + error);
		}
	}

	componentDidMount() {
		// get data
		console.log('component did mount');
		this.getLocations();
	}

	render() {
		// this.getLocations();
		return (
			<React.Fragment>
				<div>
					<List dense={false} className="top-list">
						{this.state.locations.map((location) => (
							<LocationListItem
								location={location}
								key={location.id}
								onEdit={this.updateLocation}
								onDelete={this.deleteLocation}
							/>
						))}
					</List>
					<List dense={false} className="bottom-list">
						{this.state.newLocations.map((location) => (
							<LocationListItem
								location={location}
								key={location.id}
								onEdit={this.updateNewLocation}
								onDelete={this.deleteNewLocation}
							/>
						))}
					</List>
					<br />
					<Fab style={{ margin: 'auto' }} color="primary" aria-label="add" onClick={this.addNewLocation}>
						<AddIcon />
					</Fab>
				</div>
				<br />
				<br />
				<div>
					<CustomButton size="small" color="primary" onClick={this.save}>
						Save
					</CustomButton>
				</div>
			</React.Fragment>
		);
	}
}
