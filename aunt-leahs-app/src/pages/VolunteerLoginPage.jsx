import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { pages } from '../constants';
import CustomButton from '../components/CustomButton'
import Header from '../components/Header'
import AutoCompleteSelectBox from '../components/AutoCompleteSelectBox'

import { setExistingVolunteer } from '../redux/volunteer/volunteerAction';
import { setCurrentPage } from '../redux/page/pageAction';
import { useEffect } from 'react';


function VolunteerLoginPage({ setExistingVolunteer, setCurrentPage }) {
	const [volunteers, setVolunteers] = useState([]);

	useEffect(() => {
		getVolunteers();
	}, []);

	async function getVolunteers() {
		try {
			const response = await fetch('http://localhost:7071/api/VolunteerNames');

			const volunteers = await response.json();
			const volunteerNames = volunteers.map(volunteer => ({
				id: volunteer.id,
				value: volunteer.firstName + " " + volunteer.lastName
			}))
			setVolunteers(volunteerNames);
		}
		catch (error) {
			console.log("Error fetching volunteer names: " + error);
		}
	}

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
		<div className="volunteer-login-page">
			<Header page="Volunteer Login" />
			<div className='volunteer-login-page-login-area'>
				<AutoCompleteSelectBox title='Existing Volunteer' values={volunteers} onChange={selectVolunteer} width='360px'/>
			</div>
			<br />
			<CustomButton size="small" color="primary" onClick={setVolunteerIfSelected}>
				Next
			</CustomButton>
			<span className='volunteer-login-page-or-text volunteer-login-page-button-spacer'>OR</span>
			<CustomButton size="small" color="secondary" onClick={() => setCurrentPage(pages.VOLUNTEER_SIGN_UP)}>
				New Volunteer
			</CustomButton>
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
