import React from 'react';
import { headers } from '../constants.jsx';
import '../styles.css';


const Head = ({ page }) => {
    /*takes in 'page' as props. Refer to ./components/constants.jsx for props.page values */

    const hasSubtext = page !== null

    return (
        <div className='headerBox'>
            <img className="headerImage header" alt="Aunt Leah's Logo" src={require('../AuntLeahsTrees.png')} />
            <div className="headerMain header">{headers.MAIN_HEADER}</div>
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
