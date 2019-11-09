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
	return (
		<div className="volunteerData">
			<Head className="volunteerDataHeader" />
			<div className="volunteerDataTable">
				<CustomButton size={'small'} color={'primary'} onClick={exportData}>
					Export Data
				</CustomButton>
				<CustomButton size={'small'} color={'secondary'} onClick={clearData}>
					Clear Data
				</CustomButton>
			</div>
		</div>
	);
}
