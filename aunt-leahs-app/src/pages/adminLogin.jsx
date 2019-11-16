import React from 'react';
import Head from '../components/header.jsx';
import CustomButton from '../components/customButton';
import TextInput from '../components/textField';
import constants from '../constants';
import '../styles.css';

class AdminLogin extends React.Component {

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
        this.setState({ [stateToChange]: event.target.value });
    }

    clearPassword(){
        this.setState({ password: '' });
    }

    render() {
        return (
            <div className='adminLogin'>
                <div className='adminLogin-header'>
                    <Head page={constants.HEADER.SUB_HEADER.adminLogin} />
                </div>

                <div>
                    <TextInput title='Username' size='Short' onChange={(e) => this.handleChange(e, 'username')} value={this.state.username} />
                </div>

                <div>
                    <TextInput title='Password' size='Short' onChange={(e) => this.handleChange(e, 'password')} value={this.state.password} type='password' />
                </div>

                <div className='adminLogin-button'>
                    <CustomButton size='small' color='primary' onClick={this.clearPassword}>Sign In</CustomButton>
                </div>

                <div className='adminLogin-volunteer-login'>
                    <a href='#'>Volunteer View</a>
                </div>
            </div>
        );
    }
};

export default AdminLogin;
