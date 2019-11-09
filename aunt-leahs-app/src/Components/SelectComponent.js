import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import volunteers from './VolunteerConstants'

// Move to styles doc

const selectStyle = {
    width: '100px',
}

// Select component, for rendering volunteers (i.e., existing volunteers)

class SelectComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleVolunteerChange = this.handleVolunteerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.volunteers = volunteers

        this.state = {
            selectedVolunteer: '',
        };

    }

    handleVolunteerChange(event, index, value) {
        console.log(`You have selected ${event.target.value}.`);

        this.setState({
            selectedVolunteer: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <InputLabel id="select-label">Existing Volunteer</InputLabel>
                <Select
                    value={this.state.selectedVolunteer}
                    onChange={this.handleVolunteerChange}
                    style={selectStyle}>
                    {this.volunteers.map((volunteer, index) =>
                        <MenuItem key={index} value={volunteer.name}>{volunteer.name}</MenuItem>
                    )}
                </Select>
            </div>
        );
    }
}

export default SelectComponent