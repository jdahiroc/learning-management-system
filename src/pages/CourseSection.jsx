// img
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/MaleUser.png";
import courseLogo from "../assets/CourseLogo.png";
import addbutton from "../assets/AddButton.png";
import lessons from "../assets/Lessons.png";
import dots from "../assets/dots.png";
import profileIcon from "../assets/profileIcon.png";
import closebtt from "../assets/Close.png";

// CSS
import "../styles/coursesection.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const CourseSection = () => {
  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [lessonModal, setLessonModal] = useState(false);

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  // Modal Function
  const toggleModal = () => {
    setModal(!modal);
  };

  //Profile Modal Function
  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  //Lesson Modal Function
  const toggleLessonModal = () => {
    setLessonModal(!lessonModal);
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
        <div onClick={toggleProfileModal} className="profile-container">
          <div className="profile-icon-container">
            <img src={userIcon} alt="profile-icon" />
          </div>
          <div className="profile-name-container">
            <h4>{user && user.displayName}</h4>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <div className={`overlay-profileIcon  ${profileModal ? "show" : ""}`}>
        <div className="close-btn-container">
          <button className="profile-closebtn" onClick={toggleProfileModal}>
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
      <div className="course_banner">
        <div className="course_img">
          <img src={courseLogo} alt="Course Logo" className="course_logo" />
          <div className="course_text">John Mike S. Wayne</div>
          <div className="course_text2">Health Course 1</div>
        </div>
      </div>

      {/*Course Title*/}
      <div className="course-header">
        <h3>Course Stream</h3>
        <div className="course_underline"></div>
      </div>

      {/* Modal Button */}
      <div className="addbutt_container" onClick={toggleModal}>
        <img src={addbutton} alt="addbutton" />
      </div>

      <div className={`overlay-course  ${modal ? "show" : ""}`}>
        <button className="upload_lesson" onClick={toggleLessonModal}>
          Upload Lesson
        </button>
        <button className="upload_assessment">Upload Assessment</button>
      </div>

      {/* Lesson Modal */}
      <div className={`overlay-lesson  ${lessonModal ? "show" : ""}`}>
        <div className="container_button">
          <img
            className="closebutton_lesson"
            src={closebtt}
            alt="Close Button"
            onClick={toggleLessonModal}
          ></img>
        </div>

        <form>
          <div className="content-uploadlesson">
            <div className="header-lesson">
              <h3 className="lesson-title">Upload Materials</h3>
              <button className="add-lesson">Post</button>
            </div>
            <div className="lesson_underline"></div>

            <input type="text" className="lesson-input" placeholder="Title" />
            <input
              type="text"
              className="lesson-desc"
              placeholder="Description"
            />
            <h3 className="lesson-attach">Attach</h3>
            <button className="upload-butt">Upload</button>
          </div>
        </form>
      </div>

      {/*Course Materials*/}
      <div className="course_content-container">
        <div className="course-container">
          <table className="course_materials">
            <tr>
              <td>
                <button className="button_course">
                  <img
                    className="lesson_image"
                    src={lessons}
                    alt="lesson"
                  ></img>
                  <img className="lesson1_dot" src={dots} alt="dots"></img>
                  <div className="lesson1_text">Lesson 1: Lesson Title</div>
                  <div className="lesson1_text2">April 15, 2024</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="button_course">
                  <img
                    className="lesson_image2"
                    src={lessons}
                    alt="lesson"
                  ></img>
                  <img className="lesson2_dot" src={dots} alt="dots"></img>
                  <div className="lesson2_text">Lesson 2: Lesson Title</div>
                  <div className="lesson2_text2">April 16, 2024</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="button_course">
                  <img
                    className="lesson_image3"
                    src={lessons}
                    alt="lesson"
                  ></img>
                  <img className="lesson3_dot" src={dots} alt="dots"></img>
                  <div className="lesson3_text">Lesson 3: Lesson Title</div>
                  <div className="lesson3_text2">April 17, 2024</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="button_course">
                  <img
                    className="lesson_image4"
                    src={lessons}
                    alt="lesson"
                  ></img>
                  <img className="lesson4_dot" src={dots} alt="dots"></img>
                  <div className="lesson4_text">Lesson 4: Lesson Title</div>
                  <div className="lesson4_text2">April 18, 2024</div>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="button_course">
                  <img
                    className="lesson_image5"
                    src={lessons}
                    alt="lesson"
                  ></img>
                  <img className="lesson5_dot" src={dots} alt="dots"></img>
                  <div className="lesson5_text">Lesson 5: Lesson Title</div>
                  <div className="lesson5_text2">April 19, 2024</div>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};
export default CourseSection;
