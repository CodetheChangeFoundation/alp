import React from 'react';
import { List, Fab } from '@material-ui/core';
import { LocationListItem } from './LocationListItem';
import AddIcon from '@material-ui/icons/Add';
import CustomButton from '../CustomButton';
import { authorizedFetch } from '../../auth/authProvider';
import { volunteerAPIBaseURL } from '../../constants';

export class LocationList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: [],
			newLocations: [],
			updatedLocations: [],
			// deletedLocations: [],
			nextId: 1
		};
		this.save = this.save.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
		this.updateNewLocation = this.updateNewLocation.bind(this);
		this.addNewLocation = this.addNewLocation.bind(this);
		this.deleteLocation = this.deleteLocation.bind(this);
		this.deleteNewLocation = this.deleteNewLocation.bind(this);
	}

	async save() {
		const locationPath = '/api/location';
		
		if (this.allHaveName(this.state.locations) && this.allHaveName(this.state.newLocations)) {
			//save this.state.locations to db
			//insert this.state.newLocations
			if (this.state.newLocations.length !== 0) {
				const result = await authorizedFetch(locationPath, 'POST', {
						locations: this.state.newLocations
					});

				this.setState({ locations: [ ...this.state.locations, ...this.state.newLocations ] });
				this.setState({ newLocations: [] });
			}

			if (this.state.updatedLocations.length !== 0) {
				for (let location of this.state.updatedLocations) {
					const result = await authorizedFetch(locationPath, 'PUT',{
						updatedLocation: location
					});

				this.setState({ locations: [ ...this.state.locations, ...this.state.newLocations ] });
				this.setState({ newLocations: [] });
				}
			}
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
		if (!this.isLocationIdInArray(this.state.updatedLocations, locationToUpdate))
			this.state.updatedLocations.push(locationToUpdate);
	}

	isLocationIdInArray(locations, location) {
		let ret = false;
		for (let loc of locations) if (loc.id === location.id) ret = true;
		return ret;
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
		let deletedLocation = newLocations.splice(indexToDelete, 1)[0];
		deletedLocation.isDeleted = true;
		if (!this.isLocationIdInArray(this.state.updatedLocations, deletedLocation))
			this.state.updatedLocations.push(deletedLocation);
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
		// const headers = new Headers();
		// headers.append('Access-Control-Allow-Origin', 'https://login.microsoftonline.com/');
		// const options = {
		// 	headers: headers
		// }
		const response = await fetch(volunteerAPIBaseURL + '/api/location');//, options);
		let locations = await response.json();
		let locationObjs = locations.map((location) => {
			return {
				name: location.name,
				id: location.id,
				isDeleted: location.isDeleted
			};
		});
		this.setState({ locations: locationObjs });
	}

	componentDidMount() {
		this.getLocations();
	}

	render() {
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
						{this.state.newLocations.map(
							(location) =>
								!location.isDeleted && (
									<LocationListItem
										location={location}
										key={location.id}
										onEdit={this.updateNewLocation}
										onDelete={this.deleteNewLocation}
									/>
								)
						)}
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
