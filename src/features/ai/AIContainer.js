import React, { useEffect, useRef, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/AI_TUTOR_Logo.png";
import addBtn from "../../assets/images/add-30.png";
import msgIcon from "../../assets/images/message.svg";
import sendBtn from "../../assets/images/send.svg";
import { sendMsgToOpenAI } from "./openai";
import { PulseLoader } from "react-spinners";
import ChatTile from "./ChatTile";

const AIContainer = ({ closeSidebar, question }) => {
  const msgEnd = useRef(null);
  const [input, setIput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi, i am AI Tutor. How can I assist you?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    setIsLoading(true);
    const text = input;
    setIput("");
    setMessages([...messages, { text, isBot: false }]);
    const response = await sendMsgToOpenAI(text, messages.slice(-2));
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
      {
        text: response,
        isBot: true,
      },
    ]);
    setIsLoading(false);
  };

  const handleExplain = async () => {
    setIsLoading(true);
    const text = "explain the current question";
    setIput("");
    setMessages([...messages, { text, isBot: false }]);
    const response = await sendMsgToOpenAI(
      text + " " + question,
      messages.slice(-2)
    );
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
      {
        text: response,
        isBot: true,
      },
    ]);
    setIsLoading(false);
  };

  const handleTopics = async () => {
    setIsLoading(true);
    const text = "What topics are involved in the current question ?";
    setIput("");
    setMessages([...messages, { text, isBot: false }]);
    const response = await sendMsgToOpenAI(
      text + " " + question,
      messages.slice(-2)
    );
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
      {
        text: response,
        isBot: true,
      },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <button className="close-button" onClick={closeSidebar}>
        Close
      </button>
      <div className="sidebar-content">
        <div className="AI_APP">
          <div className="AI_container_sidebar">
            <div className="upperside">
              <LazyLoadImage
                src={logo}
                className="floating-image"
                width={"150px"}
                height={"50px"}
                alt=""
              />
            </div>
            <div className="lowerside">
              <button
                className="midBtn"
                onClick={() =>
                  setMessages([
                    {
                      text: "Hi, i am AI Tutor. How can I assist you?",
                      isBot: true,
                    },
                  ])
                }
              >
                <img src={addBtn} alt="" className="addBtn" />
                New Chat
              </button>
              {question && (
                <div className="upppersideBottom">
                  <button onClick={handleExplain} className="query">
                    <img src={msgIcon} alt="" />
                    Explain Current Question
                  </button>
                  <button onClick={handleTopics} className="query">
                    <img src={msgIcon} alt="" />
                    Topics involed Question
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="main_AI">
            <div className="chats">
              {messages.map((message, i) => {
                return <ChatTile key={i} message={message} />;
              })}
              {isLoading && <PulseLoader color="blue" />}
              <div ref={msgEnd} />
            </div>
            <div className="chatFooter">
              <div className="inp">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setIput(e.target.value);
                  }}
                  placeholder="Discuss with AI Tutor..."
                  name=""
                  id=""
                />
                <button onClick={handleSend} className="send">
                  <img src={sendBtn} alt="" />
                </button>
              </div>
              <p>
                AI Tutor may provide inaccurate answers, because it is
                experimental
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIContainer;
