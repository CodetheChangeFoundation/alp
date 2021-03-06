import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { withAuthentication } from 'react-aad-msal';

import AdminHeader from '../components/AdminHeader';
import CustomTable from '../components/CustomTable';
import CustomButton from '../components/CustomButton';
import { ExportToCsv } from 'export-to-csv';

import { authProvider, authorizedFetch } from '../auth/authProvider';
import store from '../redux/store';

const AdminShiftDataPage = () => {
	const [shifts, setShifts] = useState([]);
	const [adminHistory, setAdminHistory] = useState({
		lastClearedTime: null,
		lastExportedTime: null
	});
	const shiftsPath = '/api/Shifts';
	const volunteerExportHistoryPath = '/api/history';

	useEffect(() => {
		getShifts();
		getAdminHistory();
	}, []);

	const options = {
		fieldSeparator: ',',
		filename: 'Shift Data',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		showTitle: false,
		title: 'Shift Data',
		useTextFile: false,
		useBom: true,
		useKeysAsHeaders: true
		// headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
	};

	const csvExporter = new ExportToCsv(options);


	async function getShifts() {
		try {
			const shifts = await authorizedFetch(shiftsPath, 'GET');

			const shiftData = shifts.map(shift => {
				const date = new Date(shift.startTime);
				// The format of the date and time can be adjusted to the customer's needs
				return {
					id: shift.id,
					firstName: shift.firstName,
					lastName: shift.lastName,
					date: date.toDateString(),
					time: date.toTimeString(),
					duration: shift.duration
				};
			});

			setShifts(shiftData);
		} catch (error) {
			console.log("Error fetching shift data: " + error);
		}
	}

	async function clearData() {
		try {
			const response = await authorizedFetch(shiftsPath, 'PUT');
			if (response.status === 200) {
				await authorizedFetch(volunteerExportHistoryPath, 'PUT', {
					isExportAction: 0,
					tableName: 'shift',
					editTime: moment()
				});
			}

			await getShifts();
		} catch (error) {
			console.log("Error clearing shift data " + error);
		}
	}
	async function exportData() {
		try {
			csvExporter.generateCsv(shifts);

			await authorizedFetch(volunteerExportHistoryPath, 'PUT', {
				isExportAction: 1,
				tableName: 'shift',
				editTime: moment()
			});

			await getAdminHistory();

		}
		catch (error) {
			console.log("Error exporting shift data " + error);
		}
	}


	async function getAdminHistory() {
		try {
			const response = await authorizedFetch('/api/history?tableName=shift');
			const adminHistory = {
				lastClearedTime: new Date(response.lastClearedTime).toDateString(),
				lastExportedTime: new Date(response.lastClearedTime).toDateString()
			}
			setAdminHistory(adminHistory);
		}
		catch (error) {
			console.log("Error fetching admin history data: " + error);
		}
	}

	return (
		<div>
			<AdminHeader />
			<div>
				<div className="volunteer-data-table-body">
					<CustomTable data={shifts} />
				</div>
				<div className="volunteer-data-bottom">
					<div className="lastModified">
						<p>Last cleared: {adminHistory ? adminHistory.lastClearedTime : 'Never'}</p>
						<p>Last exported: {adminHistory ? adminHistory.lastExportedTime : 'Never'}</p>
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
		</div>
	);
};

export default withAuthentication(AdminShiftDataPage, {
	provider: authProvider,
	reduxStore: store,
	forceLogin: true
});
