import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { pages } from '../constants';

import SelectBox from '../components/selectBox'
import CustomButton from '../components/customButton'
import Head from '../components/header'

import { setExistingVolunteer } from '../redux/volunteer/volunteerAction';
import { setCurrentPage } from '../redux/page/pageAction';


function VolunteerLoginPage({ history, setExistingVolunteer, setCurrentPage }) {
	const volunteers = [
		{ value: { firstName: 'Viniel', lastName: 'Kumar' }, id: 1 },
		{ value: { firstName: 'Pritpal', lastName: 'Chauhan' }, id: 2 },
		{ value: { firstName: 'John', lastName: 'Doe' }, id: 3 },
		{ value: { firstName: 'Justin', lastName: 'Kwan' }, id: 4 },
		{ value: { firstName: 'Cody', lastName: 'Thechange' }, id: 5 }
	];

	let selectedVolunteer = null;
	function selectVolunteer(volunteer) {
		selectedVolunteer = volunteer;
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


	return (
		<div className="App">
			<Head page="Volunteer Login" />
			<div class='Login-area'>
				<SelectBox
					name="Existing Volunteer"
					items={volunteers}
					onSelectItem={selectVolunteer}
				/>
			</div>
			<br />
			<div class='Button-area'>
				<CustomButton size="small" color="primary"
					onClick={setVolunteerIfSelected}>
					Next
				</CustomButton>
			</div>
			<h3>OR</h3>
			<div class='Button-area'>
				<CustomButton size="small" color="secondary" onClick={() => setCurrentPage(pages.VOLUNTEER_SIGN_UP)}>
					New Volunteer
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
