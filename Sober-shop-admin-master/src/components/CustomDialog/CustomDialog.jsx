import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, } from "@mui/material";

export function CustomDialog({ title, open, content, actions }) {
	
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          padding: "10px",
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: "1px solid #cccccc" }} >
        <Typography sx={{ fontWeight: 600, textAlign: "center", fontSize: "20px" }}>{title}</Typography>
      </DialogTitle>
			<DialogContent sx={{ borderBottom: "1px solid #cccccc", margin: "10px 0" }}>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}