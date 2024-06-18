import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/AI_TUTOR_Logo.png";
import addBtn from "../../assets/images/add-30.png";
import msgIcon from "../../assets/images/message.svg";
import sendBtn from "../../assets/images/send.svg";
import userIcon from "../../assets/images/user_icon.png";
import aiTutor from "../../assets/images/ai_tutor.png";

const AIContainer = ({ closeSidebar }) => {
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
                <button className="midBtn"><img src={addBtn} alt="" className="addBtn" />New Chat</button>
                <div className="upppersideBottom">
                    <button className="query"><img src={msgIcon} alt="" />Explain Current Question</button>
                    <button className="query"><img src={msgIcon} alt="" />Topics involed Question</button>
                </div>
            </div>
          </div>
          <div className="main_AI">
            <div className="chats">
                <div className="chat">
                    <img className="chatimg" src={userIcon} alt="" /><p className="text">What color is the sound of a banana? This question doesn't make logical sense as sounds don't have colors.</p>
                </div>
                <div className="chat bot">
                    <img className="chatimg" src={aiTutor} alt="" /><p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis temporibus ullam nulla ut aliquam. Officiis repudiandae incidunt reiciendis ratione voluptatum aut optio. Voluptatem a quas quo aperiam nulla sint dicta? Ipsam vel repellat neque qui doloremque sequi rem aperiam eius vero quo amet, quidem suscipit corporis quia porro repellendus laborum ullam ab sapiente voluptatibus incidunt! Totam omnis consectetur, rem vel vero repellat sed iste obcaecati veniam incidunt nobis labore, a debitis minus eos, eaque culpa quas quod facilis fugit aut eius neque consequatur voluptate. Cumque eos amet molestiae rem, sit magnam inventore praesentium dolorem maxime repellendus, nihil quaerat. Nulla, quis?</p>
                </div>
            </div>
            <div className="chatFooter">
                <div className="inp">
                    <input type="text" placeholder="Discuss with AI Tutor..." name="" id="" /><button className="send"><img src={sendBtn} alt="" /></button>
                </div>
                <p>AI Tutor may provide inaccurate answers, because it is  experimental</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIContainer;
