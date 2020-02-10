import React from "react";
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import Yup from 'yup';

import { headers } from "../constants";
import "../styles.css";

import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import TextInput from "../components/TextInput";
import Tickbox from "../components/TickBox";
import VolunteerSignUpForm from '../components/VolunteerSignUpForm.jsx';

import { setNewVolunteer } from '../redux/volunteer/volunteerAction';

class VolunteerSignUpPage extends React.Component {
  /* 
                
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

  Submit button just logs current state for now!
  */

  constructor(props) {
    super(props);
    this.state = {
        firstName: "",
        lastName: "",
        email: "",
        streetAddress: "",
        city: "",
        province: "",
        postalCode: "",
        emergencyContactFirstName: "",
        emergencyContactLastName: "",
        emergencyContactRelationship: "",
        emergencyContactPhoneNumber: "",
        emergencyContactEmail: "",
        mailingList: false
    };
    this.handleTickbox = this.handleTickbox.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName] : event.target.value });
  }

  handleTickbox(event) {
    this.setState({ mailingList: !this.state.mailingList });
  }

  onClick(event) {
    console.log(this.state);
  }

  render() {
    const setNewVolunteer = this.props.setNewVolunteer;

    return (
      <div className="new-volunteer">
        <Header page={headers.SUB_HEADER.signUp} />
        <VolunteerSignUpForm />
      </div>
    );
  }
}

export default VolunteerSignUpPage;
