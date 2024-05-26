import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/MaleUser.png";
import profileIcon from "../assets/profileIcon.png";

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import "../styles/enrollStudentPage.css";
import { UserAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const Popup = ({ message, student, onClose, onAdd, onDelete }) => (
  <>
    <div className="overlay" />
    <div className="popup">
      <p className="popup-text">{message}</p>
      {student && (
        <div className="student-details">
          <p>First Name: {student.fName}</p>
          <p>Last Name: {student.lName}</p>
          <p>Email: {student.email}</p>
          <p>Gender: {student.gender}</p>
        </div>
      )}
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
      {onAdd && (
        <button className="add-btn" onClick={onAdd}>
          Add
        </button>
      )}
      {onDelete && (
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  </>
);

const Test = () => {
  const { courseId } = useParams();
  const { user, logout } = UserAuth();
  const [search, setSearch] = useState("");
  const [student, setStudent] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  
  // navigation variable
  const navigate = useNavigate();

  const [profileModal, setProfileModal] = useState(false);
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


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchUserByEmail = async (email) => {
    setPopupMessage("");
    setStudent(null);
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.userType === "Student") {
          setStudent(userData);
          setPopupMessage("Approved: Student found.");
        } else if (userData.userType === "Teacher") {
          setPopupMessage("Error: Cannot add a teacher.");
        }
      } else {
        setPopupMessage("No user found with this email.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setPopupMessage("Failed to fetch user. Please try again.");
    }
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (!search) {
      setPopupMessage("Please enter an email address.");
      setShowPopup(true);
    } else if (!isValidEmail(search)) {
      setPopupMessage("Please enter a valid email address.");
      setShowPopup(true);
    } else {
      fetchUserByEmail(search);
    }
  };

  const handleAdd = async () => {
    if (student) {
      try {
        // Create a document reference
        const docRef = doc(
          db,
          `Courses/${user.uid}/UserCourses/${courseId}/EnrolledStudents`,
          student.email
        );

        // Add the student to Firestore
        await setDoc(docRef, student);

        setPopupMessage("Student added successfully.");
        fetchEnrolledStudents(); // Refresh the enrolled students list
      } catch (error) {
        console.error("Error adding student:", error.message);
        setPopupMessage("Failed to add student. Please try again.");
      }
    } else {
      setPopupMessage("No student to add.");
    }
    setShowPopup(false);
  };

  const handleDeleteClick = (student) => {
    setDeleteStudent(student);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteStudent) {
      try {
        await deleteDoc(
          doc(
            db,
            `Courses/${user.uid}/UserCourses/${courseId}/EnrolledStudents`,
            deleteStudent.email
          )
        );
        setPopupMessage("Student deleted successfully.");
        fetchEnrolledStudents();
      } catch (error) {
        console.error("Error deleting student:", error.message);
        setPopupMessage("Failed to delete student. Please try again.");
      }
    }
    setShowDeletePopup(false);
  };

  // Function to fetch enrolled students
  const fetchEnrolledStudents = async () => {
    try {
      const userCollection = collection(
        db,
        `Courses/${user.uid}/UserCourses/${courseId}/EnrolledStudents`
      );
      const querySnapshot = await getDocs(userCollection);
      const enrolledStudentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEnrolledStudents(enrolledStudentsData);
    } catch (error) {
      console.error("Error fetching enrolled students:", error.message);
      setError("Failed to fetch enrolled students.");
    }
  };

  useEffect(() => {
    if (user && user.uid && courseId) {
      fetchEnrolledStudents();
    }
  }, [user, courseId]);

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
            <h2>Hi, {user && user.displayName}!</h2>
          </div>
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      <div className="enroll-student-page">
        <h1>Enroll Students</h1>
        <input
          type="text"
          placeholder="Enter student email"
          value={search}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>

        {showPopup && (
          <Popup
            message={popupMessage}
            student={student}
            onClose={() => setShowPopup(false)}
            onAdd={handleAdd}
          />
        )}

        {showDeletePopup && (
          <Popup
            message="Are you sure you want to delete this student?"
            student={deleteStudent}
            onClose={() => setShowDeletePopup(false)}
            onDelete={handleDeleteConfirm}
          />
        )}

        <h2>Enrolled Students</h2>
        {enrolledStudents.map((student) => (
          <div key={student.id} className="student-item">
            <span>{student.email}</span>
            <span>{student.fName}</span>
            <span>{student.lName}</span>
            <span>{student.gender}</span>

            <button onClick={() => handleDeleteClick(student)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
