import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Lock, Person } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'
import authApi from 'api/authApi'
import { useState } from 'react'
import { LOCAL_STORAGE } from 'constants/gloabalUrl'

export default function LoginForm() {
    const history = useHistory();
    const [loginError, setLoginError] = useState('');
    
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required()
            .min(6, 'Mininum of 6 characters.')
            .max(20, 'Maximum of 20 characters.')
            .matches(
                /^[a-zA-Z]{1}[a-zA-Z0-9_]{7,19}$/,
                "Username is not allowed to contain special characters."
            ),
        password: Yup.string()
            .required()
            .min(6, 'Mininum of 6 characters.')
            .max(20, 'Maximum of 20 characters.')
            .matches(
                /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Password contain both letters and numbers and has at least 1 special character."
            )
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) })
    
    const onsubmit = async (data) => {
        const res = await authApi.login(data); 
        if (res.success === false) {
            setLoginError(res.message);
        } else {
            localStorage.setItem(LOCAL_STORAGE.accessToken, res.accessToken);
            localStorage.setItem(LOCAL_STORAGE.refreshToken, res.refreshToken);
            history.push('/');
            setLoginError('');
        }
    }

    return (
        <div className='main'>
            <form
                className="form flex-center"
                onSubmit={handleSubmit(onsubmit)}
            >
                <h1 className='form-title'>Sign In</h1>
                <div className="form-wrapper login">
                    <div className="input-group">
                        <Person className='icon'/>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register('username')}
                        />
                    </div>
                    {errors.username && <p className="error">{errors.username.message}</p>}
                    
                    <div className="input-group">
                        <Lock className='icon'/>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password')}
                        />
                    </div>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                    {loginError && <p className="error">{loginError}</p>}
                    <button type='submit'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
