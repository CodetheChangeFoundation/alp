import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AutoCompleteSelectBox = ({ title, width, values, onChange }) => {
  const defaultProps = {
    options: values,
    getOptionLabel: option => option.name
  };

  return (
    <div style={{ width: width }}>
      <span className='text-input-label'>{title}</span>

      <Autocomplete
        {...defaultProps}
        id='auto-complete-select-box'
        autoComplete
        includeInputInList
        renderInput={params => {
          params.InputLabelProps.shrink = false;
          params.InputProps.disableUnderline = true;
          return (
            <TextField {...params} margin='normal' fullWidth placeholder={"Enter your name..."} />
          );
        }}
        onChange={onChange}
      />
    </div>
  );
}
AutoCompleteSelectBox.defaultProps = { title: '' };

export default AutoCompleteSelectBox;
