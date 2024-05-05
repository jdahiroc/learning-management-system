// img
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/MaleUser.png";
import Courseline from "../assets/headerLine.png";
import profileIcon from "../assets/profileIcon.png";

//css
import "../styles/addCourse.css";

// react hooks
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// firebase
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const AddCourse = () => {
  // useState
  const [modal, setModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [description, setDescription] = useState("");
  const { user, logout } = UserAuth();
  const teacherName = user ? user.displayName : "";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      courseName: courseName,
      assignedTeacher: teacherName,
      section: sectionName,
      description: description,
      addedOn: serverTimestamp(), // Call the function to get the timestamp value
    };

    try {
      // Checks user is available before accessing uid
      if (user && user.uid) {
        // Reference the 'Courses' collection, then the subcollection with the user's UID
        const userCoursesCollection = collection(
          db,
          `Courses/${user.uid}/UserCourses`
        );

        // Add a new document to the subcollection
        await addDoc(userCoursesCollection, newCourse);
        alert("Added Course Successfully!");
        navigate("/admin/add-course");
      } else {
        console.log("User is not authenticated or UID is not available.");
      }
    } catch (error) {
      console.log("Error occurred when adding a course", error);
    }
  };

  return (
    <>
      {/* NAVIGATIONS */}
      <div className="navigation-container">
        {/* nav-logo */}
        <div className="logo-container">
          <Link to="/admin/home">
            <img src={logoBrand} alt="logoBrand" />
          </Link>
        </div>
        <div className="navigation-controls">
          <ul>
            <li>COURSES</li>
            <li>ABOUT US</li>
            <li>CONTACT US</li>
          </ul>
        </div>
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

      {/* header */}
      <div className="headerTextt-container">
        <div className="add-Course-container">
          <div className="h1-container">
            <h1>Add Course</h1>
          </div>
        </div>
      </div>
      <div className="add-Course-line">
        <img src={Courseline}></img>
      </div>
      {/* inputs */}
      <div className="inputsss-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course Name"
            name="cname"
            className="cname"
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Section"
            name="sectionName"
            className="tname"
            onChange={(e) => setSectionName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            className="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {/* add course button */}
          <div className="submitContainerr">
            <button>ADD COURSE</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
