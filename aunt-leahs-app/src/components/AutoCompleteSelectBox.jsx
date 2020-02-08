import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import '../styles.css';

const AutoCompleteSelectBox = ({ title,width, values, onChange}) =>{
    const defaultProps = {
        options: values,
        getOptionLabel: option => option.name
    };

    return (
        <div style={{ width: width }}>
          <Autocomplete
            {...defaultProps}
            id="auto-complete-select-box"
            autoComplete
            includeInputInList
            renderInput={params => (
              <TextField {...params} label= {title} margin="normal" fullWidth />
            )}
            onChange={onChange}
          />
        </div>
      );
}
AutoCompleteSelectBox.defaultProps = {title : ''};

export default AutoCompleteSelectBox;