import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AzureAD, withAuthentication } from 'react-aad-msal';

import AdminHeader from '../components/AdminHeader';
import CustomTable from '../components/CustomTable';
import CustomButton from '../components/CustomButton';
import { ExportToCsv } from 'export-to-csv';
import { authProvider, authorizedFetch } from '../auth/authProvider';
import store from '../redux/store';

function AdminVolunteerDataPage({ setCurrentPage }) {
	const [volunteerData, setVolunteerData] = useState(['']);

	const [adminHistory, setAdminHistory] = useState({
		lastClearedTime: null,
		lastExportedTime: null,
	});
	
	const volunteersPath = '/api/volunteers';
	const volunteerExportHistoryPath = '/api/history';

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

			await authorizedFetch(volunteerExportHistoryPath, 'PUT', {
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
			const volunteers = await authorizedFetch(volunteersPath, 'GET');
			setVolunteerData(volunteers);
		} catch (error) {
			console.log('Error fetching volunteers: ' + error);
		}
	}

	async function clearData() {
		try {
			const response = await authorizedFetch(volunteersPath, 'PUT');
			console.log(response);
			if (response.status === 200) {
				await authorizedFetch(volunteerExportHistoryPath, 'PUT', {
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
			const response = await authorizedFetch(volunteerExportHistoryPath + '?tableName=volunteer', 'GET');

			const adminHistory = {
				lastClearedTime: new Date(response.lastClearedTime).toDateString(),
				lastExportedTime: new Date(response.lastClearedTime).toDateString()
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
