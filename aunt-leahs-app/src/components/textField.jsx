import React from 'react';
import { TextField, Typography, makeStyles } from '@material-ui/core';
import '../styles.css';

const useStyles = makeStyles({
    root: {
        border: '2px solid #00A19B',
        boxSizing: 'border-box',
        fontFamily: 'Tahoma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '18px',
        lineHeight: '22px',
        padding: '0px 5px',
    },
});

const TextInput = ({ title, size, onChange, value, type }) => {
    /*  size - one of 'Short' or 'Long'
        onChange - takes a handler function with events as a parameter
        value - value for text input
        type - html type */

    const classes = useStyles();
    const length = 'textBox' + size;

    return (
        <div className={length}>
            <Typography>
                <div className='textLabel'>{title}</div>
                <TextField classes={{ root: classes.root }}
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
