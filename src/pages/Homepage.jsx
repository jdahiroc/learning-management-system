// img
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/profileIcon.png";
import bannerImg from "../assets/banner.png";
import headerLine from "../assets/headerLine.png";
import courseLogo from "../assets/CourseLogo.png";
import profileIcon from "../assets/profileIcon.png";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

//css
import "../styles/homepage.css";

const Homepage = () => {
  const [modal, setModal] = useState(false);

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  // Modal Function
  const toggleModal = () => {
    setModal(!modal);
  };

  //logout function
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out!");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {/* NAVIGATIONS */}
      <div className="navigation-container">
        {/* nav-logo */}
        <div className="logo-container">
          <img src={logoBrand} alt="logoBrand" />
        </div>
        <div className="navigation-controls">
          <ul>
            <li>ALL COURSES</li>
            <li>ABOUT US</li>
            <li>CONTACT US</li>
          </ul>
        </div>
        {/* Navigation Profile */}
        <div onClick={toggleModal} className="profile-container">
          <div className="profile-icon-container">
            <img src={userIcon} alt="profile-icon" />
          </div>
          <div className="profile-name-container">
            <h4>{user && user.displayName}</h4>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <div className={`overlay-profileIcon  ${modal ? "show" : ""}`}>
        <div className="close-btn-container">
          <button className="profile-closebtn" onClick={toggleModal}>
            &times;
          </button>
        </div>
        <div className="profileIcon-modal-container">
          <div className="profile-icon-container">
            <img src={profileIcon} alt="profile-icon" />
          </div>
          <div className="userName-container">
            <h2>{user && user.displayName}</h2>
          </div>
          <div className="email-container">
            <p>{user && user.email}</p>
          </div>
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="banner-container">
        <div className="banner-img">
          <img src={bannerImg} alt="LMS Banner" />
        </div>
      </div>

      {/* Header */}
      <div className="header-container">
        <h2>Courses</h2>
      </div>
      <div className="headerLine-container">
        <img src={headerLine} alt="headerLine" />
      </div>

      {/* Course Tiles */}
      <div className="box">
        <div className="img-course-container">
          <img src={courseLogo} alt="Course Logo" />
        </div>
        <div className="course-user-container">
          <span>John Mike S. Wayne</span>
        </div>
        <div className="course-title-container">
          <span>Health Course 1</span>
        </div>
        <div className="course-description-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus animi natus maiores obcaecati incidunt dolore
            dignissimos mollitia adipisci amet optio. Voluptas, deleniti!
            Voluptatum repellat maiores temporibus, earum nihil non eos.
          </p>
        </div>
      </div>

      <div className="box3">
        <div className="img-course-container">
          <img src={courseLogo} alt="Course Logo" />
        </div>
        <div className="course-user-container">
          <span>John Mike S. Wayne</span>
        </div>
        <div className="course-title-container">
          <span>Health Course 1</span>
        </div>
        <div className="course-description-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus animi natus maiores obcaecati incidunt dolore
            dignissimos mollitia adipisci amet optio. Voluptas, deleniti!
            Voluptatum repellat maiores temporibus, earum nihil non eos.
          </p>
        </div>
      </div>
    </>
  );
};

export default Homepage;
