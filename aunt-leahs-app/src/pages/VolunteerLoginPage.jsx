import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { pages } from '../constants';

import SelectBox from '../components/SelectBox'
import CustomButton from '../components/CustomButton'
import Header from '../components/Header'

import { setExistingVolunteer } from '../redux/volunteer/volunteerAction';
import { setCurrentPage } from '../redux/page/pageAction';
import { useEffect } from 'react';


function VolunteerLoginPage({ history, setExistingVolunteer, setCurrentPage }) {
	const [volunteers, setVolunteers] = useState([]);

	useEffect(() => {
		getVolunteers();
	}, []);

	async function getVolunteers() {
		const response = await fetch('http://localhost:7073/api/VolunteerNames');
		const volunteers = await response.json();
		const items = [];

		volunteers.forEach(volunteer => {
			const volunteerObj = {
				id: volunteer.volunteer_id,
				value: volunteer.first_name + " " + volunteer.last_name
			}
			items.push(volunteerObj);
		})
		setVolunteers(items);
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
		}
		else {
			alert('You have not selected any volunteers!');
		}
	}


	return (
		<div className="App">
			<Header page="Volunteer Login" />
			<div style={{ margin: 'auto', width: '200px' }}>
				<SelectBox
					name="Existing Volunteer"
					items={volunteers}
					onSelectItem={selectVolunteer}
				/>
			</div>
			<br />
			<div style={{ margin: '16px', position: 'relative' }}>
				<CustomButton size="small" color="primary"
					onClick={setVolunteerIfSelected}>
					Next
				</CustomButton>
			</div>
			<h3>OR</h3>
			<div style={{ margin: '16px', position: 'relative' }}>
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
