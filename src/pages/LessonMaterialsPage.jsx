// React Imports
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// Material UI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// CSS
import "../styles/lessonmaterialsPage.css";

// Images
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/profileIcon.png"; // Changed from profileIcon to userIcon
import LessonLogo from "../assets/Lessons.png";
import file from "../assets/file.png"

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const LessonMaterialsPage = () => {
  const [profileModal, setProfileModal] = useState(false);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();

  const [lesson, setLesson] = useState(null); // State to store lesson data

  // Function to fetch lesson data
  const fetchLessonData = async () => {
    try {
      if (user && user.uid && lessonId) {
        const lessonDocRef = doc(
          db,
          `Courses/${user.uid}/UserCourses/${courseId}/lessonMaterials`,
          lessonId
        );
        const lessonDocSnap = await getDoc(lessonDocRef);
        if (lessonDocSnap.exists()) {
          setLesson(lessonDocSnap.data());
        } else {
          console.log("No such lesson document!");
        }
      }
    } catch (error) {
      console.error("Error fetching lesson data:", error);
    }
  };

  useEffect(() => {
    fetchLessonData(); // Fetch lesson data when component mounts
  }, [user, courseId, lessonId]); // Trigger fetch when user, courseId, or lessonId changes

  // Toggle Profile Modal Function
  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  // Logout Function
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
      {/* Navigation */}
      <div className="navigation-container">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/admin/home">
            <img src={logoBrand} alt="logoBrand" loading="lazy" />
          </Link>
        </div>
        {/* Navigation Controls */}
        <div className="navigation-controls">
          <ul>
            <Link to="/admin/page/course">
              <li>COURSES</li>
            </Link>
          </ul>
        </div>
        {/* Profile Icon */}
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
      <div className={`overlay-profileIcon ${profileModal ? "show" : ""}`}>
        <div className="close-btn-container">
          <button className="profile-closebtn" onClick={toggleProfileModal}>
            &times;
          </button>
        </div>
        <div className="profileIcon-modal-container">
          <div className="profile-icon-container">
            <img src={userIcon} alt="profile-icon" />
          </div>
          <div className="userName-container">
            <h2>Hi, {user && user.displayName}!</h2>
          </div>
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="course2-container">
        {lesson ? (
          <div className="content-course2">
            <img src={LessonLogo} alt="logoBrand" className="course2-logo1" />
            <h3 className="c2-lesson-title">{lesson.lessonTitle}</h3>
            <h3 className="c2-lesson-date">
              {lesson.addedOn &&
                new Date(lesson.addedOn.toDate()).toLocaleDateString()}
            </h3>

            <div className="course2-underline2"></div>

            <Link to={lesson.lessonAttachments} target="_blank">
              <div className="c2-lessons-content">
                <div className="c2-lessons1">
                  <img
                    src={file}
                    className="thumbnail1-img"
                    alt="thumbnail"
                  />
                  <h3 className="c2-lesson1-title">{lesson.lessonTitle}</h3>
                  <h3 className="c2-lesson1-description">
                    {lesson.lessonDescription}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="loading-container">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        )}
      </div>
    </>
  );
};

export default LessonMaterialsPage;
