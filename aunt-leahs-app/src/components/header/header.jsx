import React from 'react';
import SubText from './SubText.jsx';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import constants from '../constants.jsx';
import styles from '../styles.jsx'

const useStyles = makeStyles({
        root:{
            color:'black',
        },
    });

const headerText = constants.headerConstants.headerText;
const headerStyle = styles;

const Head = (props) => {
    /*Refer to ./components/constants.jsx for props.page values */
    const classes = useStyles();
    
    return(
        <div className = {classes.root}>
            <Typography variant='h6'> 
                <h1 style={headerStyle}>{headerText.headOne}</h1>
                <h2 style={headerStyle}>{headerText.headTwo}</h2>
                {(props.page!=null) 
                &&<SubText title={props.page}/>}
            </Typography>
        </div>)
};

Head.defaultProps={page:null};

export default Head;