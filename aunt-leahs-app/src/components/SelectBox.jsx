import React, { useState } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';

const SelectBox = ({ id, title, size, items, onSelectItem, hasError, isRequired, onBlur }) => {

    const [selectedItem, setSelectedItem] = useState('');

    const handleChange = event => {
        onSelectItem(event.target.value);
        setSelectedItem(event.target.value);
    }

    const length = 'select-box-' + size.toLowerCase();

    return (
        <div className={`${length} select-input`}>
            <span className='select-box-label'>{isRequired ? title + " *" : title}</span>
            <FormControl fullWidth={true}>
                <Select 
                    labelId='select-box-label'
                    id={id}
                    value={selectedItem} 
                    onChange={handleChange} 
                    disableUnderline
                    hasError={hasError}
                    onBlur={onBlur} >
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

SelectBox.defaultProps = { title: '', size: 'Short', margin: 'none' };

export default SelectBox
