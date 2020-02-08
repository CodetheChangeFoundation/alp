import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import '../styles.css';

const TextInput = ({ title, size, onChange, value, type }) => {
    /*  size - one of 'Short' or 'Long'
        onChange - takes a handler function with events as a parameter
        value - value for text input
        type - html type */

    const length = 'textBox' + size;

    return (
        <div className={length}>
            <Typography>
                <div className='textLabel'>{title}</div>

                <TextField
                    InputProps={{ disableUnderline: true }}
                    placeholder={' ' + title}
                    margin='none'
                    fullWidth='True'
                    onChange={onChange}
                    type={type}
                    value={value} />
            </Typography>
        </div>
    );
};

TextInput.defaultProps = {title : ''};

export default TextInput;
