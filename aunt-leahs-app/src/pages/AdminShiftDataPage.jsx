import React, { useEffect, useState } from 'react';

import AdminHeader from '../components/AdminHeader';
import CustomTable from '../components/CustomTable';
import CustomButton from '../components/CustomButton';

const AdminShiftDataPage = () => {
	const [shifts, setShifts] = useState([]);

	useEffect(() => {
		getShifts();
	}, []);

	async function getShifts() {
		try {
			const response = await fetch('http://localhost:7071/api/Shifts', {
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
			let response = await fetch('http://localhost:7071/api/Shifts', {
				method: 'PUT'
			});

			response = await response.json();

			console.log(response.message);

			await getShifts();
		}
		catch (error) {
			console.log("Error clearing shift data " + error);
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
						<p>Last cleared: Never</p>
						<p>Last exported: Never</p>
					</div>
					<div className="volunteer-data-buttons">
						<div className="export-btn">
							<CustomButton size={'small'} color={'primary'} >
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

export default AdminShiftDataPage;