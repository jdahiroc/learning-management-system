// img
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/profileIcon.png";
import profileIcon from "../assets/profileIcon.png";
import LessonLogo from "../assets/Lessons.png";
import file from "../assets/file.png"

// Material UI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// React Hooks
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

//css
import "../styles/assessmentPage.css";

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const CourseSection2 = () => {
  const [profileModal, setProfileModal] = useState(false);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { courseId, assessmentId } = useParams();

  const [assessment, setAssessment] = useState(null);

  // Function to fetch assessment data
  const fetchAssessmentData = async () => {
    try {
      if (user && user.uid && assessmentId) {
        const assessmentDocRef = doc(
          db,
          `Courses/${user.uid}/UserCourses/${courseId}/Assessments`,
          assessmentId
        );
        const assessmentDocSnap = await getDoc(assessmentDocRef);
        if (assessmentDocSnap.exists()) {
          setAssessment(assessmentDocSnap.data());
        } else {
          console.log("No such assessment document!");
        }
      }
    } catch (error) {
      console.error("Error fetching assessment data:", error);
    }
  };

  useEffect(() => {
    fetchAssessmentData();
  }, [user, courseId, assessmentId]);

  //Profile Modal Function
  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
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
          <Link to="/admin/home">
            <img src={logoBrand} alt="logoBrand" loading="lazy" />
          </Link>
        </div>
        <div className="navigation-controls">
          <ul>
            <Link to="/admin/page/course">
              <li>COURSES</li>
            </Link>
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
            <h2>Hi, {user && user.displayName}</h2>
          </div>
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      <div className="course2-container">
        {assessment ? (
          <div className="content-course2">
            <img src={LessonLogo} alt="logoBrand" className="course2-logo1" />
            <h3 className="c2-lesson-title">{assessment.assessmentTitle}</h3>
            <h3 className="c2-lesson-date">
              {assessment.addedOn &&
                new Date(assessment.addedOn.toDate()).toLocaleDateString()}
            </h3>

            <div className="course2-underline2"></div>

            <Link to={assessment.attachments} target="_blank">
              <div className="c2-lessons-content">
                <div className="c2-lessons1">
                  <img
                    src={file}
                    className="thumbnail1-img"
                    alt="thumbnail"
                  />
                  <h3 className="c2-lesson1-title">
                    {assessment.assessmentTitle}
                  </h3>
                  <h3 className="c2-lesson1-description">
                    {assessment.assessmentInstructions}
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

export default CourseSection2;
