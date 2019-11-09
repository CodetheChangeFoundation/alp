import React from 'react';
import constants from '../constants.jsx';
import '../styles.css';

const headerText = constants.HEADER.MAIN_HEADER;

const Head = ({ page }) => {
    /*takes in 'page' as props. Refer to ./components/constants.jsx for props.page values */
    const hasSubtext = page !== null

    return (
        <div className='headerBox'>
            <img className="headerImage header" alt="Aunt Leah's Logo" src={require('../AuntLeahsTrees.png')} />
            <div className="headerMain header">{headerText.headTwo}</div>
            {hasSubtext
                && (
                    <div className="headerSub header">
                        {page}
                    </div>
                )}
        </div>
    )
};

export default Head;
