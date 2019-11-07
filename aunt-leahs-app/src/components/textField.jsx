import React from 'react';
import { TextField, Typography, makeStyles, Input} from '@material-ui/core';
import '../styles.css'

const useStyles = makeStyles({
    root:{
        border: '2px solid #00A19B',
        boxSizing: 'border-box',
    },
    underline:{

    }
});

const TextInput = ({title, size}) => {
    const classes = useStyles();

    return (
        <div className='textBox'>
            <Typography>
                <div className='textLabel'>{title}</div>
                <TextField classes={{root:classes.root}} 
                InputProps={{disableUnderline: true}} 
                placeholder={title} 
                margin='dense' 
                fullWidth='True' />
            </Typography>    
        </div>
    );
};

export default TextInput;
