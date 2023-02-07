import React from 'react';
import { useSelector } from 'react-redux';
import ChangePasswordForm from '../ChangePasswordForm';
import UpdateInfoForm from '../UpdateInfoForm';
import './AccountDetails.scss';

function AccountDetails(props) {
    const user = useSelector(state => state.auth.user);

    const initialUpdateForm = {
        fullname: user.fullname,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address,
    };
    
    return (
        <div className="account" >
            <div className="account__details">
                <h3>Account Details</h3>
                <div className="account__form" >
                    <UpdateInfoForm initialValues={initialUpdateForm} />
                </div>
            </div>
            <div className="account__password-change">
                <h3>Password Change</h3>
                <div className="account__form">
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;