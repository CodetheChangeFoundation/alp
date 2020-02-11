import React from 'react';
import { headers } from '../constants.jsx';
import '../styles.css';


const Header = ({ page }) => {
    /*takes in 'page' as props. Refer to ./components/constants.jsx for props.page values */

    const hasSubtext = page !== null

    return (
        <div className='header-box'>
            <img className="header-image header" alt="Aunt Leah's Logo" src={require('../AuntLeahsTrees.png')} />
            <div className="header-main header">{headers.MAIN_HEADER}</div>
            {hasSubtext
                && (
                    <div className="header-sub header">
                        {page}
                    </div>
                )}
        </div>
    )
};

export default Header;
