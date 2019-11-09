import React from 'react';
import Head from '../../components/header/header';
import CustomButton from '../../components/customButton/customButton'
import constants from '../../constants';
import '../../styles.css';

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
                <h3 className="new-volunteer-form-subheading">Address</h3>
                <h3 className="new-volunteer-form-subheading">Emergency Contact</h3>
            </form>
        </div>
        
        <div className="new-volunteer-button">
            <CustomButton size='small' color='primary'>Next</CustomButton>
        </div>
        
    </div>
);

export default NewVolunteer;