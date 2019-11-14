import React from 'react';
import Head from '../components/header/header';
import CustomButton from '../components/customButton/customButton';
import '../styles.css';

const exportData = (data) => {
	alert('Exporting data...');
};

const clearData = (data) => {
	alert('Clearing data...');
};

export default function VolunteerData() {
	var volunteerDataLastModified = {
		clear: '11/13/2019',
		export: null
	};

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
					<p>Last cleared: {volunteerDataLastModified.clear ? volunteerDataLastModified.clear : 'Never'}</p>
					<p>Last exported: {volunteerDataLastModified.export ? volunteerDataLastModified.export : 'Never'}</p>
				</div>
				<div className="volunteerDataButtons">
					<div className="exportBtn">
						<CustomButton size={'small'} color={'primary'} onClick={exportData}>
							Export Data
						</CustomButton>
					</div>
					<div className="clearBtn">
						<CustomButton size={'small'} color={'secondary'} onClick={clearData}>
							Clear Data
						</CustomButton>
					</div>
				</div>
			</div>
		</div>
	);
}
