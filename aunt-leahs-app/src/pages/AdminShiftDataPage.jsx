import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withAuthentication } from 'react-aad-msal';

import AdminHeader from '../components/AdminHeader';
import CustomTable from '../components/CustomTable';
import CustomButton from '../components/CustomButton';

import { authProvider } from '../auth/authProvider';
import store from '../redux/store';

const AdminShiftDataPage = () => {
	const [shifts, setShifts] = useState([]);
	const [adminHistory, setAdminHistory] = useState({
		lastClearedTime: null,
		lastExportedTime: null
	});

	useEffect(() => {
		getShifts();
		getAdminHistory();
	}, []);

	async function getShifts() {
		try {
			const response = await fetch('http://localhost:7071/api/shifts', {
				method: 'GET'
			});

			const shifts = await response.json();

			const shiftData = shifts.map(shift => {
				const date = new Date(shift.startTime);
				// The format of the date and time can be adjusted to the customer's needs
				return ({
					id: shift.id,
					firstName: shift.firstName,
					lastName: shift.lastName,
					date: date.toDateString(),
					time: date.toTimeString(),
					duration: shift.duration
				});
			});

			setShifts(shiftData);
		}
		catch (error) {
			console.log("Error fetching shift data: " + error);
		}
	}

	async function clearShifts() {
		try {
			const response = await fetch('http://localhost:7071/api/shifts', {
				method: 'PUT'
			});

			if (response.status === 200) {
				await axios.put('http://localhost:7071/api/history', {
					isExportAction: 0,
					tableName: 'shift',
					editTime: moment()
				})
			}

			await getShifts();
		}
		catch (error) {
			console.log("Error clearing shift data " + error);
		}
	}


	async function exportShifts() {
		try {
			await axios.put('http://localhost:7071/api/history', {
				isExportAction: 1,
				tableName: 'shift',
				editTime: moment()
			})

			await getAdminHistory();

		}
		catch (error) {
			console.log("Error exporting shift data " + error);
		}
	}


	async function getAdminHistory() {
		try {
			const response = await axios.get('http://localhost:7071/api/history?tableName=shift');
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
		<div>
			<AdminHeader />
			<div>
				<div className="volunteer-data-table-body">
					<CustomTable data={shifts} />
				</div>
				<div className='volunteer-data-bottom'>
					<div className="lastModified">
						<p>Last cleared: {adminHistory ? adminHistory.lastClearedTime : 'Never'}</p>
						<p>Last exported: {adminHistory ? adminHistory.lastExportedTime : 'Never'}</p>
					</div>
					<div className="volunteer-data-buttons">
						<div className="export-btn">
							<CustomButton size={'small'} color={'primary'} onClick={exportShifts}>
								Export Data
							</CustomButton>
						</div>
						<div className="clearBtn">
							<CustomButton size={'small'} color={'secondary'} onClick={clearShifts}>
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
