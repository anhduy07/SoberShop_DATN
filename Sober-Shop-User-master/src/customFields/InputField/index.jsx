import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import './InputField.scss';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};

InputField.defaultProps = {
    type: 'text',
    placeholder: '',
    disabled: false,
    label: '',
}

function InputField(props) {
    const { form, field, type, placeholder, disabled, label } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <FormGroup>
            <Input 
                id={name}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                invalid={!!showError}
                className={`input-field ${ (value === 0 || value) && 'input-active'}`}
            />
            { label && <Label className="label" for={name}>{label}</Label> }
            { showError && <FormFeedback>{errors[name]}</FormFeedback> }
        </FormGroup>
    );
}

export default InputField;