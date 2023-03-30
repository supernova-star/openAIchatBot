import React, { memo, useEffect, useState } from "react";
import {
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { getChatModels } from "../../chatgptAPI";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import "./Header.scss";
import DialogBox from "../Dialog/Dialog";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChatList from "../ChatList/ChatList";

const Header = ({
  selectedChat,
  clearChat,
  sendConversation,
  conversations,
  deleteConversation,
  deleteAll,
  selectedConversation,
  desktopView,
}) => {
  const [chatModels, setChatModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [title, setTitle] = useState(selectedChat.title);
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      setTitle(selectedChat.title);
    }
  }, [selectedChat]);

  const getModels = async () => {
    const models = await getChatModels();
    const newModels = models.map((cm) => cm.id);
    await setChatModels(newModels);
    // const newchatlogs = defaultChatLogs
    //   .map((message) => message.message)
    //   .join("\n");
    // const newmsg = await getAllCompletions(newchatlogs, currentModel);
    // await setChatLog([
    //   ...defaultChatLogs,
    //   {
    //     user: "ChatGPT",
    //     message: newmsg,
    //   },
    // ]);
  };

  // const handleChange = (event) => {
  //   setCurrentModel(event.target.value);
  // };

  const saveChat = () => {
    setOpen(true);
  };

  useEffect(() => {
    getModels();
  }, []);

  const closeDialogBox = () => {
    setOpen(false);
  };

  const saveConversation = (title) => {
    sendConversation(title);
  };
  const handleDrawer = () => {
    setIsDrawerOpen(true);
  };
  const getMenu = () => (
    <div style={{ width: 300 }} onClick={() => setIsDrawerOpen(true)}>
      <ChatList
        conversations={conversations}
        selectedConversation={selectedConversation}
        deleteConversation={deleteConversation}
        deleteAll={deleteAll}
      />
    </div>
  );

  return (
    <div className="headerContainer" data-testid="header-wrapper">
      <div className="headerTitle">
        <div className="headerLeftItems">
          {!desktopView && (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={handleDrawer}
            >
              <MenuRoundedIcon sx={{ color: "gray" }} size="extraSmall" />
            </IconButton>
          )}
          <Drawer
            open={isDrawerOpen}
            anchor={"left"}
            onClose={() => setIsDrawerOpen(false)}
          >
            {getMenu()}
          </Drawer>
          <BorderColorRoundedIcon
            fontSize="extraSmall"
            sx={{ m: 1, color: "gray" }}
          />
          <Typography
            variant="body1"
            color="GrayText"
            component="h5"
            align="left"
            sx={{ fontStyle: "italic" }}
          >
            {title}
          </Typography>
        </div>
        <div className="headerRightItems">
          {selectedChat.title === "New Chat" && (
            <Button
              variant="contained"
              onClick={saveChat}
              sx={{
                backgroundColor: "#00BFFF",
                "&:hover": {
                  backgroundColor: "#00BFFF",
                },
                mr: 2,
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
          )}
          {selectedChat.chatLogs.length !== 0 && (
            <Button
              variant="contained"
              onClick={() => clearChat([])}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #00BFFF",
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
              Clear Chat
            </Button>
          )}
        </div>
      </div>
      <DialogBox
        isOpen={open}
        closeModal={closeDialogBox}
        saveConversation={saveConversation}
      />

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        marginBottom={2}
      ></Stack>
    </div>
  );
};

export default memo(Header);
