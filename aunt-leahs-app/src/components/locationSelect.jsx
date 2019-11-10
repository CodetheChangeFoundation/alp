import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class LocationSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                    name: "Tree Lot",
                    id: 1,
                    address: "1234 East Mall"
                },
                {
                    name: "Thrift Store",
                    id: 2,
                    address: "1234 Robson St"
                },
                {
                    name: "Fundraising Event",
                    id: 3,
                    address: "1234 Wesbrook Mall"
                }]
        };

        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    handleLocationChange(event) {
        const selectedId = Number(event.target.value);
        const newSelectdedLocation = this.state.locations.find(location => location.id === selectedId);

        this.setState({ selectedLocation: newSelectdedLocation });
        this.props.onLocationSelect(newSelectdedLocation);
    }

    render() {
        return <FormControl component="fieldset">
            <RadioGroup name="locationSelection" value={(this.state.selectedLocation && this.state.selectedLocation.id) || -1} onChange={this.handleLocationChange}>
                {this.state.locations.map(({ id, name }) => (
                    <FormControlLabel key={id} value={id} control={<Radio />} label={name} />
                ))}
            </RadioGroup>
        </FormControl>
    }

}

export default LocationSelect;
