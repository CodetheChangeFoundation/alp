import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AdminHeader from '../components/AdminHeader';
import CustomTable from '../components/CustomTable';
import CustomButton from '../components/CustomButton';
import { setCurrentPage } from '../redux/page/pageAction';

import { constants } from '../constants';

function AdminShiftDataPage({ setCurrentPage }) {

	const [dateLastModifiedClear, setDateLastModifiedClear] = useState('');
	const [dateLastModifiedExport, setDateLastModifiedExport] = useState('');
	const [volunteerData, setVolunteerData] = useState(['']); // useState(constants.volunteerData);
	//const volunteerData = constants.volunteerData;

	const exportData = (data) => {
		alert('Exporting data...');
	};

	const clearData = (data) => {
		alert('Clearing data...');
		clearVolunteers();
	};

	
	useEffect(() => {
		getVolunteers();
	}, []);
	

	async function getVolunteers() {
		try {
			const response = await fetch('http://localhost:7071/api/volunteers', {
				method: 'GET',
				//headers: {'Content-Type':'application/json'},
				credentials: 'same-origin',  
			});
			const volunteers = await response.json();
			setVolunteerData(volunteers);
		}
		catch (error) {
			console.log("Error fetching volunteers: " + error);
		}
	};

	async function clearVolunteers() {
		try {
			const response = await fetch('http://localhost:7071/api/DeleteVolunteersTrigger');
			const reply = await response.json();
			console.log(reply);
		}
		catch (error) {
			console.log("Error clearing volunteers: " + error);
		}
	};

	return (
			<div>
				<AdminHeader />
				<div>
					<div className="volunteer-data-table-body">
						<CustomTable data={ volunteerData } />
					</div>
					<div className='volunteer-data-bottom'>
						<div className="lastModified">
							<p>Last cleared: { dateLastModifiedClear || 'Never'}</p>
							<p>Last exported: { dateLastModifiedExport || 'Never'}</p>
						</div>
						<div className="volunteer-data-buttons">
							<div className="export-btn">
								<CustomButton size={'small'} color={'primary'} onClick={ exportData }>
									Export Data
							</CustomButton>
							</div>
							<div className="clearBtn">
								<CustomButton size={'small'} color={'secondary'} onClick={ clearData }>
									Clear Data
							</CustomButton>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};

const mapDispatchToProps = dispatch => ({
	setCurrentPage: page => dispatch(setCurrentPage(page))
});

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(AdminShiftDataPage);