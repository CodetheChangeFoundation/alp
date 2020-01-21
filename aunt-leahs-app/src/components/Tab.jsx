import React from 'react';

const Tab = ({ selected, onClick, children }) => {
    return (
        <span 
            className={`admin-header-tab-button ${selected ? 'admin-header-tab-button-selected' : 'admin-header-tab-button-normal'}`}
            onClick={onClick}>
                {children}
        </span>
    );
};

export default Tab;