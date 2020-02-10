import React from "react";
import { connect } from 'react-redux';

import { headers } from "../constants";
import "../styles.css";

import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import TextInput from "../components/TextInput";
import Tickbox from "../components/TickBox";

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
    this.setState({ [fieldName]: event.target.value });
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

        <div className="new-volunteer-form">
          <form>

            <h3 className="new-volunteer-form-subheading">Basic Information</h3>
            <div className="formRow">
              <TextInput title="First name" size="Short" onChange={(e) => this.handleChange(e, 'firstName')} value={this.state.firstName} />
              <TextInput title="Last name" size="Short" onChange={(e) => this.handleChange(e, 'lastName')} value={this.state.lastName} />
            </div>
            <TextInput title="Email" size="Long" onChange={(e) => this.handleChange(e, 'email')} value={this.state.email}/>

            <h3 className="new-volunteer-form-subheading">Address</h3>
            <TextInput title="Street address" size="Long" onChange={(e) => this.handleChange(e, 'streetAddress')} value={this.state.streetAddress} />
            <div className="formRow">
              <TextInput title="City" size="Short" onChange={(e) => this.handleChange(e, 'city')} value={this.state.city} />
              <TextInput title="Province" size="Short" onChange={(e) => this.handleChange(e, 'province')} value={this.state.province} />
            </div>
            <TextInput title="Postal Code" size="Short" onChange={(e) => this.handleChange(e, 'postalCode')} value={this.state.postalCode} />

            <h3 className="new-volunteer-form-subheading">Emergency Contact</h3>
            <div className="formRow">
              <TextInput title="First name" size="Short" onChange={(e) => this.handleChange(e, 'emergencyContactFirstName')} value={this.state.emergencyContactFirstName} />
              <TextInput title="Last name" size="Short" onChange={(e) => this.handleChange(e, 'emergencyContactLastName')} value={this.state.emergencyContactLastName} />
            </div>
            <div className="formRow">
              <TextInput title="Relationship" size="Short" onChange={(e) => this.handleChange(e, 'emergencyContactRelationship')} value={this.state.emergencyContactRelationship} />
              <TextInput title="Phone number" size="Short" onChange={(e) => this.handleChange(e, 'emergencyContactPhoneNumber')} value={this.state.emergencyContactPhoneNumber} />
            </div>
            <TextInput title="Email Address" size="Long" onChange={(e) => this.handleChange(e, 'emergencyContactEmail')} value={this.state.emergencyContactEmail} />

            <Tickbox
              onChange={this.handleTickbox}
              checked={this.state.mailingList}
              title="I would like to be added to Aunt Leah’s mailing list." // Should be moved to constants, I'm just not sure how or where
              color="primary" />
          </form>
        </div>

        <div className="new-volunteer-button">
          <CustomButton size="small" color="primary" onClick={() => setNewVolunteer(this.state)}>
            Next
          </CustomButton>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setNewVolunteer: volunteer => dispatch(setNewVolunteer(volunteer))
});

export default connect(null, mapDispatchToProps)(VolunteerSignUpPage);
