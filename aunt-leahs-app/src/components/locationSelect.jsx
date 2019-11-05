import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class LocationSelect extends React.Component {
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
        var selectedId = Number(event.target.value);
        var newSelectdedLocation = this.state.locations.find(location => location.id === selectedId);

        this.setState({ selectedLocation: newSelectdedLocation });
        this.props.onLocationSelect(newSelectdedLocation);
    }

    render() {
        return <FormControl component="fieldset">
            <RadioGroup name="locationSelection" value={(this.state.selectedLocation && this.state.selectedLocation.id) || -1} onChange={this.handleLocationChange}>
                {this.state.locations.map(location => (
                    <FormControlLabel key={location.id} value={location.id} control={<Radio />} label={location.name} />
                ))}
            </RadioGroup>
        </FormControl>
    }

}

export default LocationSelect;