import React from 'react';
import SubText from './SubText.jsx';
import constants from '../../constants.jsx';
import '../../styles.css';

const headerText = constants.HEADER.MAIN_HEADER;

const Head = ({ page }) => {
    /*takes in 'page' as props. Refer to ./components/constants.jsx for props.page values */
    return(
        <div className='headerBox'>
                <img className="headerImage header"  alt="Aunt Leah's Logo" src={require('../../AuntLeahsTrees.png')}/>
                <div className="headerMain header">{headerText.headTwo}</div>
                {(page !== null) 
                    &&<SubText title={page}/>}
        </div>
    )
};

export default Head;
