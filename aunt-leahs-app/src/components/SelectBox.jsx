import React, { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const SelectBox = ({ name, items, onSelectItem }) => {

    const [selectedItem, setSelectedItem] = useState('');

    const handleChange = event => {
        onSelectItem(event.target.value);
        setSelectedItem(event.target.value);
    }

    return (
        <div>
            <span className='text-input-label'>{name ?? 'Select'}</span>
            <FormControl fullWidth={true}>
                <Select labelId='select-box-label' value={selectedItem} onChange={handleChange} disableUnderline >
                    <MenuItem value=''>
                        <em>None</em>
                    </MenuItem>
                    {items.map(item =>
                        <MenuItem key={item.id} value={item.value}>
                            {item.value}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectBox
