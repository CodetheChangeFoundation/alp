import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import axios from "axios";

import TextInput from "../components/TextInput";
import SelectBox from "../components/SelectBox";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";

import { setCurrentPage } from "../redux/page/pageAction";
import moment from "moment";

function VolunteerCheckInPage({ location, volunteer }) {
  const [duration, setDuration] = useState();

  const postShift = async () => {
    try {
      console.log(volunteer);
      const res = await axios.post("http://localhost:7071/api/shifts", {
        shiftData: {
          locationId: location.id,
          volunteerId: volunteer.id,
          startTime: now,
          duration: duration
        }
      });

      console.log(`statusCode: ${res.statusCode}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const now = moment();

  return (
    <div className="check-in-area ">
      <Header page="Check In" />
      <div>
        <TextInput
          title="Date"
          size="Short"
          value={now.format("dddd, MMMM Do YYYY").toString()}
          readOnly={true}
        />
      </div>
      <div>
        <TextInput
          title="Time"
          size="Short"
          value={now.format("LT").toString()}
          readOnly={true}
        />
      </div>
      <br />
      <div>
        <SelectBox
          labelId="select-box-label"
          name="duration"
          title="Duration"
          items={durations}
          size="Short"
          value={duration}
          onSelectItem={setDuration}
        />
      </div>
      <br />
      <div className="check-in-custom-button">
        <CustomButton size="small" color="primary" onClick={postShift}>
          Submit
        </CustomButton>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  location: state.location.location,
  volunteer: state.volunteer.volunteer
});

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
});

const durations = [
  { value: "1:00", id: 1 },
  { value: "1:30", id: 2 },
  { value: "2:00", id: 3 },
  { value: "2:30", id: 4 },
  { value: "3:00", id: 5 },
  { value: "3:30", id: 6 },
  { value: "4:00", id: 7 },
  { value: "4:30", id: 8 }
];

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(VolunteerCheckInPage);
