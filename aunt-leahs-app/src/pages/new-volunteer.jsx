import React from 'react';
import Head from '../components/header';
import CustomButton from '../components/customButton'
import TextInput from '../components/textField'
import constants from '../constants';
import '../styles.css';

// check box component needed?
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const NewVolunteer = () => (
    <div className="new-volunteer">
        <Head page={constants.HEADER.SUB_HEADER.signUp}/>
        
        <div className="new-volunteer-form">
            <form>
                {/* 
                
                == Basic Information ==
                First name / last name
                Email address

                == Address ==
                Stress address
                City / Province
                Postal Code

                == Emergency Contact ==
                First name / last name
                Relationship / phone number
                Email address

                Mailing list
                */}

                <h3 className="new-volunteer-form-subheading">Basic Information</h3>
                <div className="formRow">
                    <TextInput title="First name" size="Short"/>
                    <TextInput title="Last name" size="Short"/>
                </div>
                <TextInput title="Email" size="Long"/>

                <h3 className="new-volunteer-form-subheading">Address</h3>
                <TextInput title="Street address" size="Long"/>
                <div className="formRow">
                <TextInput title="City" size="Short"/>
                <TextInput title="Province" size="Short"/>
                </div>
                <TextInput title="Postal Code" size="Short"/>

                <h3 className="new-volunteer-form-subheading">Emergency Contact</h3>
                <div className="formRow">
                    <TextInput title="First name" size="Short"/>
                    <TextInput title="Last name" size="Short"/>
                </div>
                <div className="formRow">
                    <TextInput title="Relationship" size="Short"/>
                    <TextInput title="Phone number" size="Short"/>
                </div>
                <TextInput title="Email Address" size="Long"/>

                {/* below check box should be refactored to become its own component */}

                <FormControlLabel control={
                    <Checkbox checked="false" />}
                    label="I would like to be added to Aunt Leah’s mailing list."/>
                
            </form>
        </div>
        
        <div className="new-volunteer-button">
            <CustomButton size='small' color='primary'>Next</CustomButton>
        </div>
        
    </div>
);

export default NewVolunteer;