import React from 'react';
import Button from '@material-ui/core/Button';

// Two different sizes: small and large 
// Two different colors: primary (teal) and secondary (red)
const CustomButton = ({ size, color, onClick, children, type, isDisabled }) => {
    return (
        <Button size={size} color={color} variant='contained' onClick={onClick} type={type} disabled={isDisabled}>
            {children}
        </Button>
    );
};

export default CustomButton;
