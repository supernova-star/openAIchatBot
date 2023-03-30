import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import "./Dialog.scss";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogBox = ({ isOpen, closeModal, saveConversation }) => {
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClose = () => {
    closeModal();
    setTitle("");
  };

  const handleSave = () => {
    saveConversation(title);
    closeModal();
    setTitle("");
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <div className="dialogContainer">
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="body3" color="gray" sx={{ fontStyle: "italic" }}>
            Save Conversation
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            sx={{ width: "100%" }}
            error={false}
            id="standard-helperText"
            label="Enter Title"
            defaultValue={title}
            onChange={(event) => handleChange(event)}
            helperText="Save conversation with a title."
            variant="standard"
          />
          <div className="dialogActions">
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={title === ""}
              sx={{
                backgroundColor: "#00BFFF",
                width: "50%",
                m: 1,
                ml: 0,
                "&:hover": {
                  backgroundColor: "#00BFFF",
                },
              }}
              endIcon={
                <BookmarkRoundedIcon
                  color="default"
                  aria-label="send message"
                  size="large"
                />
              }
            >
              Save Chat
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #00BFFF",
                width: "50%",
                m: 1,
                mr: 0,
                color: "#222",
                "&:hover": {
                  backgroundColor: "#fff",
                },
              }}
              endIcon={
                <ClearRoundedIcon
                  color="default"
                  aria-label="send message"
                  size="large"
                />
              }
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </div>
    </BootstrapDialog>
  );
};

export default DialogBox;
