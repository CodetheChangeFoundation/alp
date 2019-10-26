import React from 'react';
import MainText from './MainText.jsx';
import SubText from './SubText.jsx';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
        root:{
            color:'black',
        },
    });


const Head = (props) => {
    /*props.page assigned based on the page it is in.  */
    const classes = useStyles();
    
    return(
        <div className = {classes.root}>
            <Typography variant='h6'> 
            <MainText />
            {(props.page!=null) &&<SubText title={props.page}/>}
            </Typography>
        </div>)
};

Head.defaultProps={page:null};

export default Head;