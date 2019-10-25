import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        color: 'white',
        textTransform: 'none',
        fontSize: '20px'
    }
});


 
const CustomButton = ({children, color, onClick}) => {  
    const classes = useStyles();
    
    return (
    <Button color={color} variant='contained' onClick={onClick} className={classes.root}>
        {children}
    </Button>
    );
};

export default CustomButton;

