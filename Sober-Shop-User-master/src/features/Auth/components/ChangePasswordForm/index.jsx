import React from 'react';
import { Form, Formik, FastField } from 'formik';
import * as Yup from 'yup';
import authApi from 'api/authApi';
import { useDispatch } from 'react-redux';
import { getUser } from 'features/Auth/authSlice';
import InputField from 'customFields/InputField';
import { Button, FormGroup } from 'reactstrap';
import Loading from 'components/Loading/Loading';

function ChangePasswordForm(props) {
    const dispatch = useDispatch();

    const initialValues = {
        password: '',
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required("Enter your password")
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            .matches(
                /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Must have at least 1 special character"
            ),
        newPassword: Yup.string()
            .required('Enter new password')
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            .matches(
                /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Must have at least 1 special character"
            )
            .notOneOf([Yup.ref('password')], 'The new password must be different from the old password'),
        confirmPassword: Yup.string()
            .required('')
            .oneOf([Yup.ref('newPassword'), null], 'Password must match.'),
    });

    const handleSubmit = async (values, actions) => {
        try {
            const changePasswordData = await authApi.changePassword(values);

            if(changePasswordData.success) {
                await dispatch(getUser());
            } else {
                console.log(changePasswordData.message);

                actions.resetForm({
                    errors: {
                        password: changePasswordData.message,
                    },
                    touched: {
                        password: true,
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="change-password">
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
                                    name="password"
                                    label="Current password"
                                    component={InputField}
                                    type="password"
                                />

                                <FastField 
                                    name="newPassword"
                                    label="New password"
                                    type="password"
                                    component={InputField}
                                />

                                <FastField 
                                    name="confirmPassword"
                                    label="Confirm new password"
                                    type="password"
                                    component={InputField}
                                />

                                <FormGroup className="form-group__submit">
                                    <Button type="submit" className="btn-submit">
                                        { isSubmitting ? <Loading /> : 'CHANGE PASSWORD' }
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

export default ChangePasswordForm;