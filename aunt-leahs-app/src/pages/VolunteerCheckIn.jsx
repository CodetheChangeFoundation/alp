import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import TextField from '@material-ui/core/TextField';

import SelectBox from '../components/selectBox'
import CustomButton from '../components/customButton'
import Head from '../components/header'

import { setExistingVolunteer } from '../redux/volunteer/volunteerAction';
import { setCurrentPage } from '../redux/page/pageAction';


function VolunteerLoginPage({ history, setExistingVolunteer, setCurrentPage }) {
	const durations = [
		{ value: { duration: '1 hour' }, id: 1 },
		{ value: { duration: '2 hours' }, id: 2 },
		{ value: { duration: '3 hours' }, id: 3 }
	];

	let selectedVolunteer = null;
	let selectedDurration = null;
	function selectDurration(durration) {
		selectedDurration = durration
	}

	const setVolunteerIfSelected = () => {
		if (selectedVolunteer) {
			setExistingVolunteer({
				firstName: selectedVolunteer.firstName,
				lastName: selectedVolunteer.lastName
			});
		}
		else {
			alert('You have not selected any volunteers!');
		}
	}
	const moment = require('moment');
	let now = moment();

	return (
		<div className="App">
			<Head page="Check In" />
			<div>
				<TextField
					id="textField_date"
					label="Date"
					defaultValue={now.format("dddd, MMMM Do YYYY").toString()}
					margin="normal"
					InputProps={{
						readOnly: true,
					}}
				/>
			</div>
			<div>
				<TextField
					id="textField_time"
					label="Time"
					defaultValue={now.format("LT").toString()}
					margin="normal"
					InputProps={{
						readOnly: true,
					}}
				/>
			</div>
			<br />
			<div style={{ margin: 'auto', width: '200px' }}>
				<SelectBox
					name="Duration"
					items={durations}
					onSelectItem={selectDurration}
				/>
			</div>
			<br />
			<div style={{ margin: '16px', position: 'relative' }}>
				<CustomButton size="small" color="primary"
					onClick={setVolunteerIfSelected}>
					Next
				</CustomButton>
			</div>
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	setExistingVolunteer: volunteer => dispatch(setExistingVolunteer(volunteer)),
	setCurrentPage: page => dispatch(setCurrentPage(page))
});

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(VolunteerLoginPage);
