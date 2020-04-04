import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AzureAD, withAuthentication } from 'react-aad-msal';

import AdminHeader from '../components/AdminHeader';
import CustomTable from '../components/CustomTable';
import CustomButton from '../components/CustomButton';
import { ExportToCsv } from 'export-to-csv';
import { authProvider, authorizedFetch } from '../auth/authProvider';
import store from '../redux/store';
import { volunteerAPIBaseURL } from '../constants';

function AdminVolunteerDataPage({ setCurrentPage }) {
	const [volunteerData, setVolunteerData] = useState(['']);

	const [adminHistory, setAdminHistory] = useState({
		lastClearedTime: null,
		lastExportedTime: null,
	});
	
	const volunteersEndpointPath = '/api/volunteers';
	const volunteerExportHistoryEndpoint = volunteerAPIBaseURL + '/api/history';

	useEffect(() => {
		getVolunteers();
		getAdminHistory();
	}, []);

	const options = {
		fieldSeparator: ',',
		filename: 'Volunteer Data',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		showTitle: false,
		title: 'Volunteer Data',
		useTextFile: false,
		useBom: true,
		useKeysAsHeaders: true,
		// headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
	};
	const csvExporter = new ExportToCsv(options);

	const exportData = async () => {
		try {
			csvExporter.generateCsv(volunteerData);

			await axios.put(volunteerExportHistoryEndpoint, {
				isExportAction: 0,
				tableName: 'volunteer',
				editTime: moment()
			});

			await getAdminHistory();
		} catch (error) {
			console.log('Error exporting volunteers data ' + error);
		}
	};

	async function getVolunteers() {
		try {
			const volunteers = await authorizedFetch(volunteersEndpointPath, 'GET');
			setVolunteerData(volunteers);
		} catch (error) {
			console.log('Error fetching volunteers: ' + error);
		}
	}

	async function clearData() {
		try {
			const response = await authorizedFetch(volunteersEndpointPath, 'PUT');

			if (response.status === 200) {
				await axios.put(volunteerExportHistoryEndpoint, {
					isExportAction: 0,
					tableName: 'volunteer',
					editTime: moment()
				});
			}

			await getVolunteers();
		} catch (error) {
			console.log('Error clearing volunteer data ' + error);
		}
	}

	async function getAdminHistory() {
		try {
			const response = await axios.get(
				volunteerExportHistoryEndpoint + '?tableName=volunteer'
			);
			const adminHistory = {
				lastClearedTime: new Date(response.data.lastClearedTime).toDateString(),
				lastExportedTime: new Date(
					response.data.lastClearedTime
				).toDateString(),
			};
			setAdminHistory(adminHistory);
		} catch (error) {
			console.log('Error fetching admin history data: ' + error);
		}
	}

	return (
		<AzureAD provider={authProvider} reduxStore={store} forceLogin={true}>
			<div>
				<AdminHeader />
				<div>
					<div className='volunteer-data-table-body'>
						<CustomTable data={volunteerData} />
					</div>
					<div className='volunteer-data-bottom'>
						<div className='lastModified'>
							<p>Last cleared: {adminHistory.lastClearedTime || 'Never'}</p>
							<p>Last exported: {adminHistory.lastExportedTime || 'Never'}</p>
						</div>
						<div className='volunteer-data-buttons'>
							<div className='export-btn'>
								<CustomButton
									size={'small'}
									color={'primary'}
									onClick={exportData}>
									Export Data
								</CustomButton>
							</div>
							<div className='clearBtn'>
								<CustomButton
									size={'small'}
									color={'secondary'}
									onClick={clearData}>
									Clear Data
								</CustomButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AzureAD>
	);
}

export default withAuthentication(AdminVolunteerDataPage, {
	provider: authProvider,
	reduxStore: store,
	forceLogin: true,
});
