import InputField from 'customFields/InputField';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import Loading from 'components/Loading/Loading';
import { useDispatch } from 'react-redux';
import authApi from 'api/authApi';
import { LOCAL_STORAGE } from 'constants/global';
import { getUser } from 'features/Auth/authSlice';
import { useHistory, useRouteMatch } from 'react-router-dom';

function LoginForm(props) {
    const { select } = props;
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const history = useHistory();

    const initialValues = {
        username: '',
        password: '',
    };

    const style = select === 'login' ? {
        right: '0',
        opacity: '1',
    } : {
        right: '100%',
        opacity: '0',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('')
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            .matches(
                /^[a-zA-Z]{1}[a-zA-Z0-9_]{7,19}$/,
                "Username is not allowed to contain special characters"
            ),
        password: Yup.string()
            .required("")
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            .matches(
                /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Must have at least 1 special character"
            ),
    });

    const handleSubmit = async (values, actions) => {
        try {
            const loginData = await authApi.login(values);

            if(loginData.success) {
                localStorage.setItem(LOCAL_STORAGE.accessToken, loginData.accessToken);
                localStorage.setItem(LOCAL_STORAGE.refreshToken, loginData.refreshToken);

                await dispatch(getUser());
                history.push("/");

            } else {
                actions.resetForm({
                    values: {
                        username: values.username,
                        password: '',
                    },
                    errors: {
                        username: loginData.message,
                    },
                    touched: {
                        username: true,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-form form-login" style={style}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {
                    formikProps => {
                        const { isSubmitting } = formikProps;

                        return (
                            <Form>
                                <FastField
                                    name="username"
                                    component={InputField}

                                    label="Username"
                                />

                                <FastField
                                    name="password"
                                    component={InputField}

                                    type="password"
                                    label="Password"
                                />
                                
                                <FormGroup>
                                    <Button type="submit" className="login-form_btn">
                                        { isSubmitting ? <Loading />: 'LOGIN' }
                                    </Button>
                                </FormGroup>
                            </Form>
                        )
                    }
                }
            </Formik>
            <p className="login-form_footer">
                <a href={`${match.url}/forget-password`}>LOST YOUR PASSWORD?</a>
            </p>
        </div>
    );
}

export default LoginForm;