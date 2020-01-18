import React, { Component } from 'react';

import Head from '../components/header/header';
import CustomButton from '../components/customButton/customButton';
import '../styles.css';
import TableComponent from '../components/TableComponent';
import constants from '../constants';
import TabComponent from '../components/tab';

export default class VolunteerData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			volunteerDataLastModified: {
				// Tentative default. Not sure of database schema yet.
				clear: '11/13/2019',
				export: null
			}
		};
		this.volunteerData = constants.volunteerData;
	}

	exportData = (data) => {
		alert('Exporting data...');
	};

	clearData = (data) => {
		alert('Clearing data...');
	};

	render() {
		return (
			<div className="volunteerData">
				<div className="volunteerDataHeader">
					<div className="Head">
						<Head className="volunteerDataHead" />
					</div>
					<div className="volunteerDataTab">
						<TabComponent
							tabs={[
								{ title: 'Shift Data', content: '' },
								{ title: 'Volunteer Data', content: '' },
								{ title: 'Locations', content: '' },
								{ title: 'Sign Out', content: '' }
							]}
						/>
					</div>
				</div>
				<div className="volunteerDataTable">
					<div className="volunteerDataTableBody">
						<TableComponent data={this.volunteerData} />
					</div>
					<div className="lastModified">
						<p>Last cleared: {this.state.volunteerDataLastModified.clear || 'Never'}</p>
						<p>Last exported: {this.state.volunteerDataLastModified.export || 'Never'}</p>
					</div>
					<div className="volunteerDataButtons">
						<div className="exportBtn">
							<CustomButton size={'small'} color={'primary'} onClick={this.exportData}>
								Export Data
							</CustomButton>
						</div>
						<div className="clearBtn">
							<CustomButton size={'small'} color={'secondary'} onClick={this.clearData}>
								Clear Data
							</CustomButton>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
