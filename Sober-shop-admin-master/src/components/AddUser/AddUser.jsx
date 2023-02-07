import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import "./addUser.scss";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/FormField/InputField";
import authApi from "api/authApi";
import { useHistory } from "react-router-dom";

export default function AddUser() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required.")
      .min(8, "Minimum of 8 characters")
      .max(20, "Maximum of 20 characters")
      .matches(
        /^[a-zA-Z]{1}[a-zA-Z0-9_]{7,19}$/,
        "Username is not allowed to contain special characters"
      ),
    email: Yup.string()
      .required("Email is required.")
      .email("This is not an email")
      .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Minimum of 8 characters")
      .max(20, "Maximum of 20 characters")
      .matches(
        /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Must have at least 1 special character"
      ),
    confirmPassword: Yup.string()
      .required("")
      .oneOf([Yup.ref("password"), null], "Password does not match."),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const res = await authApi.register(data);
      if (res.success === true) {
        alert("Create account successfully.");
        history.push('/users/users-list');
        reset(initialValues)
      }
      setLoading(false);
    } catch (error) {
      alert("Error")
    }
  };

  return (
    <div className="add-user">
      <h2>create user</h2>
      <div className="add-user__main">
        <div className="add-user__main__content">
          <Box sx={{ width: 600 }}>
            <div className="field-item">
              <p>
                Username <span>*</span>
              </p>
              <InputField name="username" label="Username" control={control} />
            </div>
            <div className="field-item">
              <p>
                Email <span>*</span>
              </p>
              <InputField name="email" label="Email" control={control} />
            </div>
            <div className="field-item">
              <p>
                Password <span>*</span>
              </p>
              <InputField
                name="password"
                type="password"
                label="Password"
                control={control}
              />
            </div>
            <div className="field-item">
              <p>
                Confirm password <span>*</span>
              </p>
              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                control={control}
              />
            </div>
          </Box>
        </div>
        <div className="save-btn" onClick={handleSubmit(onsubmit)}>
          {loading ? <div><CircularProgress size={20} /> create </div> : "create"}
        </div>
      </div>
    </div>
  );
}
