import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import authApi from "api/authApi";
import { CustomDialog } from "components/CustomDialog/CustomDialog";

const style = {
  backgroundColor: "#ffffff",
  boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)",
  padding: "15px",
  borderRadius: "15px",
  marginBottom: "15px",
};

const createUser = {
  width: "150px",
  color: "#fff",
  backgroundColor: "#38ada9",
  borderRadius: "5px",
  float: "right",
  textAlign: "center",
  textTransform: "uppercase",
  margin: "20px 0 30px 0",
  padding: "10px 15px",
};

const title = {
  fontWeight: 600,
};

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [listAccount, setListAccount] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
    totalPage: 1,
  });
  const [modalConfirm, setModalConfirm] = useState(false);
  const [accountItem, setAccountItem] = useState();

  const getListAcc = useCallback(async () => {
    setLoading(true);
    const res = await authApi.getUser({
      page: pagination.page,
      limit: pagination.limit,
    });
    setListAccount(res.data);
    setPagination({
      page: res.pagination.page,
      limit: res.pagination.limit,
      total: res.pagination.total,
      totalPage: res.pagination.totalPage,
    });
    setLoading(false);
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    getListAcc();
  }, [getListAcc]);

  const handleChangePage = (e, page) => {
    setPagination((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleDeleteAccount = async () => {
    try {
      if (!accountItem) return;
      const res = await authApi.deleteUser(accountItem._id);
      if (res) {
        alert("Delete account successfully");
        getListAcc();
      }
      setModalConfirm(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="user-list">
      <h2 style={{ marginBottom: "20px", textTransform: "uppercase" }}>
        List Account
      </h2>
      <div style={style}>
        <Link to="/users/create-user" style={createUser}>
          create user
        </Link>
        <div className="user-list__detail">
          {loading ? (
            <CircularProgress size={20} />
          ) : listAccount.length === 0 ? (
            <div>No account</div>
          ) : (
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#95afc0" }}>
                    <TableCell style={title}>Username</TableCell>
                    <TableCell style={title}>Email</TableCell>
                    <TableCell style={title}>Fullname</TableCell>
                    <TableCell style={title}>Phone</TableCell>
                    <TableCell style={title}>Address</TableCell>
                    <TableCell style={title}>Role</TableCell>
                    <TableCell style={title}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listAccount.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.fullname}</TableCell>
                        <TableCell>{item.phoneNumber}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>
                          <div
                            style={{ color: "#ff8084" }}
                            onClick={() => {
                              setModalConfirm(true);
                              setAccountItem(item);
                            }}
                          >
                            <Delete />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Pagination
            color="primary"
            sx={{ mt: 2 }}
            defaultCurrent={pagination.page}
            total={pagination.total}
            count={pagination.totalPage}
            onChange={handleChangePage}
          />
        </div>
      </div>
      {modalConfirm && (
        <CustomDialog
          open={modalConfirm}
          title="Confirm delete"
          content={
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Do you want to delete this account?
            </Typography>
          }
          actions={
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
                onClick={handleDeleteAccount}
              >
                Đồng ý
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => setModalConfirm(false)}
              >
                Hủy
              </Button>
            </Box>
          }
        />
      )}
    </div>
  );
}
