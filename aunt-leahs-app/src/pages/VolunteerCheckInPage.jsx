import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';

import TextInput from '../components/TextInput';
import SelectBox from '../components/SelectBox';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import SuccessStatus from '../components/SuccessStatus';

import { clearStateAction } from '../redux/rootReducer';
import { volunteerAPIBaseURL } from '../constants';
import moment from 'moment';

function VolunteerCheckInPage({ location, volunteer, clearStateAction }) {
	const [duration, setDuration] = useState('');
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
	
	const shiftsEndpoint = volunteerAPIBaseURL + '/api/Shifts';

	const postShift = async () => {
		try {
			if (!duration.target) {
				alert('Please select a shift time');
			} else {
				const res = await axios.post(shiftsEndpoint, {
					shiftData: {
						locationId: location.id,
						volunteerId: volunteer.id,
						startTime: now,
						duration: duration.target ? duration.target.value : '',
					},
				});

				if (res.status === 200) {
					setIsSubmissionSuccessful(true);
					setIsFormSubmitted(true);
				} else {
					setIsSubmissionSuccessful(false);
					setIsFormSubmitted(true);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const now = moment();

	return (
		<div className='check-in-area '>
			<Header page='Check In' />
			<div>
				<TextInput
					title='Date'
					size='Short'
					value={now.format('dddd, MMMM Do YYYY').toString()}
					readOnly={true}
				/>
			</div>
			<div>
				<TextInput
					title='Time'
					size='Short'
					value={now.format('LT').toString()}
					readOnly={true}
				/>
			</div>
			<br />
			<div className='check-in-select-box'>
				<SelectBox
					// No size specified so margin: 12px doesn't get applied
					name='duration'
					title='Duration'
					items={durations}
					value={duration.target ? duration.target.value : ''}
					onSelectItem={setDuration}
				/>
			</div>
			<br />
			<div className='check-in-custom-button'>
				<CustomButton
					size='small'
					color='primary'
					onClick={postShift}
					isDisabled={isFormSubmitted || isSubmissionSuccessful}>
					Submit
				</CustomButton>
			</div>
			<SuccessStatus
				clearStateAction={clearStateAction}
				clearStateMessage='Check In Again'
				isFormSubmitted={isFormSubmitted}
				isSubmissionSuccessful={isSubmissionSuccessful}
				successMessage='You have successfully checked in'
				failureMessage='An error has occurred during the check in process'
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	location: state.location.location,
	volunteer: state.volunteer.volunteer,
});

const mapDispatchToProps = (dispatch) => ({
	clearStateAction: () => dispatch(clearStateAction()),
});

const durations = [
	{ value: '1:00', id: 1 },
	{ value: '1:30', id: 2 },
	{ value: '2:00', id: 3 },
	{ value: '2:30', id: 4 },
	{ value: '3:00', id: 5 },
	{ value: '3:30', id: 6 },
	{ value: '4:00', id: 7 },
	{ value: '4:30', id: 8 },
];

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(VolunteerCheckInPage);
