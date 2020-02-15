import React from 'react';
import Header from '../components/Header.jsx';
import CustomButton from '../components/CustomButton';
import TextInput from '../components/TextInput';
import { headers } from '../constants';

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
            <div className='admin-login'>
                <div className='admin-login-header'>
                    <Header page={headers.SUB_HEADER.adminLogin} />
                </div>

                <div>
                    <TextInput title='Username' size='Short' onChange={(e) => this.handleChange(e, 'username')} value={this.state.username} />
                </div>

                <div>
                    <TextInput title='Password' size='Short' onChange={(e) => this.handleChange(e, 'password')} value={this.state.password} type='password' />
                </div>

                <div className='admin-login-button'>
                    <CustomButton size='small' color='primary' onClick={() => history.push('/admin/shiftData')}>Sign In</CustomButton>
                </div>

                <div className='admin-login-volunteer-login'>
                    <Link to='/'>Volunteer View</Link>
                </div>
            </div>
        );
    }
};

export default withRouter(AdminHomePage);
