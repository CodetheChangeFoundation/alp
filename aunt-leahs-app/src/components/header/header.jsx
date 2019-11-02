import React from 'react';
import SubText from './SubText.jsx';
import constants from '../../constants.jsx';
import '../../styles.css';

const headerText = constants.HEADER.MAIN_HEADER;

const Head = (props) => {
    /*takes in 'page' as props. Refer to ./components/constants.jsx for props.page values */
    return(
        <div className='headerBox'>
                <img className="headerImage header"  alt="Aunt Leah's Logo" src={require('../../AuntLeahsTrees.png')}/>
                <h1 className="headerMain header">{headerText.headTwo}</h1>
                {(props.page!=null) 
                    &&<SubText title={props.page}/>}
        </div>
    )
};

export default Head;