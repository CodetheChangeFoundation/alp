import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@material-ui/core';

const LocationSelect = ({ onLocationSelect, locations }) => {

    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleLocationChange = (event) => {
        const selectedId = Number(event.target.value);
        const newSelectedLocation = locations.find(location => location.id === selectedId);

        setSelectedLocation(newSelectedLocation);
        onLocationSelect(newSelectedLocation);
    }

    return (
        <FormControl component="fieldset">
            <RadioGroup name="locationSelection" value={(selectedLocation && selectedLocation.id) || -1} onChange={handleLocationChange}>
                {locations.map(({ id, name }) => (
                    <FormControlLabel key={id} value={id} control={<Radio />} label={name} />
                ))}
            </RadioGroup>
        </FormControl>
    );

}

export default LocationSelect;
