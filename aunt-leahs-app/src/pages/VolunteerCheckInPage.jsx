import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import TextInput from '../components/TextInput'
import SelectBox from '../components/SelectBox'
import CustomButton from '../components/CustomButton'
import Header from '../components/Header'

import { setDuration } from '../redux/volunteer/volunteerAction';
import { setCurrentPage } from '../redux/page/pageAction';

function VolunteerCheckInPage({ history, setDuration, setCurrentPage }) {

	let selectedDurration = null;
	function selectDurration(durration) {
		selectedDurration = durration
	}

	const setDurationIfSelected = () => {
		if (selectedDurration) {
			setDuration({ selectedDurration });
			alert('You have selected' + selectedDurration);
		}
		else {
			alert('You have not selected a duration!');
		}
	}
	const moment = require('moment');
	let now = moment();

	return (
		<div className='check-in-area '>
			<Header page="Check In" />
			<div>
				<TextInput title="Date" size='Short' value={now.format("dddd, MMMM Do YYYY").toString()} readOnly={true} />
			</div>
			<div>
				<TextInput title="Time" size='Short' value={now.format("LT").toString()} readOnly={true} />
			</div>
			<br />
			<div className='check-in-select-box'>
				<SelectBox
					name="Duration"
					items={durations}
					onSelectItem={selectDurration}
				/>
			</div>
			<br />
			<div className='check-in-custom-button'>
				<CustomButton size="small" color="primary"
					onClick={setDurationIfSelected}>
					Next
				</CustomButton>
			</div>
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	setDuration: duration => dispatch(setDuration(duration)),
	setCurrentPage: page => dispatch(setCurrentPage(page))
});

const durations = [
	{ value: '1:00', id: 1 },
	{ value: '1:30', id: 2 },
	{ value: '2:00', id: 3 },
	{ value: '2:30', id: 4 },
	{ value: '3:00', id: 5 },
	{ value: '3:30', id: 6 },
	{ value: '4:00', id: 7 },
	{ value: '4:30', id: 8 }
];

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(VolunteerCheckInPage);
