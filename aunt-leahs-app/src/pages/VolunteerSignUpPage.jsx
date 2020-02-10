import React from "react";

import { headers } from "../constants";
import "../styles.css";

import Header from "../components/Header";
import VolunteerSignUpForm from '../components/VolunteerSignUpForm.jsx';

const VolunteerSignUpPage = () => {
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

  */
  return (
    <div className="new-volunteer">
      <Header page={headers.SUB_HEADER.signUp} />
      <VolunteerSignUpForm />
    </div>
  );
}

export default VolunteerSignUpPage;
