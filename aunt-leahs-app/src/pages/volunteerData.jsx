import React, { Component } from 'react';

import Head from '../components/header/header';
import CustomButton from '../components/customButton/customButton';
import '../styles.css';

export default class volunteerData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			volunteerDataLastModified: {
				// Tentative default. Not sure of database schema yet.
				clear: '11/13/2019',
				export: null
			}
		};
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
					<div className="volunteerDataTab" />
				</div>
				<div className="volunteerDataTable">
					<div className="volunteerDataTableBody" />
					<div className="lastModified">
						<p>
							Last cleared:{' '}
							{this.state.volunteerDataLastModified.clear ? this.state.volunteerDataLastModified.clear : 'Never'}
						</p>
						<p>
							Last exported:{' '}
							{this.state.volunteerDataLastModified.export ? this.state.volunteerDataLastModified.export : 'Never'}
						</p>
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
