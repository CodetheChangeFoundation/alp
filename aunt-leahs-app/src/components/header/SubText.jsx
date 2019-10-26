import React from 'react';
import PropTypes from 'prop-types';

const SubText =(props)=>{
    return(
        <div><h3>{props.title}</h3></div>
    )
};

SubText.propTypes = {title: PropTypes.string.isRequired}
export default SubText;