import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = ({ id, title, size, onChange, value, type, placeholder, inputRef, margin, hasError, isRequired, onBlur, helperText }) => {
    /*  size - one of 'Short' or 'Long'
        onChange - takes a handler function with events as a parameter
        value - value for text input
        type - html type 
        placeholder - placeholder value (defaults to title value)
        margin - 'none' or 'default' */

    const length = 'text-box-' + size.toLowerCase();

    return (
        <div className={`${length} text-input`}>
            <span className='text-input-label'>{isRequired ? title + " *" : title }</span>

            <TextField
                id={id}
                InputProps={{ disableUnderline: true }}
                placeholder={title.length > 0 ? title : placeholder}
                margin={margin}
                fullWidth={true}
                onChange={onChange}
                type={type}
                value={value} 
                error={hasError}
                onBlur={onBlur}
                helperText={helperText}
                inputRef={inputRef}
                />

        </div>
    );
};

TextInput.defaultProps = { title: '', margin: 'none' };

export default TextInput;
