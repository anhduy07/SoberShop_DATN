import Loading from 'components/Loading/Loading';
import ForgetPasswordForm from 'features/Auth/components/ForgetPasswordForm';
import LoginForm from 'features/Auth/components/LoginForm';
import RegisterForm from 'features/Auth/components/RegisterForm';
import ResetPasswordForm from 'features/Auth/components/ResetPasswordForm';
import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdClear } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Redirect, Switch, useHistory, Route, useRouteMatch } from 'react-router-dom';
import './Login.scss';

function Login(props) {
    const [select, setSelect] = useState('login');
    const match = useRouteMatch();
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAuthLoading = useSelector(state => state.auth.isAuthLoading);
   
    const body = isAuthLoading ? ( <div className="page-loading"><Loading backgroundColor="black" /></div>) :
         isAuthenticated ? <Redirect to='/user' /> : 
         (
            <div className="login">
                <div className="login_header">
                    <h2>My Account</h2>
                    <IconContext.Provider value={{ size: '2em' }}>
                        <MdClear onClick={() => history.push('/')}/>
                    </IconContext.Provider>
                </div>
                <Switch>
                    <Route path={`${match.url}`} exact>
                        <div className="login_main">
                            <div className="login_main_redirect">
                                <button onClick={() => setSelect('login')} className={ select === 'login' ? 'btn-active' : ''} >LOGIN</button>
                                <button onClick={() => setSelect('register')} className={ select === 'register' ? 'btn-active' : ''} >REGISTER</button>
                            </div>
                            <div className="login_main_content">
                                <LoginForm select={select} />
                                <RegisterForm select={select} />
                            </div>
                        </div>
                    </Route>

                    <Route path={`${match.url}/forget-password`}>
                        <div className="login_main">
                            <ForgetPasswordForm />
                        </div>
                    </Route>
                    <Route path={`${match.url}/reset-password/:resetToken`}>
                    <div className="login_main">
                            <ResetPasswordForm />
                        </div>
                    </Route>
                </Switch>
            </div>
        );
    return body;
}

export default Login;