import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, FastField } from 'formik';
import { FormGroup, Button } from 'reactstrap';
import authApi from 'api/authApi';
import { useHistory } from 'react-router-dom';
import InputField from 'customFields/InputField';
import Loading from 'components/Loading/Loading';

function ForgetPasswordForm(props) {
    const history = useHistory();
    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('')
            .email('This is not an Email'),
    });

    const handleSubmit = async (values, actions) => {
        try {
            const forgetPasswordData = await authApi.forgetPassword(values);

            if(forgetPasswordData.success) {
                history.push('/');
            } else {
                console.log(forgetPasswordData.message);

                actions.resetForm({
                    errors: {
                        email: forgetPasswordData.message,
                    },
                    touched: {
                        email: true,
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
                                    name="email"
                                    type="email"
                                    label="Email"
                                    component={InputField}
                                />

                                <FormGroup>
                                    <Button className="login-form_btn">
                                        { isSubmitting ? <Loading /> : 'SEND'}
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

export default ForgetPasswordForm;