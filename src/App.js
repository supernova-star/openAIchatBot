import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import "./App.scss";
import Header from "./components/Header/Header";
import ChatBox from "./components/ChatBox/ChatBox";
import ChatList from "./components/ChatList/ChatList";
import { getCurrentDate, getCurrentTime } from "./utils/getCurrentDate";

const App = () => {
  const initialConversation = {
    id: 1001,
    title: "New Chat",
    date: getCurrentDate(),
    time: getCurrentTime(),
    chatLogs: [
      {
        user: "Chat Bot",
        message: "Hi! How can I help you today?",
      },
    ],
  };
  const [selectedConversation, setSelectedConversation] =
    useState(initialConversation);

  const [conversations, setConversations] = useState([
    {
      id: 1001,
      title: "New Chat",
      date: getCurrentDate(),
      time: getCurrentTime(),
      chatLogs: [
        {
          user: "Chat Bot",
          message: "Hi! How can I help you today?",
        },
      ],
    },
    {
      id: 1002,
      title: "Test2",
      date: getCurrentDate(),
      time: getCurrentTime(),
      chatLogs: [
        {
          user: "Chat Bot",
          message: "hello!",
        },
      ],
    },
    {
      id: 1003,
      title: "Test1",
      date: getCurrentDate(),
      time: getCurrentTime(),
      chatLogs: [
        {
          user: "Chat Bot",
          message: "How are you?!",
        },
      ],
    },
  ]);

  const updateChat = (logs) => {
    const all = conversations.map((chat) => {
      if (chat.id === selectedConversation.id) {
        chat.chatLogs = logs;
        chat.date = getCurrentDate();
        chat.time = getCurrentTime();
      }
      return chat;
    });
    setConversations(all);
  };

  const handleSelectedConversation = (chatId) => {
    const getChat = conversations.find((chat) => chatId === chat.id);
    setSelectedConversation(getChat);
  };

  const updateSelectedChat = (chatArray) => {
    setSelectedConversation({
      ...selectedConversation,
      chatLogs: chatArray,
      date: getCurrentDate(),
      time: getCurrentTime(),
    });
    updateChat(chatArray);
  };

  const saveConversation = (newTitle) => {
    const obj = {
      id: conversations[conversations.length - 1].id + 1,
      title: newTitle,
      chatLogs: selectedConversation.chatLogs,
      date: getCurrentDate(),
      time: getCurrentTime(),
    };
    const defaultConversation = {
      user: "ChatGPT",
      message: "Hi! How can I help you today?",
      date: getCurrentDate(),
      time: getCurrentTime(),
    };
    // console.log("selectedConversation: ", selectedConversation);
    setSelectedConversation({
      ...conversations[0],
      chatLogs: [defaultConversation],
    });
    conversations[0].chatLogs = [defaultConversation];
    setConversations([...conversations, obj]);
  };

  const handleDeleteConversation = async (chatId) => {
    const index = conversations.findIndex((chat) => chat.id === chatId);
    await conversations.splice(index, 1);
    setConversations([...conversations]);
    if (selectedConversation.id === chatId) {
      setSelectedConversation(conversations[0]);
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDesktopView, setIsDesktopView] = useState(windowWidth > 1300);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    setIsDesktopView(windowWidth > 1300);
  }, [windowWidth]);

  const deleteAllConversations = () => {
    setConversations([initialConversation]);
  };

  return (
    <div className="App">
      {isDesktopView && (
        <Paper className="chat chatModel">
          <ChatList
            conversations={conversations}
            selectedConversation={handleSelectedConversation}
            deleteConversation={handleDeleteConversation}
            deleteAll={deleteAllConversations}
          />
        </Paper>
      )}

      <Paper className="chat chatContainer">
        <Header
          conversations={conversations}
          selectedConversation={handleSelectedConversation}
          deleteConversation={handleDeleteConversation}
          deleteAll={deleteAllConversations}
          selectedChat={selectedConversation}
          clearChat={updateSelectedChat}
          sendConversation={saveConversation}
          desktopView={isDesktopView}
        />
        <ChatBox
          selectedConversation={selectedConversation}
          updateSelectedConversation={updateSelectedChat}
        />
      </Paper>
    </div>
  );
};

export default App;
