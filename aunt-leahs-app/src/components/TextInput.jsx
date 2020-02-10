import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import '../styles.css';

const useStyles = makeStyles({
    inputRoot: {
        border: '2px solid #00A19B',
        boxSizing: 'border-box',
        fontFamily: 'Tahoma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '18px',
        lineHeight: '22px',
        padding: '0px 5px',
    },
    inputError: {
        border: '2px solid red'
    }
});


const TextInput = ({ id, title, size, onChange, value, type, error, required, onBlur, helperText }) => {
    /*  size - one of 'Short' or 'Long'
        onChange - takes a handler function with events as a parameter
        value - value for text input
        type - html type */

    const classes = useStyles();
    const length = 'textBox' + size;

    return (
        <div className={`${length} textInput`}>
            <span className='textInputLabel'>{required ? title + " *" : title }</span>

            <TextField
                id={id}
                InputProps={
                    {
                        disableUnderline: true,
                        classes: {
                            root: classes.inputRoot,
                            error: classes.inputError
                        }
                    }
                }
                placeholder={' ' + title}
                margin='none'
                fullWidth={true}
                onChange={onChange}
                type={type}
                value={value} 
                error={error}
                onBlur={onBlur}
                helperText={helperText}
                />

        </div>
    );
};

TextInput.defaultProps = { title: '' };

export default TextInput;
