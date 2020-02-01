import React from 'react';
import Head from '../components/header.jsx';
import CustomButton from '../components/customButton';
import TextInput from '../components/textInput';
import { headers } from '../constants';
import '../styles.css';

import { Link, withRouter } from 'react-router-dom';

class AdminHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.clearPassword = this.clearPassword.bind(this);
    }

    handleChange(event, stateToChange) {
        this.setState({ [stateToChange] : event.target.value });
    }

    clearPassword() {
        this.setState({ password: '' });
    }

    render() {
        const { history } = this.props;
        return (
            <div className='adminLogin'>
                <div className='adminLogin-header'>
                    <Head page={headers.SUB_HEADER.adminLogin} />
                </div>

                <div>
                    <TextInput title='Username' size='Short' onChange={(e) => this.handleChange(e, 'username')} value={this.state.username} />
                </div>

                <div>
                    <TextInput title='Password' size='Short' onChange={(e) => this.handleChange(e, 'password')} value={this.state.password} type='password' />
                </div>

                <div className='adminLogin-button'>
                    <CustomButton size='small' color='primary' onClick={() => history.push('/admin/shiftData')}>Sign In</CustomButton>
                </div>

                <div className='adminLogin-volunteer-login'>
                    <Link to='/'>Volunteer View</Link>
                </div>
            </div>
        );
    }
};

export default withRouter(AdminHomePage);
