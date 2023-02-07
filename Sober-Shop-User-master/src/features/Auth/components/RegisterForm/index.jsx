import InputField from 'customFields/InputField';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import Loading from 'components/Loading/Loading';
import authApi from 'api/authApi';
import { LOCAL_STORAGE } from 'constants/global';
import { useDispatch } from 'react-redux';
import { getUser } from 'features/Auth/authSlice';

function RegisterForm(props) {
    const { select } = props;
    const dispatch = useDispatch();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const style = select === 'register' ? {
        left: '0',
        opacity: '1',
    } : {
        left: '100%',
        opacity: '0',
    };

    const handleSubmit = async (values, actions) => {
        try {
            const registerData = await authApi.register(values);

            if(registerData.success) {
                localStorage.setItem(LOCAL_STORAGE.accessToken, registerData.accessToken);
                localStorage.setItem(LOCAL_STORAGE.refreshToken, registerData.refreshToken);

                await dispatch(getUser());

            } else {
                console.log(registerData.message);
                
                actions.resetForm({
                    values: {
                        username: values.username,
                        email: values.email,
                        password: '',
                        confirmPassword: '',
                    },
                    errors: {
                        username: registerData.message,
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

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required.")
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            .matches(
                /^[a-zA-Z]{1}[a-zA-Z0-9_]{7,19}$/,
                "Username is not allowed to contain special characters"
            ),
        email: Yup.string()
            .required('')
            .email('This is not an email'),
        password: Yup.string()
            .required("Enter your password")
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            .matches(
                /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Must have at least 1 special character"
            ),
        confirmPassword: Yup.string()
            .required('')
            .oneOf([Yup.ref('password'), null], 'Password must match.'),
    });

    return (
        <div className="login-form form-register" style={ style }>
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
                                    name="email"
                                    component={InputField}

                                    type="email"
                                    label="Email"
                                />

                                <FastField
                                    name="password"
                                    component={InputField}

                                    type="password"
                                    label="Password"
                                />

                                <FastField
                                    name="confirmPassword"
                                    component={InputField}

                                    type="password"
                                    label="Password"
                                />
                                
                                
                                <FormGroup>
                                    <Button type="submit" className="login-form_btn">
                                        { isSubmitting ? <Loading />: 'REGISTER' }
                                    </Button>
                                </FormGroup>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    );
}

export default RegisterForm;