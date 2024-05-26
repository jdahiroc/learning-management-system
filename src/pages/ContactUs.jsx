// img
import logoBrand from "../assets/LOGOBRAND.png";
import userIcon from "../assets/profileIcon.png";
import profileIcon from "../assets/profileIcon.png";
import fblogo from "../assets/fb.png";
import iglogo from "../assets/ig.png";
import xlogo from "../assets/x.png";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

//css
import "../styles/contactus.css";

const Contactus = () => {
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
            <Link to="/contactUs">
                <li>CONTACT US</li>
              </Link>
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
      <div className={`overlay-profileIcon ${modal ? "show" : ""}`}>
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

      {/* Contact us content */}
      <div className="contactus-container">
        <h3 className="follow-text">Follow us on: </h3>
        <div className="contactus_underline"></div>
        <table className="socialmedias">
          <tr>
            <td>
              <img src={fblogo}></img>
              <img src={iglogo}></img>
              <img src={xlogo}></img>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Contactus;
