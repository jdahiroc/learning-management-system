// img
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/MaleUser.png";
import courseLogo from "../assets/CourseLogo.png";
import addbutton from "../assets/AddButton.png";
import lessons from "../assets/Lessons.png";
import task from "../assets/Tasks.png";
import dots from "../assets/dots.png";
import profileIcon from "../assets/profileIcon.png";
import closebtt from "../assets/Close.png";
import addStudentIcon from "../assets/add-student.png";

// Material UI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UploadIcon from "@mui/icons-material/Upload";

// CSS
import "../styles/coursesection.css";

// react hooks
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// firebase
import {
  getDoc,
  getDocs,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CourseSection = () => {
  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [lessonModal, setLessonModal] = useState(false);
  const [assessmentModal, setAssessmentModal] = useState(false);

  // For Course Datas
  const { courseId } = useParams(); // Get the course ID from the URL
  const [courseData, setCourseData] = useState("");

  // Lesson Upload States
  const [lessonTitle, setLessonTitle] = useState();
  const [lessonDescription, setLessonDescription] = useState();
  const [lessonMaterials, setLessonMaterials] = useState([]);

  // Assessments Upload States
  const [assessmentTitle, setAssessmentTitle] = useState();
  const [assessmentInstructions, setAssessmentInstructions] = useState();
  const [assessments, setAssessments] = useState([]);

  // Attachments Upload States
  const [attachments, setAttachments] = useState("");
  const [attachmentFileName, setAttachmentFileName] = useState([]);

  // useEffect for uploading files to firebase storage
  useEffect(() => {
    const uploadFile = () => {};
    attachments && uploadFile();
  }, [attachments]);

  // get the user authentication context
  const { user, logout } = UserAuth();
  // navigation variable
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

  //Assessment Modal Function
  const toggleAssessmentModal = () => {
    setAssessmentModal(!assessmentModal);
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

  // handle submit in uploading
  const handleSubmitLessonMaterials = async (e) => {
    e.preventDefault();

    const storageRef = ref(storage, attachments.name);
    const uploadTask = uploadBytesResumable(storageRef, attachments);

    // starts to upload the file
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (e) => {
        console.log(e);
      },
      async () => {
        // gets the downloadURL of your file
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const newLessonMaterials = {
          lessonTitle: lessonTitle,
          lessonDescription: lessonDescription,
          lessonAttachments: downloadURL,
          addedOn: serverTimestamp(),
        };

        try {
          // Check user is available before accessing uid
          if (user && user.uid) {
            // Reference the 'Courses' collection, then the subcollection with the user's UID
            const userCoursesCollection = collection(
              db,
              `Courses/${user.uid}/UserCourses/${courseId}/lessonMaterials`
            );

            // Add the new lesson material document
            await addDoc(userCoursesCollection, newLessonMaterials);
            alert("Successfully Added Lesson Materials!");
            navigate(`/admin/course/${courseId}`);
          } else {
            console.log("User is not authenticated or UID is not available.");
          }
        } catch (e) {
          // Log the error for better debugging
          console.error("Error Occurred!", e);
        }
      }
    );
  };

  // handle submit in uploading
  const handleSubmitAssessments = async (e) => {
    e.preventDefault();

    const storageRef = ref(storage, attachments.name);
    const uploadTask = uploadBytesResumable(storageRef, attachments);

    // starts to upload the file
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (e) => {
        console.log(e);
      },
      async () => {
        // gets the downloadURL of your file
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const newAssessments = {
          assessmentTitle: assessmentTitle,
          assessmentInstructions: assessmentInstructions,
          attachments: downloadURL,
          addedOn: serverTimestamp(),
        };

        try {
          // Check user is available before accessing uid
          if (user && user.uid) {
            // Reference the 'Courses' collection, then the subcollection with the user's UID
            const userCoursesCollection = collection(
              db,
              `Courses/${user.uid}/UserCourses/${courseId}/Assessments`
            );

            // Add the new lesson material document
            await addDoc(userCoursesCollection, newAssessments);
            alert("Successfully Added Lesson Materials!");
            navigate(`/admin/course/${courseId}`);
          } else {
            console.log("User is not authenticated or UID is not available.");
          }
        } catch (e) {
          // Log the error for better debugging
          console.error("Error Occurred!", e);
        }
      }
    );
  };

  // READ Operation
  // Display all documents from UserCourses
  const getCourse = async () => {
    try {
      if (user && user.uid) {
        const courseDocRef = doc(
          db,
          `Courses/${user.uid}/UserCourses`,
          courseId
        );
        const docSnap = await getDoc(courseDocRef);

        if (docSnap.exists()) {
          setCourseData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  // Fetch the course data (READ Operation)
  // Display the lesson materials after created
  const getLessonMaterials = async () => {
    try {
      if (user && user.uid) {
        const userCoursesCollection = collection(
          db,
          `Courses/${user.uid}/UserCourses/${courseId}/lessonMaterials`
        );

        const querySnapshot = await getDocs(userCoursesCollection);

        const lessonMaterialsData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.addedOn.toMillis() - a.addedOn.toMillis()); // Sort in descending order

        setLessonMaterials(lessonMaterialsData);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch the course data (READ Operation)
  // Display the lesson materials after created
  const getAssessments = async () => {
    try {
      if (user && user.uid) {
        const userCoursesCollection = collection(
          db,
          `Courses/${user.uid}/UserCourses/${courseId}/Assessments`
        );

        const querySnapshot = await getDocs(userCoursesCollection);

        const assessmentsData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.addedOn.toMillis() - a.addedOn.toMillis()); // Sort in descending order

        setAssessments(assessmentsData);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (user && user.uid && courseId) {
      getCourse();
      getLessonMaterials();
      getAssessments();
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

      {/* Banner */}
      {courseData ? (
        <div className="course_banner">
          <div className="course_img">
            <img src={courseLogo} alt="Course Logo" className="course_logo" />
            <div className="course_text">{courseData.assignedTeacher}</div>
            <div className="course_text2">{courseData.description}</div>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}

      {/*Course Title*/}
      <div className="course-header">
        <h3>Course Stream</h3>
        <div className="course_underline"></div>
      </div>

      {/* Modal Button */}
      <div className="addbutt_container">
        {/* Add/Enroll Student Icon Button */}
        <Link to={`/admin/add/${courseId}/students`}>
          <div className="addStudent-container">
            <img src={addStudentIcon} alt="Add Student" />
          </div>
        </Link>
        <img onClick={toggleModal} src={addbutton} alt="addbutton" />
      </div>

      <div className={`overlay-course  ${modal ? "show" : ""}`}>
        <button className="upload_lesson" onClick={toggleLessonModal}>
          Upload Lesson
        </button>
        <button className="upload_assessment" onClick={toggleAssessmentModal}>
          Upload Assessment
        </button>
      </div>

      {/* Upload Materials Modal */}
      <div className={`overlay-lesson  ${lessonModal ? "show" : ""}`}>
        <div className="container_button">
          <img
            className="closebutton_lesson"
            src={closebtt}
            alt="Close Button"
            onClick={toggleLessonModal}
          ></img>
        </div>
        <form onSubmit={handleSubmitLessonMaterials}>
          <div className="content-uploadlesson">
            <div className="header-lesson">
              <h3 className="lesson-title">Upload Materials</h3>
              <button className="add-lesson">Post</button>
            </div>
            <div className="lesson_underline"></div>
            <input
              type="text"
              className="lesson-input"
              placeholder="Title"
              required
              onChange={(e) => setLessonTitle(e.target.value)}
            />
            <textarea
              type="text"
              className="lesson-desc"
              placeholder="Description (optional)"
              onChange={(e) => setLessonDescription(e.target.value)}
            />
            <h3 className="lesson-attach">Attachment</h3>
            <input
              type="file"
              className="upload-butt"
              onChange={(e) => {
                setAttachments(e.target.files[0]);
                setAttachmentFileName(e.target.files[0].name);
              }}
              id="uploadBtn"
            />
            <div className="uploadLabel-container">
              <label className="uploadLabel" htmlFor="uploadBtn">
                <div className="upload-img-container">
                  <UploadIcon />
                </div>
                Upload
              </label>
              {attachmentFileName && (
                <span className="attachmentFileName">{attachmentFileName}</span>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Assessment Modal */}
      <div className={`overlay-assessment  ${assessmentModal ? "show" : ""}`}>
        <div className="container_button2">
          <img
            className="closebutton_assessment"
            src={closebtt}
            alt="Close Button2"
            onClick={toggleAssessmentModal}
          ></img>
        </div>

        <form onSubmit={handleSubmitAssessments}>
          <div className="content-uploadassessment">
            <div className="header-assessment">
              <h3 className="assessment-title">Upload Assessment</h3>
              <button className="add-assessment">Post</button>
            </div>
            <div className="assessment_underline"></div>

            <input
              type="text"
              className="assessment-input"
              placeholder="Title"
              onChange={(e) => setAssessmentTitle(e.target.value)}
            />
            <textarea
              type="text"
              className="assessment-desc"
              placeholder="Instructions (optional)"
              onChange={(e) => setAssessmentInstructions(e.target.value)}
            />
            <h3 className="lesson-attach">Attach</h3>
            <input
              type="file"
              className="upload-butt"
              onChange={(e) => {
                setAttachments(e.target.files[0]);
                setAttachmentFileName(e.target.files[0].name);
              }}
              id="uploadBtn"
            />
            <div className="uploadLabel2-container">
              <label className="uploadLabel2" htmlFor="uploadBtn">
                <div className="upload-img-container">
                  <UploadIcon />
                </div>
                Upload
              </label>
              {attachmentFileName && (
                <span className="attachmentFileName2">
                  {attachmentFileName}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>

      {/*Course Materials*/}
      <div className="course_content-container">
        <div className="course-container">
          <h3 className="course-materials-h3">Lessons Materials</h3>
          {lessonMaterials ? (
            lessonMaterials.map((lesson) => (
              <div className="course-material" key={lesson.id}>
                <Link
                  to={{
                    pathname: `/admin/course/${courseId}/lessonMaterials/${lesson.id}`,
                    state: { lesson }, // Passing the lesson data
                  }}
                  className="button_course"
                >
                  <img className="lesson_image" src={lessons} alt="lesson" />
                  <img className="lesson_dot" src={dots} alt="dots" />
                  <div className="lesson_text">
                    <span>{lesson.lessonTitle}</span>
                  </div>
                  <div className="lesson_text2">
                    <span>{lesson.addedOn.toDate().toLocaleString()}</span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="loading-container">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          )}
        </div>
      </div>

      {/*Course Assessments*/}
      <div className="course_content-container">
        <div className="course-container">
          <h3 className="course-assessments-h3">Assessments</h3>
          {assessments ? (
            assessments.map((assessments) => (
              <div className="course-material" key={assessments.id}>
                <Link
                  to={{
                    pathname: `/admin/course/${courseId}/Assessments/${assessments.id}`,
                    state: { assessments },
                  }}
                  className="button_course"
                >
                  <img className="lesson_image" src={task} alt="task" />
                  <img className="lesson_dot" src={dots} alt="dots" />
                  <div className="lesson_text">
                    <span>{assessments.assessmentTitle}</span>
                  </div>
                  <div className="lesson_text2">
                    <span>{assessments.addedOn.toDate().toLocaleString()}</span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="loading-assessments-container">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CourseSection;
