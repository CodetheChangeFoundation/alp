import React, { Component } from 'react';
import AdminHeader from '../components/AdminHeader';
import CustomTable from '../components/CustomTable';
import CustomButton from '../components/CustomButton';

import { constants } from '../constants';

export default class AdminShiftDataPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataLastModified: {
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
			<div>
				<AdminHeader />
				<div>
					<div className="volunteer-data-table-body">
						<CustomTable data={this.volunteerData} />
					</div>
					<div className='volunteer-data-bottom'>
						<div className="lastModified">
							<p>Last cleared: {this.state.dataLastModified.clear || 'Never'}</p>
							<p>Last exported: {this.state.dataLastModified.export || 'Never'}</p>
						</div>
						<div className="volunteer-data-buttons">
							<div className="export-btn">
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
			</div>
		);
	}
}
