import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik, FastField } from 'formik';
import * as Yup from 'yup';
import authApi from 'api/authApi';
import { getUser } from 'features/Auth/authSlice';
import InputField from 'customFields/InputField';
import { Button, FormGroup } from 'reactstrap';
import Loading from 'components/Loading/Loading';

function RechargeForm(props) {
    const dispatch = useDispatch();

    const initialValues = {
        money: '',
    };

    const validationSchema = Yup.object().shape({
        money: Yup.number()
            .required('Enter the amount you want to deposit into your account')
            .min(0),
    });

    const handleSubmit = async (values, actions) => {
        try {
            const rechargeData = await authApi.updateInfor(values);

            console.log(typeof values.money);
            if(rechargeData.success) {
                await dispatch(getUser());
            } else {
                console.log(rechargeData.message);

                actions.resetForm({
                    errors: {
                        money: rechargeData.message,
                    },
                    touched: {
                        money: true,
                    }
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='recharge-form'>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    formikProps => {
                        const { isSubmitting } = formikProps;

                        return (
                            <Form>
                                <FastField 
                                    name="money"
                                    label="Amount of money"
                                    component={InputField}
                                />
                                
                                <FormGroup className="form-group__submit">
                                    <Button type="submit" className="btn-submit">
                                        { isSubmitting ? <Loading /> : 'RECHARGE'}
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

export default RechargeForm;