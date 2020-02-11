import React from 'react';
import { TextField, Typography } from '@material-ui/core';

const TextInput = ({ title, size, onChange, value, type, placeholder, inputRef, margin }) => {
    /*  size - one of 'Short' or 'Long'
        onChange - takes a handler function with events as a parameter
        value - value for text input
        type - html type 
        placeholder - placeholder value (defaults to title value)
        margin - 'none' or 'default' */

    const length = 'text-box-' + size.toLowerCase();

    return (
        <div className={length}>
            <Typography component='span'>
                <div className='text-label'>{title}</div>

                <TextField
                    InputProps={{ disableUnderline: true }}
                    placeholder={title.length>0 ? title : placeholder}
                    margin={margin}
                    fullWidth={true}
                    onChange={onChange}
                    type={type}
                    value={value}
                    inputRef={inputRef} />
            </Typography>
        </div>
    );
};

TextInput.defaultProps = { title: '', margin: 'none' };

export default TextInput;
