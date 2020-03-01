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
		{ firstName: 'Viniel', lastName: 'Kumar' },
		{ firstName: 'Pritpal', lastName: 'Chauhan' },
		{ firstName: 'John', lastName: 'Doe' },
		{ firstName: 'Justin', lastName: 'Kwan' },
		{ firstName: 'Cody', lastName: 'Thechange' }
	];

	let selectedVolunteer = null;
	function selectVolunteer(event, volunteer) {
		alert(volunteer.name);
		selectedVolunteer = volunteer;
	}

	const setVolunteerIfSelected = () => {
		if (selectedVolunteer) {
			setExistingVolunteer({
				firstName: action.payload.firstName,
				lastName: action.payload.lastName
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

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(VolunteerLoginPage);
