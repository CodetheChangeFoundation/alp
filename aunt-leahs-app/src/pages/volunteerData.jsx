import React, { Component } from 'react';

import Head from '../components/header/header';
import CustomButton from '../components/customButton/customButton';
import '../styles.css';

// const exportData = (data) => {
// 	alert('Exporting data...');
// };

// const clearData = (data) => {
// 	alert('Clearing data...');
// };

// export default function VolunteerData() {
// 	var volunteerDataLastModified = {
// 		clear: '11/13/2019',
// 		export: null
// 	};

// 	return (
// 		<div className="volunteerData">
// 			<div className="volunteerDataHeader">
// 				<div className="Head">
// 					<Head className="volunteerDataHead" />
// 				</div>
// 				<div className="volunteerDataTab" />
// 			</div>
// 			<div className="volunteerDataTable">
// 				<div className="volunteerDataTableBody" />
// 				<div className="lastModified">
// 					<p>Last cleared: {volunteerDataLastModified.clear ? volunteerDataLastModified.clear : 'Never'}</p>
// 					<p>Last exported: {volunteerDataLastModified.export ? volunteerDataLastModified.export : 'Never'}</p>
// 				</div>
// 				<div className="volunteerDataButtons">
// 					<div className="exportBtn">
// 						<CustomButton size={'small'} color={'primary'} onClick={exportData}>
// 							Export Data
// 						</CustomButton>
// 					</div>
// 					<div className="clearBtn">
// 						<CustomButton size={'small'} color={'secondary'} onClick={clearData}>
// 							Clear Data
// 						</CustomButton>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

export default class volunteerData extends Component {
	constructor(props) {
		super(props);
		// this.exportData = exportData.bind(this);
		// this.clearData = clearData.bind(this);
		this.volunteerDataLastModified = {
			clear: '11/13/2019',
			export: null
		};
		this.state = {};
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
						<p>Last cleared: {this.volunteerDataLastModified.clear ? this.volunteerDataLastModified.clear : 'Never'}</p>
						<p>
							Last exported: {this.volunteerDataLastModified.export ? this.volunteerDataLastModified.export : 'Never'}
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
