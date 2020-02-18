import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { pages } from '../constants';
import CustomButton from '../components/CustomButton'
import Header from '../components/Header'
import AutoCompleteSelectBox from '../components/AutoCompleteSelectBox'

import { setExistingVolunteer } from '../redux/volunteer/volunteerAction';
import { setCurrentPage } from '../redux/page/pageAction';


function VolunteerLoginPage({ history, setExistingVolunteer, setCurrentPage }) {
	const volunteers = [
		{ firstName: 'Viniel', lastName: 'Kumar', id: 1 },
		{ firstName: 'Pritpal', lastName: 'Chauhan', id: 2 },
		{ firstName: 'John', lastName: 'Doe', id: 3 },
		{ firstName: 'Justin', lastName: 'Kwan', id: 4 },
		{ firstName: 'Cody', lastName: 'Thechange', id: 5 }
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
			setCurrentPage(pages.VOLUNTEER_CHECK_IN);
		}
		else {
			alert('You have not selected any volunteers!');
		}
	}

	return (
		<div className="App">
			<Header page="Volunteer Login" />
			<div className='login-area'>
				<AutoCompleteSelectBox title='Existing Volunteer' width={250} values={volunteers.map(volunteer => ({ name: volunteer.firstName + ' ' + volunteer.lastName }))} onChange={selectVolunteer} />
			</div>
			<br />
			<div className='button-area'>
				<CustomButton size="small" color="primary"
					onClick={setVolunteerIfSelected}>
					Next
				</CustomButton>
			</div>
			<h3>OR</h3>
			<div className='button-area'>
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

const volunteers = [
	{ name: 'Viniel Kumar' },
	{ name: 'Pritpal Chauhan' },
	{ name: 'John Doe' },
	{ name: 'Justin Kwan' },
	{ name: 'Cody TheChange' },
	{ name: 'Testing List' }
];

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(VolunteerLoginPage);
