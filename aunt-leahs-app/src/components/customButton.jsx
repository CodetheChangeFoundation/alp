import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        fontFamily: 'Tahoma',
        padding: '0 42px',
        borderRadius: '8px',
        minHeight: '0',
        minWidth: '0'
    },
    label: {
        color: 'white',
        textTransform: 'none'
    },
    containedPrimary: {
        backgroundColor: '#00A19B',
        '&:hover': {
            backgroundColor: '#36776f'
        }
    },
    containedSecondary: {
        backgroundColor: '#7B303E',
        '&:hover': {
            backgroundColor: '#50242C'
        }
    },
    containedSizeSmall: {
        height: '38px',
        fontSize: '18px'
    },
    containedSizeLarge: {
        height: '60px',
        fontSize: '30px'
    }
});

// Two different sizes: small and large 
// Two different colors: primary (teal) and secondary (red)
const CustomButton = ({ size, color, onClick, children }) => {
    const classes = useStyles();

    return (
        <Button size={size} color={color} variant='contained' onClick={onClick}
            classes={{
                root: classes.root,
                label: classes.label,
                containedPrimary: classes.containedPrimary,
                containedSecondary: classes.containedSecondary,
                containedSizeSmall: classes.containedSizeSmall,
                containedSizeLarge: classes.containedSizeLarge
            }}>
            {children}
        </Button>
    );
};

export default CustomButton;
