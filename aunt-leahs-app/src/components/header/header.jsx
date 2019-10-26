import React from 'react';
import SubText from './SubText.jsx';
import { Typography } from '@material-ui/core';
import constants from '../constants.jsx';
import '../styles.css';

const headerText = constants.headerConstants.headerText;

const Head = (props) => {
    /*takes in page as props. Refer to ./components/constants.jsx for props.page values */
    return(
        <div>
            <Typography variant="h6">
                <h1 className="headerMain">{headerText.headOne}</h1>
                <h2 className="headerMain">{headerText.headTwo}</h2>
                {(props.page!=null) 
                    &&<SubText title={props.page}/>}
            </Typography>
        </div>)
};

Head.defaultProps={page:null};

export default Head;