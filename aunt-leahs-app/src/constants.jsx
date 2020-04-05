/* new constant should be child of 'constants'*/

export const headers = {
	MAIN_HEADER: 'Volunteer Management',
	SUB_HEADER: {
		location: 'Select A Location',
		volunteerLogin: 'Volunteer Login',
		signUp: 'New Volunteer Sign Up Form',
		checkIn: 'Check In',
		adminLogin: 'Admin Login'
	}
	
};

export const pages = {
	VOLUNTEER_HOME: 'Home',
	VOLUNTEER_LOGIN: 'Volunteer Login',
	VOLUNTEER_CHECK_IN: 'Volunteer Check In',
	VOLUNTEER_SIGN_UP: 'Volunteer Sign Up'
};

export const requiredText = 'Required';

export const applicationBaseUrl = 'http://localhost:3000';

export const adminAPIBaseURL = 'https://aunt-leahs-functions-admin.azurewebsites.net';
// export const adminAPIBaseURL = 'http://localhost:7072';
export const volunteerAPIBaseURL = 'https://aunt-leahs-functions.azurewebsites.net';
// export const volunteerAPIBaseURL = 'http://localhost:7071';

export const authConstants = {
	adminScope: 'api://53ac0842-a702-435e-81e6-a20cc9c3f523/Function.Access',
	authority: 'https://login.microsoftonline.com/4f9ec2ae-3e6f-4a54-89e9-60b8cd1cf84f',
	applicationId: '53ac0842-a702-435e-81e6-a20cc9c3f523'
};
