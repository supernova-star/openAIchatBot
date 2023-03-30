import React, { memo, useEffect, useRef, useState } from "react";
import "./ChatBox.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatGPTSVG from "../../assets/chatgpt-icon.svg";
import ReactMarkdown from "react-markdown";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getAllCompletionsForTurboModel } from "../../chatgptAPI";
import ChatBubble from "../../assets/chatBubble.svg";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

const ChatBox = ({ selectedConversation, updateSelectedConversation }) => {
  const messagesListRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState(selectedConversation.chatLogs);

  useEffect(() => {
    if (selectedConversation) {
      setChatLog(selectedConversation.chatLogs);
    }
  }, [selectedConversation]);

  const chatBubble = () => {
    return <img className="chatGPTbubble" src={ChatBubble} alt="Chat bubble" />;
  };

  useEffect(() => {
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  }, [messagesListRef, chatLog]);

  const handleSubmit = async () => {
    if (inputValue) {
      const newLogs = [
        ...chatLog,
        {
          user: "Me",
          message: inputValue,
        },
        {
          user: "Chat Bot",
          message: chatBubble(),
        },
      ];
      setChatLog(newLogs);
      setInputValue("");
      // const newchatlogs = newLogs.map((message) => message.message).join("\n");
      // const newmsg = await getAllCompletions(newchatlogs, currentModel);
      const newmsg = await getAllCompletionsForTurboModel(inputValue);
      if (newmsg) {
        await newLogs.pop();
        const chatArray = [
          ...newLogs,
          {
            user: "ChatGPT",
            message: `${newmsg}`,
          },
        ];
        await setChatLog(chatArray);
        updateSelectedConversation(chatArray);
      }
    }
  };

  const handleInputOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (inputValue) {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <Box
        ref={messagesListRef}
        className="chat-message"
        sx={{
          // boxShadow: 1,
          height: "60vh",
          overflow: "auto",
          bgcolor: "#fff",
          // borderRadius: 2,
        }}
      >
        {chatLog.map((chat, index) => (
          <div
            key={index}
            className={`msg ${chat.user === "Me" ? "me" : "gpt"}`}
          >
            {chat.user === "Me" ? (
              <>
                <Box
                  sx={{
                    maxWidth: "30rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: "15rem",
                      alignSelf: "flex-end",
                      fontStyle: "italic",
                      color: "gray",
                      p: 1,
                    }}
                  >
                    <span>{chat.user}</span>
                  </Typography>
                  <Typography
                    sx={{
                      // boxShadow: 3,
                      maxWidth: "30rem",
                      bgcolor: "fff", //#C0C0C0", //#189AB4",
                      border: "1px solid #00BFFF",
                      color: "#222",
                      p: 1,
                      borderRadius: 3,
                      borderTopRightRadius: 2,
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                    }}
                  >
                    {chat.message}
                  </Typography>
                </Box>
                <div className="myAvatar">
                  <AccountCircleIcon sx={{ fontSize: 40 }} />
                </div>
              </>
            ) : (
              <>
                <div className="chatGPTAvatar">
                  <SmartToyOutlinedIcon sx={{ fontSize: 40 }} />
                </div>
                {/* <img
                  className="chatGPTAvatar"
                  src={ChatGPTSVG}
                  alt="Chat gpt Logo"
                  color="green"
                /> */}
                <Box
                  sx={{
                    maxWidth: "30rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: "16rem",
                      alignSelf: "flex-start",
                      fontStyle: "italic",
                      color: "gray",
                      p: 1,
                    }}
                  >
                    {chat.user}
                  </Typography>
                  <Typography
                    sx={{
                      boxShadow: 3,
                      maxWidth: "30rem",
                      bgcolor: "#00BFFF", // "#05445E",
                      color: "azure",
                      p: 1,
                      borderRadius: 3,
                      borderTopLeftRadius: 2,
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                    }}
                  >
                    <div className="gptChat">
                      {typeof chat.message === "object" ? (
                        chat.message
                      ) : (
                        <ReactMarkdown>{chat.message}</ReactMarkdown>
                      )}
                    </div>
                  </Typography>
                </Box>
              </>
            )}
          </div>
        ))}
      </Box>
      <Stack direction="row" spacing={2} margin={2} alignItems="center">
        <TextField
          id="outlined-basic"
          label="Text Message"
          variant="outlined"
          size="small"
          value={inputValue}
          className="chat-input"
          onChange={handleInputOnChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#00BFFF",
            "&:hover": {
              backgroundColor: "#00BFFF",
            },
          }}
          endIcon={
            <SendIcon color="default" aria-label="send message" size="large" />
          }
        >
          Send
        </Button>
      </Stack>
    </>
  );
};

export default memo(ChatBox);
