import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import axios from 'axios';

import CustomButton from '../components/CustomButton';
import TextInput from '../components/TextInput';
import Tickbox from '../components/TickBox';
import SuccessStatus from '../components/SuccessStatus';
import SelectBox from '../components/SelectBox';

import { setCurrentPage } from '../redux/page/pageAction';

import { volunteerAPIBaseURL, requiredText, pages } from '../constants';

const VolunteerSignUpFormContent = ({
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
	setCurrentPage,
	status,
	isSubmitting,
}) => {
	return (
		<div className='new-volunteer-form'>
			<form onSubmit={handleSubmit}>
				<h3 className='new-volunteer-form-subheading'>Basic Information</h3>
				<div className='formRow'>
					<TextInput
						id='firstName'
						title='First name'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.firstName}
						hasError={touched.firstName && Boolean(errors.firstName)}
						helperText={touched.firstName ? errors.firstName : ''}
						isRequired
					/>
					<TextInput
						id='lastName'
						title='Last name'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.lastName}
						hasError={touched.lastName && Boolean(errors.lastName)}
						helperText={touched.lastName ? errors.lastName : ''}
						isRequired
					/>
				</div>
				<div className='formRow'>
					<TextInput
						id='email'
						title='Email'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						hasError={touched.email && Boolean(errors.email)}
						helperText={touched.email ? errors.email : ''}
						isRequired
					/>
					<TextInput
						id='phone'
						title='Phone Number'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.phone}
						hasError={touched.phone && Boolean(errors.phone)}
						helperText={touched.phone ? errors.phone : ''}
						isRequired
					/>
				</div>
				<h3 className='new-volunteer-form-subheading'>Address</h3>
				<TextInput
					id='streetAddress'
					title='Street address'
					size='Long'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.streetAddress}
					hasError={touched.streetAddress && Boolean(errors.streetAddress)}
					helperText={touched.streetAddress ? errors.streetAddress : ''}
					isRequired
				/>
				<div className='formRow'>
					<TextInput
						id='city'
						title='City'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.city}
						hasError={touched.city && Boolean(errors.city)}
						helperText={touched.city ? errors.city : ''}
						isRequired
					/>
					<SelectBox
						name='province'
						title='Province'
						size='short'
						items={provinces}
						value={values.province}
						onSelectItem={handleChange}
						onBlur={handleBlur}
						hasError={touched.province && Boolean(errors.province)}
						helperText={touched.province ? errors.province : ""}
						isRequired
					/>
				</div>
				<TextInput
					id='postalCode'
					title='Postal Code'
					size='Short'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.postalCode}
					hasError={touched.postalCode && Boolean(errors.postalCode)}
					helperText={touched.postalCode ? errors.postalCode : ''}
					isRequired
				/>
				<h3 className='new-volunteer-form-subheading'>Emergency Contact</h3>
				<div className='formRow'>
					<TextInput
						id='contactFirstName'
						title='First name'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.contactFirstName}
						hasError={
							touched.contactFirstName && Boolean(errors.contactFirstName)
						}
						helperText={touched.contactFirstName ? errors.contactFirstName : ''}
						isRequired
					/>
					<TextInput
						id='contactLastName'
						title='Last name'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.contactLastName}
						hasError={
							touched.contactLastName && Boolean(errors.contactLastName)
						}
						helperText={touched.contactLastName ? errors.contactLastName : ''}
						isRequired
					/>
				</div>
				<div className='formRow'>
					<TextInput
						id='contactRelationship'
						title='Relationship'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.contactRelationship}
						hasError={
							touched.contactRelationship && Boolean(errors.contactRelationship)
						}
						helperText={
							touched.contactRelationship ? errors.contactRelationship : ''
						}
						isRequired
					/>
					<TextInput
						id='contactPhoneNumber'
						title='Phone Number'
						size='Short'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.contactPhoneNumber}
						hasError={
							touched.contactPhoneNumber && Boolean(errors.contactPhoneNumber)
						}
						helperText={
							touched.contactPhoneNumber ? errors.contactPhoneNumber : ''
						}
						isRequired
					/>
				</div>
				<TextInput
					id='contactEmail'
					title='Email Address'
					size='Long'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.contactEmail}
					hasError={touched.contactEmail && Boolean(errors.contactEmail)}
					helperText={touched.contactEmail ? errors.contactEmail : ''}
					isRequired
				/>
				<Tickbox
					id='mailingList'
					onChange={handleChange}
					checked={values.mailingList}
					title='I would like to be added to Aunt Leah’s mailing list.'
					color='primary'
				/>
				<div className='new-volunteer-button'>
					<CustomButton
						type='submit'
						size='small'
						color='primary'
						isDisabled={isSubmitting}>
						Next
					</CustomButton>
				</div>
				<SuccessStatus
					clearStateAction={(page) => setCurrentPage(pages.VOLUNTEER_LOGIN)}
					clearStateMessage='Return to home'
					isFormSubmitted={status ? status.isFormSubmitted : false}
					isSubmissionSuccessful={
						status ? status.isSubmissionSuccessful : false
					}
					successMessage='You have signed up'
					failureMessage='An error has occurred during the sign up process'
				/>
			</form>
		</div>
	);
};

const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const VolunteerSignUpForm = withFormik({
	mapPropsToValues: ({
		firstName,
		lastName,
		email,
		phone,
		streetAddress,
		city,
		province,
		postalCode,
		contactFirstName,
		contactLastName,
		contactRelationship,
		contactPhoneNumber,
		contactEmail,
		mailingList,
	}) => {
		return {
			firstName: firstName || '',
			lastName: lastName || '',
			email: email || '',
			phone: phone || '',
			streetAddress: streetAddress || '',
			city: city || '',
			province: province || '',
			postalCode: postalCode || '',
			contactFirstName: contactFirstName || '',
			contactLastName: contactLastName || '',
			contactRelationship: contactRelationship || '',
			contactPhoneNumber: contactPhoneNumber || '',
			contactEmail: contactEmail || '',
			mailingList: mailingList || false,
		};
	},

	validationSchema: Yup.object().shape({
		firstName: Yup.string().required(requiredText),
		lastName: Yup.string().required(requiredText),
		email: Yup.string().email('Enter a valid email').required(requiredText),
		phone: Yup.string()
			.matches(phoneRegex, 'Phone number is not valid')
			.required(requiredText),
		streetAddress: Yup.string().required(requiredText),
		city: Yup.string().required(requiredText),
		province: Yup.string().required(requiredText),
		postalCode: Yup.string()
			.matches(postalRegex, 'Postal code is not valid')
			.required(requiredText),
		contactFirstName: Yup.string().required(requiredText),
		contactLastName: Yup.string().required(requiredText),
		contactRelationship: Yup.string().required(requiredText),
		contactPhoneNumber: Yup.string()
			.matches(phoneRegex, 'Phone number is not valid')
			.required(requiredText),
		contactEmail: Yup.string()
			.email('Enter a valid email')
			.required(requiredText),
	}),

    handleSubmit: (values, { setSubmitting, setStatus }) => {
        const volunteerEndpoint = volunteerAPIBaseURL + '/api/volunteers';
        console.log(JSON.stringify(values, null, 2));
        setSubmitting(true);
        axios.post(volunteerEndpoint, JSON.stringify(values, null, 2))
            .then(function (response) {
                setStatus({ isFormSubmitted: true, isSubmissionSuccessful: true })
            })
            .catch(function (error) {
                setStatus({ isFormSubmitted: true, isSubmissionSuccessful: false })
            });
    }
})(VolunteerSignUpFormContent);

const mapDispatchToProps = (dispatch) => ({
	setCurrentPage: (page) => dispatch(setCurrentPage(page)),
});

const provinces = [
	{ value: 'BC', id: 1 },
	{ value: 'AB', id: 2 },
	{ value: 'MB', id: 3 },
	{ value: 'NB', id: 4 },
	{ value: 'NL', id: 5 },
	{ value: 'NT', id: 6 },
	{ value: 'NS', id: 7 },
	{ value: 'NU', id: 8 },
	{ value: 'ON', id: 9 },
	{ value: 'PE', id: 10 },
	{ value: 'QC', id: 11 },
	{ value: 'SK', id: 12 },
	{ value: 'YT', id: 13 },
];

export default connect(null, mapDispatchToProps)(VolunteerSignUpForm);
