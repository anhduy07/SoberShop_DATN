import React, { useCallback } from "react";
import "./profile.scss";
import avatar from "assets/image/avatar.jpg";
import { FacebookOutlined, Google } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import authApi from "api/authApi";
import { Box } from "@mui/system";
import InputField from "components/FormField/InputField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ProfileMain() {
  const [user, setUser] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const initialValues = {
    fullname: "",
    email: "",
    address: "",
    phoneNumber: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("This is not an email")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
  });
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const getUser = useCallback(async () => {
    const res = await authApi.getInfo();
    setUser(res.user);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setValue("fullname", user?.fullname ? user.fullname : "");
    setValue("email", user?.email ? user.email : "");
    setValue("address", user?.address ? user.address : "");
    setValue("phoneNumber", user?.phoneNumber ? user.phoneNumber : "");
  }, [setValue, user]);

  const handleUpdateInfo = async (data) => {
    try {
      const res = await authApi.updateInformation(data);
			if (res) {
				alert("Update successfully");
        getUser();
        setIsEdit(false);
        reset(initialValues);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row profile-container">
      <div className="col-4 col-md-12 profile-container__left">
        <div className="profile-container__left__top">
          <img src={avatar} alt="" />
          <h4>{user?.username}</h4>
          <p>{user?.email}</p>
          <div className="user-social">
            <FacebookOutlined className="fb-icon" />
            <Google className="gg-icon" />
          </div>
        </div>
        <hr />
        <div className="profile-container__left__bottom">
          <h4>Employee Status</h4>
          <div className="user-status">
            <h5>
              Performance <span>80%</span>
            </h5>
            <div className="user-status__item">
              <div style={{ width: "80%", backgroundColor: "#ff8084" }}></div>
            </div>
          </div>
          <div className="user-status">
            <h5>
              Overtime <span>60%</span>
            </h5>
            <div className="user-status__item">
              <div style={{ width: "60%", backgroundColor: "#38ada9" }}></div>
            </div>
          </div>
          <div className="user-status">
            <h5>
              Bonus <span>30%</span>
            </h5>
            <div className="user-status__item">
              <div style={{ width: "30%", backgroundColor: "#888888" }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-8 col-md-12 profile-container__right">
        <h3>Profile</h3>
        <div className="profile-container__right__main">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Fullname: </TableCell>
                <TableCell>{user?.fullname ? user.fullname : "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email: </TableCell>
                <TableCell>{user?.email ? user.email : "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone number: </TableCell>
                <TableCell>
                  {user?.phoneNumber ? user.phoneNumber : "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address: </TableCell>
                <TableCell>{user?.address ? user.address : "-"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="btn-add" onClick={() => setIsEdit(true)}>
          edit profile
        </div>
      </div>
      {isEdit && (
        <Dialog
          open={isEdit}
          PaperProps={{
            style: {
              padding: "10px",
            },
          }}
        >
          <DialogTitle sx={{ borderBottom: "1px solid #cccccc" }}>
            <Typography
              sx={{ fontWeight: 600, textAlign: "center", fontSize: "20px" }}
            >
              Update Profile
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{ borderBottom: "1px solid #cccccc", margin: "10px 0" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputField
                name="fullname"
                label="Fullname"
                control={control}
                style={{ width: 300 }}
              />
              <InputField
                name="email"
                label="Email"
                control={control}
                style={{ width: 300 }}
              />
              <InputField
                name="address"
                label="address"
                control={control}
                style={{ width: 300 }}
              />
              <InputField
                name="phoneNumber"
                label="Phone"
                control={control}
                style={{ width: 300 }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Box
              width="100%"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ marginRight: "1rem", color: "#fff" }}
                onClick={handleSubmit(handleUpdateInfo)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
