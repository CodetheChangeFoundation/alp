import React from "react";
import Head from "../components/header";
import CustomButton from "../components/customButton";
import TextInput from "../components/textInput";
import constants from "../constants";
import "../styles.css";
import Tickbox from "../components/tickbox";

class NewVolunteer extends React.Component {
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
      fname: "",
      lname: "",
      email: "",
      address: "",
      city: "",
      province: "",
      postal: "",
      contactFName: "",
      contactLName: "",
      contactRelationship: "",
      contactPhone: "",
      contactEmail: "",
      mailingList: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTickbox = this.handleTickbox.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event, stateToChange) {
    this.setState({ [stateToChange] : event.target.value });
  }

  handleTickbox(event) {
    this.setState({ mailingList : !this.state.mailingList });
  }

  onClick(event) {
    console.log(this.state);
  }

  render() {
    return (
      <div className="new-volunteer">
        <Head page={constants.HEADER.SUB_HEADER.signUp} />

        <div className="new-volunteer-form">
          <form>

            <h3 className="new-volunteer-form-subheading">Basic Information</h3>
            <div className="formRow">
              <TextInput title="First name" size="Short" onChange={(e) => this.handleChange(e, 'fname')} value={this.state.fname} />
              <TextInput title="Last name" size="Short" onChange={(e) => this.handleChange(e, 'lname')} value={this.state.lname} />
            </div>
            <TextInput title="Email" size="Long" />

            <h3 className="new-volunteer-form-subheading">Address</h3>
            <TextInput title="Street address" size="Long" onChange={(e) => this.handleChange(e, 'address')} value={this.state.address}/>
            <div className="formRow">
              <TextInput title="City" size="Short" onChange={(e) => this.handleChange(e, 'city')} value={this.state.city} />
              <TextInput title="Province" size="Short" onChange={(e) => this.handleChange(e, 'province')} value={this.state.province} />
            </div>
            <TextInput title="Postal Code" size="Short" onChange={(e) => this.handleChange(e, 'postal')} value={this.state.postal}/>

            <h3 className="new-volunteer-form-subheading">Emergency Contact</h3>
            <div className="formRow">
              <TextInput title="First name" size="Short" onChange={(e) => this.handleChange(e, 'contactFName')} value={this.state.contactFName}/>
              <TextInput title="Last name" size="Short" onChange={(e) => this.handleChange(e, 'contactLName')} value={this.state.contactLName}/>
            </div>
            <div className="formRow">
              <TextInput title="Relationship" size="Short" onChange={(e) => this.handleChange(e, 'contactRelationship')} value={this.state.contactRelationship}/>
              <TextInput title="Phone number" size="Short" onChange={(e) => this.handleChange(e, 'contactPhone')} value={this.state.contactPhone} />
            </div>
            <TextInput title="Email Address" size="Long" onChange={(e) => this.handleChange(e, 'contactEmail')} value={this.state.contactPhone}/>

            <Tickbox
              onChange={this.handleTickbox}
              checked={this.state.mailingList}
              title="I would like to be added to Aunt Leah’s mailing list." // Should be moved to constants, I'm just not sure how or where
              color="primary"
            ></Tickbox>
          </form>
        </div>

        <div className="new-volunteer-button">
          <CustomButton size="small" color="primary" onClick={this.onClick}>
            Next
          </CustomButton>
        </div>
      </div>
    );
  }
}

export default NewVolunteer;
