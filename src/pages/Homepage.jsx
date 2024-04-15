// img
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/MaleUser.png";
import bannerImg from "../assets/banner.png";
import headerLine from "../assets/headerLine.png";
import courseLogo from "../assets/CourseLogo.png";

//css
import "../pages/homepage.css";

const Homepage = () => {
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
        <div className="profile-container">
          <div className="profile-icon-container">
            <img src={userIcon} alt="profile-icon" />
          </div>
          <div className="profile-name-container">
            <h4>Admin</h4>
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

      <div className="box2">
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

      <div className="box4">
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
