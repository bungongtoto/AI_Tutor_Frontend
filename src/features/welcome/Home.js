import React from "react";

import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/images/homePage_lion.png";
import aibrain from "../../assets/images/ai_brain.png";
import ImgObj from "../../assets/images/achievementPage_lion.png";
import Imgboy from "../../assets/images/boy.png";
import Imggirl from "../../assets/images/girl.png";
import Imggirl2 from "../../assets/images/girl2.png";
import { FaBook } from "react-icons/fa";
import { AiFillBook } from "react-icons/ai";
import { RiQuestionnaireLine } from "react-icons/ri";
import MissionTile from "./MissionTile";
import { FaPersonShelter } from "react-icons/fa6";
import { SiSololearn } from "react-icons/si";
import { GrDocumentPerformance } from "react-icons/gr";
import SectionIntroTile from "./SectionIntroTile";
import ObjectiveTile from "./ObjectiveTile";
import ProfileTile from "./ProfileTile";

const Home = () => {
  const profiles = [
    {
      image: Imgboy,
      name: "NAME TOTO 1",
      position: "POSITION 1",
    },
    {
      image: Imggirl,
      name: "NAME TOTO 2",
      position: "POSITION 2",
    },
    {
      image: Imggirl2,
      name: "NAME TOTO 3",
      position: "POSITION 3",
    },
    // Add more profiles as needed
  ];
  return (
    <main>
      <a href="#header" className="ai-chat-button">
        UP
      </a>

      <section id="header" className="second_header">
        <div className="overlay"></div>
        <div className="content two_side_grid">
          <div className="content_container gap">
            <h1 className="home_h1">Beyond Borders Beyond Biases</h1>
            <h1 className="blue_color_h1">AI TUTOR</h1>
            <h2>For a more equitable exam landscape</h2>
          </div>
          <LazyLoadImage src={logo} className="home-image" alt="" />
        </div>
      </section>

      <section id="aboutus" className="content_container">
        <div className="mission_container">
          <MissionTile
            icon={<FaPersonShelter />}
            title={"Personalised Learning"}
          />
          <MissionTile icon={<SiSololearn />} title={"Adaptive Instructions"} />
          <MissionTile
            icon={<GrDocumentPerformance />}
            title={"Impact Performance"}
          />
        </div>
        <hr />
        <div className="two_side_grid gap">
          <div className="center">
            <LazyLoadImage
              src={aibrain}
              className="floating-image home-image"
              width={"500px"}
              height={"600px"}
              alt=""
            />
          </div>
          <div className="content_container gap">
            <SectionIntroTile title={"About Us"} />
            <div className="section_sub_container">
              <p className="paragraph">
                Struggling to navigate the vast amount of online resources while
                prepping for exams like GCE A/O Levels or concours? Our AI tutor
                service is here to bridge the gap! We provide a comprehensive
                online platform stocked with high-quality learning materials
                specifically tailored to your chosen exam. But that's not all!
                You'll also benefit from the personalized guidance of an AI
                tutor, available 24/7 to answer your questions, explain complex
                concepts, and offer targeted practice exercises. Imagine having
                a dedicated study companion who adapts to your learning pace,
                identifies your strengths and weaknesses, and keeps you
                motivated throughout your exam journey. With our AI tutor
                service, you can conquer your exams with confidence!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="objectives" className="content_container">
        <div className="two_side_grid gap">
          <div className="content_container gap">
            <SectionIntroTile title={"Our Objectives"} />
            <div className="content_container gap section_sub_container">
              <ObjectiveTile />
              <ObjectiveTile />
              <ObjectiveTile />
            </div>
          </div>
          <div className="center">
            <LazyLoadImage
              src={ImgObj}
              className="floating-image home-image"
              width={"400px"}
              height={"500px"}
              alt=""
            />
          </div>
        </div>
      </section>

      <section id="numbers" className="content_container">
        
          <SectionIntroTile title={"Our Numbers"} />
          <div className="mission_container">
            <MissionTile icon={<FaBook />} title={"3+ Exams"} />
            <MissionTile icon={<AiFillBook />} title={"20+ Courses"} />
            <MissionTile
              icon={<RiQuestionnaireLine />}
              title={"300+ Questions"}
            />
          </div>
        
      </section>

      <section id="team" className="content_container">
        <SectionIntroTile title={"Our Team"} />
        <div>
          <ProfileTile profiles={profiles} />
        </div>
      </section>
    </main>
  );
};

export default Home;
