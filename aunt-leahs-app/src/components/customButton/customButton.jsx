import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        padding: '0 25px'
    },
    label: {
        color: 'white',
        textTransform: 'none'
    },
    containedSizeSmall: {
        height: '50px',
        fontSize: '20px'
    },
    containedSizeLarge: {
        height: '60px',
        fontSize: '30px'
    }
});

// Two different sizes: small and large 
// Two different colors: primary (teal) and secondary (red)
const CustomButton = ({size, color, onClick, children}) => {  
    const classes = useStyles();
    
    return (
    <Button size={size} color={color} variant='contained' onClick={onClick} 
    classes={{
        root: classes.root,
        label: classes.label,
        containedSizeSmall: classes.containedSizeSmall,
        containedSizeLarge: classes.containedSizeLarge
        }}>
        {children}
    </Button>
    );
};

export default CustomButton;

