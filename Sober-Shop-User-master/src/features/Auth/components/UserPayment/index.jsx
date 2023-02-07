import React from 'react';
import { useSelector } from 'react-redux';
import RechargeForm from '../RechargeForm';

function UserPayment(props) {
    const user = useSelector(state => state.auth.user);

    return (
        <div className='user-payment'>
            <h3>Hello { user.fullname || user.username }</h3>
            <p>Your account balance is : <b>${ user.accountBalance }</b> </p>
            <h4>Recharge</h4>
            <RechargeForm />
        </div>
    );
}

export default UserPayment;