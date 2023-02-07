import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, FastField } from 'formik';
import { FormGroup, Button } from 'reactstrap';
import authApi from 'api/authApi';
import { useHistory, useParams } from 'react-router-dom';
import InputField from 'customFields/InputField';
import Loading from 'components/Loading/Loading';

function ResetPasswordForm(props) {
    const history = useHistory();
    const { resetToken } = useParams();
    const initialValues = {
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required('Enter new password')
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            .matches(
                /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Must have at least 1 special character"
            ),
        confirmPassword: Yup.string()
            .required('')
            .oneOf([Yup.ref('newPassword'), null], 'Password must match.'),
    });

    const handleSubmit = async (values, actions) => {
        try {
            const resetPasswordData = await authApi.resetPassword(resetToken, values);

            if(resetPasswordData.success) {
                history.push('/user');
            } else {
                console.log(resetPasswordData.message);

                actions.resetForm({
                    errors: {
                        newPassword: resetPasswordData.message,
                    },
                    touched: {
                        newPassword: true,
                    },
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <div className='login-form'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    function(formikProps) {
                        const { isSubmitting } = formikProps;

                        return (
                            <Form>
                                <FastField 
                                    name="newPassword"
                                    type="password"
                                    label="New password"
                                    component={InputField}
                                />

                                <FastField 
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm password"
                                    component={InputField}
                                />

                                <FormGroup>
                                    <Button className="login-form_btn">
                                        { isSubmitting ? <Loading /> : 'RESET PASSWORD'}
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

export default ResetPasswordForm;