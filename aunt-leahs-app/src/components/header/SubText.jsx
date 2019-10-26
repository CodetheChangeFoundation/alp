import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css'

const SubText =(props)=>{
    return(
        <div><h3 className="header">{props.title}</h3></div>
    )
};

SubText.propTypes = {title: PropTypes.string.isRequired}
export default SubText;