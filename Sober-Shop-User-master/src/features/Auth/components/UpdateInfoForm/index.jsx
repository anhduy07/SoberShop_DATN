import authApi from 'api/authApi';
import Loading from 'components/Loading/Loading';
import InputField from 'customFields/InputField';
import { getUser } from 'features/Auth/authSlice';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
 
function UpdateInfoForm(props) {
    const { initialValues } = props;
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Enter your full name'),
        phoneNumber: Yup.string()
            .required('Enter your phone number')
            .matches(/^[0]\d{9}$/, 'This is not a phone number'),
        email: Yup.string()
            .required('Choose a Email address')
            .email('This is not an Email'),
        address: Yup.string()
            .required('Enter your address'),
    });

    const handleSubmit = async (values, actions) => {
        try {
            const updateData = await authApi.updateInfor(values);

            console.log({ updateData });

            if(updateData.success) {
                await dispatch(getUser());
            } else {
                console.log(updateData.message);

                actions.resetForm({
                    values: {
                        ...values,
                    },
                    errors: {
                        email: updateData.message,
                    },
                    touched: {
                        email: true,
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="update-info" >
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {
                    formikProps => {
                        const { isSubmitting } = formikProps;

                        return (
                            <Form>
                                <FastField 
                                    name="fullname"
                                    label="Full name"
                                    component={InputField}
                                />

                                <FastField 
                                    name="phoneNumber"
                                    label="Phone number"
                                    component={InputField}
                                />

                                <FastField 
                                    name="address"
                                    label="Address"
                                    component={InputField}
                                />

                                <FastField 
                                    name="email"
                                    label="Email"
                                    type="email"
                                    component={InputField}
                                />

                                <FormGroup className="form-group__submit" >
                                    <Button type="submit" className="btn-submit" >
                                        { isSubmitting ? <Loading /> : 'UPDATE' }
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

export default UpdateInfoForm;