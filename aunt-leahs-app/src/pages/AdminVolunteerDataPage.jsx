import React, { useState, useEffect } from 'react';
import { AzureAD } from 'react-aad-msal';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import moment from 'moment';

import AdminHeader from '../components/AdminHeader';
import CustomTable from '../components/CustomTable';
import CustomButton from '../components/CustomButton';
import { setCurrentPage } from '../redux/page/pageAction';

import { authProvider } from '../auth/authProvider';
import store from '../redux/store';

function AdminShiftDataPage({ setCurrentPage }) {

	const [dateLastModifiedClear, setDateLastModifiedClear] = useState('');
	const [dateLastModifiedExport, setDateLastModifiedExport] = useState('');
	const [volunteerData, setVolunteerData] = useState(['']); // useState(constants.volunteerData);
	//const volunteerData = constants.volunteerData;

	const [adminHistory, setAdminHistory] = useState({
		lastClearedTime: null,
		lastExportedTime: null
	});

	const exportData = (data) => {
		alert('Exporting data...');
	};

	const clearData = (data) => {
		alert('Clearing data...');
		clearVolunteers();
	};


	useEffect(() => {
		getVolunteers();
		getAdminHistory();
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

			if (response.status === 200) {
				await axios.put('http://localhost:7071/api/history', {
					isExportAction: 0,
					tableName: 'volunteer',
					editTime: moment()
				})
			}
		}
		catch (error) {
			console.log("Error clearing volunteers: " + error);
		}
	};

	async function exportShifts() {
		try {
			await axios.put('http://localhost:7071/api/history', {
				isExportAction: 0,
				tableName: 'volunteer',
				editTime: moment()
			})

			await getAdminHistory();

		}
		catch (error) {
			console.log("Error exporting volunteers data " + error);
		}
	}

	async function getAdminHistory() {
		try {
			const response = await axios.get('http://localhost:7071/api/history?tableName=volunteer');
			const adminHistory = {
				lastClearedTime: new Date(response.data.lastClearedTime).toDateString(),
				lastExportedTime: new Date(response.data.lastClearedTime).toDateString()
			}
			setAdminHistory(adminHistory);
		}
		catch (error) {
			console.log("Error fetching admin history data: " + error);
		}
	}

	return (
		<AzureAD provider={authProvider} reduxStore={store} forceLogin={true}>
			<div>
				<AdminHeader />
				<div>
					<div className="volunteer-data-table-body">
						<CustomTable data={volunteerData} />
					</div>
					<div className='volunteer-data-bottom'>
						<div className="lastModified">
							<p>Last cleared: {dateLastModifiedClear || 'Never'}</p>
							<p>Last exported: {dateLastModifiedExport || 'Never'}</p>
						</div>
						<div className="volunteer-data-buttons">
							<div className="export-btn">
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
		</AzureAD>
	);
};

const mapDispatchToProps = dispatch => ({
	setCurrentPage: page => dispatch(setCurrentPage(page))
});

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(AdminShiftDataPage);