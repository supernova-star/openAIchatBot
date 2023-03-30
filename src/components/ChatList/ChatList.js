import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";

const ChatList = ({
  conversations,
  selectedConversation,
  deleteConversation,
  deleteAll,
}) => {
  const [list, setList] = useState(conversations);

  useEffect(() => {
    setList(conversations);
  }, [conversations]);
  const selectConversation = (chatId) => {
    selectedConversation(chatId);
  };
  const handleDelete = (event, chatId) => {
    event.stopPropagation();
    deleteConversation(chatId);
  };
  return (
    <Stack direction="column">
      <Box
        alignSelf="left"
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          position: "sticky",
          color: "aure",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          mt: 1,
          pt: 1,
          pb: 2,
          pl: 0,
        }}
      >
        <ChatBubbleRoundedIcon
          fontSize="large"
          sx={{ ml: 1, mr: 1, color: "#00BFFF" }}
        />
        <Typography variant="h5" color="#00BFFF" align="center">
          Chat Box
        </Typography>
      </Box>
      {/* <Divider /> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          mt: 2,
          mb: 2,
        }}
      >
        <ReceiptLongRoundedIcon fontSize="small" sx={{ m: 1, color: "gray" }} />
        <Typography
          variant="body1"
          color="GrayText"
          component="h5"
          align="left"
          sx={{ fontStyle: "italic" }}
        >
          Conversations
        </Typography>
        {conversations.length > 1 && (
          <Button
            variant="contained"
            onClick={deleteAll}
            sx={{
              backgroundColor: "#00BFFF",
              "&:hover": {
                backgroundColor: "#00BFFF",
              },
              ml: 1,
            }}
            size="small"
            endIcon={
              <DeleteSweepRoundedIcon
                color="default"
                aria-label="send message"
                size="small"
              />
            }
          >
            Delete All
          </Button>
        )}
      </Box>
      {list.map((chat) => (
        <Box
          key={chat.id}
          onClick={() => selectConversation(chat.id)}
          alignSelf="center"
          sx={{
            cursor: "pointer",
            minHeight: "2rem",
            bgcolor: "white",
            width: "85%",
            color: "grey.800",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: "8px 15px",
            // borderBottom: "1px solid #05445e33",
            textAlign: "left",
            fontSize: "0.875rem",
            fontWeight: "700",
            "&:hover": {
              backgroundColor: "whitesmoke",
            },
          }}
        >
          <div className="eachConv">
            <MessageIcon
              sx={{ marginRight: 1, color: "#00BFFF" }}
              fontSize="small"
            />
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
              }}
            >
              {chat.title}
            </Typography>
          </div>
          <Stack direction="row" alignItems="flex-end" sx={{ width: "9em" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", color: "gray" }}
            >
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                {chat.date}
              </Typography>
              <Typography variant="body2">{chat.time}</Typography>
            </Box>
            {chat.id !== 1001 && (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={(event) => handleDelete(event, chat.id)}
              >
                <DeleteRoundedIcon
                  sx={{ ml: 1, color: "gray", borderLeft: "1px solid gray" }}
                />
              </IconButton>
            )}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default ChatList;
