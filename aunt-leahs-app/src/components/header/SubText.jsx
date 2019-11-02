import React from 'react';
import PropTypes from 'prop-types';
import '../../styles.css'

const SubText =(props)=>{
    return(
        <div className="header">{props.title}</div>
    )
};

SubText.propTypes = {title: PropTypes.string.isRequired}
export default SubText;