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
		{ value: { firstName: 'LOOOL', lastName: 'Kumar' }, id: 1 },
		{ value: { firstName: 'LOOOOL', lastName: 'Chauhan' }, id: 2 },
		{ value: { firstName: 'LOOOOOOL', lastName: 'Doe' }, id: 3 },
		{ value: { firstName: 'Justin', lastName: 'Kwan' }, id: 4 },
		{ value: { firstName: 'Cody', lastName: 'Thechange' }, id: 5 }
    ];
    
    const dates = [
		{ value: { day: 'FEB 08', year: '2020' }, id: 1 },
		{ value: { day: 'FEB 09', year: '2020' }, id: 2 },
		{ value: { day: 'FEB 10', year: '2020' }, id: 3 }
    ];
    
    const times = [
		{ value: { time: '1:00'}, id: 1 },
		{ value: { time: '2:00'}, id: 2 },
		{ value: { time: '3:00'}, id: 3 }
	];

    const durations = [
		{ value: { duration: '1 hour'}, id: 1 },
		{ value: { duration: '2 hours'}, id: 2 },
		{ value: { duration: '3 hours'}, id: 3 }
	];


    let selectedVolunteer = null;
    let selectedDate = null;
    let selectedTime = null;
    let selectedDurration = null;
	function selectVolunteer(volunteer) {
		selectedVolunteer = volunteer;
    }

    function selectDate(date){
        selectedDate = date
    }

    function selectTime(time){
        selectedTime = time
    }
    function selectDurration(durration){
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


	return (
		<div className="App">
			<Head page="Check In" />
			<div style={{ margin: 'auto', width: '200px' }}>
				<SelectBox
					name="Date"
					items={dates}
					onSelectItem={selectDate}
				/>
			</div>
			<br />
            <br />
            <div style={{ margin: 'auto', width: '200px' }}>
				<SelectBox
					name="Time"
					items={times}
					onSelectItem={selectTime}
				/>
			</div>
            <br />
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
