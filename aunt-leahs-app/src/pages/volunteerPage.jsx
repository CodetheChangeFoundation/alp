import React from 'react';
import '../App.css';
import SelectBox from '../components/selectBox'
import CustomButton from '../components/customButton'
import Head from '../components/header'


function VolunteerPage() {
	var volunteers = [
						{ value: 'Viniel Kumar', id: 1 },
						{ value: 'Pritpal Chauhan', id: 2 },
						{ value: 'John Doe', id: 3 },
						{ value: 'Justin Kwan', id: 4 },
						{ value: 'Cody Thechange', id: 5 }
					];
	var selectedVolunteer = null;
	function selectVolunteer(volunteer){
		selectedVolunteer = volunteer;
	}

	return(
		<div className="App">
			<Head page="Volunteer Login" />
			<div style={{ margin: 'auto', width: '200px' }}>
				<SelectBox
					name="Existing Volunteer"
					items={volunteers}
					onSelectItem={selectVolunteer}
				/>
			</div>
			<br />
			<div style={{ margin: '16px', position: 'relative' }}>
				<CustomButton size="small" color="primary">
					Next
				</CustomButton>
			</div>
			<h3>OR</h3>
			<div style={{ margin: '16px', position: 'relative' }}>
				<CustomButton size="small" color="secondary">
					New Volunteer
				</CustomButton>
			</div>
		</div>
	);
}

export default VolunteerPage;
