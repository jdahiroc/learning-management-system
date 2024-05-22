// img
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/profileIcon.png";
import bannerImg from "../assets/banner.png";
import headerLine from "../assets/headerLine.png";
import profileIcon from "../assets/profileIcon.png";
import loginImg from "../assets/signinImage.png";

// react hooks
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// material ui
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

//css
import "../styles/adminHomepage.css";

const Homepage = () => {
  // colors for <Card></Card>
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    palette: {
      primary: {
        light: "#FFFFFF", // card-title font color
        dark: "#E9EEF6", // card-teacher, card-section font color
        darker: "#53BDE5",
        main: "#056488", // card bg color
      },
    },
  });

  const [modal, setModal] = useState(false);
  const [addCourseIconModal] = useState(false);

  const [courseDatas, setCourseDatas] = useState("");

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

  // Fetch the course data (READ Operation)
  const getCourses = async () => {
    try {
      // console.log("User UID:", user && user.uid);

      if (user && user.uid) {
        const userCoursesCollection = collection(
          db,
          `Courses/${user.uid}/UserCourses`
        );

        // access the folders to start scanning all document data
        const querySnapshot = await getDocs(userCoursesCollection);
        // scan all documents data
        const courseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCourseDatas(courseData);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // This is a function...
  // where user click the course it will redirect to Course Section
  // that has task, announcements, assessments etc.
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  useEffect(() => {
    if (user && user.uid) {
      getCourses();
    }
  }, [user]);

  return (
    <>
      <ThemeProvider theme={theme}>
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
              <h2>Hi, {user && user.displayName}!</h2>
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
        {/* Header Line */}
        <div className="headerLine-container">
          <img src={headerLine} alt="headerLine" />
        </div>

        {/* Renders data after scanning all documents data */}
        {courseDatas ? (
          courseDatas.map((course) => (
            <div
              className="card-container"
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
            >
              <Card
                sx={{
                  width: 300,
                  backgroundColor: `primary.main`,
                  "&:hover": { backgroundColor: `primary.main` },
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={loginImg}
                />
                <CardContent>
                  <Typography
                    sx={{
                      color: `primary.light`,
                      fontFamily: "Poppins, sans-serif",
                    }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {course.courseName}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h7"
                    component="div"
                    sx={{ color: `primary.dark` }}
                  >
                    {course.assignedTeacher}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: `primary.dark`,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid
                    item
                    container
                    xs={12}
                    alignItems="flex-end"
                    direction="column"
                  ></Grid>
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          <div className="loading-container">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        )}

        {/* Add Button Modal */}
        <div
          className={`overlay-addCourseIcon ${
            addCourseIconModal ? "show" : ""
          }`}
        >
          <div className="addCourse-container">
            <Link to={"/admin/add/course"}>
              <p>Add Course</p>
            </Link>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Homepage;
