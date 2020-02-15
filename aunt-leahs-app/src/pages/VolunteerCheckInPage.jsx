import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import TextInput from '../components/TextInput'
import SelectBox from '../components/SelectBox'
import CustomButton from '../components/CustomButton'
import Header from '../components/Header'

import { setExistingVolunteer } from '../redux/volunteer/volunteerAction';
import { setCurrentPage } from '../redux/page/pageAction';


function VolunteerCheckInPage({ history, setExistingVolunteer, setCurrentPage }) {
	const durations = [
		{ value: { firstName: '1', lastName: '00' }, id: 1 },
		{ value: { firstName: '1', lastName: '30' }, id: 2 },
		{ value: { firstName: '2', lastName: '00' }, id: 3 },
		{ value: { firstName: '2', lastName: '30' }, id: 4 },
		{ value: { firstName: '3', lastName: '00' }, id: 5 }
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
			<Header page="Check In" />
			<div className='checkin-area'>
				<TextInput
					title="Date"
					size='Short'
					value={now.format("dddd, MMMM Do YYYY").toString()}
					readOnly={true}
				/>
			</div>

			<div className='checkin-area'>
				<TextInput
					title="Time"
					size='Short'
					value={now.format("LT").toString()}
					margin="normal"
					readOnly={true}
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
)(VolunteerCheckInPage);
