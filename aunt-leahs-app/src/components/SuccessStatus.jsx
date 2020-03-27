import React from 'react';
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const SuccessStatus = ({ clearStateMessage, clearStateAction, isFormSubmitted, isSubmissionSuccessful, successMessage, failureMessage }) => {
    return (
        <div>
            {isFormSubmitted ?
                (isSubmissionSuccessful ?
                    <div className='success-status success-status-submission-successful'>
                        <CheckCircleIcon className='success-status-submission-icon' style={{ fontSize: 40 }} />
                        <span>{successMessage}</span>
                        <Link to='/' onClick={clearStateAction} className='success-status-clear-state-link'>{clearStateMessage}</Link>
                    </div>
                    :
                    <div className='success-status-status success-status-submission-failed'>
                        <CancelIcon className='success-status-submission-icon' style={{ fontSize: 40 }} />
                        <span>{failureMessage}</span>
                        <Link to='/' onClick={clearStateAction} className='success-status-clear-state-link'>{clearStateMessage}</Link>
                    </div>
                )
                :
                null
            }
        </div>
    );
};

export default SuccessStatus;
