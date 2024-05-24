import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getDocs, collection, query, where } from "firebase/firestore"; // Import Firestore functions
import { db } from "../firebase";

// CSS
import "../styles/signIn.css";

// img
import loginImg from "../assets/signinImage.png";

// Popup Component
// eslint-disable-next-line react/prop-types
const Popup = ({ message, onClose }) => (
  <div className="popup">
    <p className="popup-text">{message}</p>
    <button className="close-btn" onClick={onClose}>
      Close
    </button>
  </div>
);

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, updateProfile } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  // Function to fetch user data from Firestore based on email
  const fetchUserDataByEmail = async (email) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      }

      // Assuming there's only one user with the given email
      const userData = querySnapshot.docs[0].data();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      // Reference for email/password to authenticate user account
      await signIn(email, password);

      // Fetch user data from Firestore based on email
      const userData = await fetchUserDataByEmail(email);
      const fName = userData.fName;
      const userType = userData.userType;

      // Update user profile with full name
      await updateProfile(fName);

      // Navigate based on user type
      if (userType === "Teacher") {
        navigate("/admin/home");
      } else if (userType === "Student") {
        navigate("/home");
      } else {
        throw new Error("Unknown User");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrMsg("Invalid email or password");
      setShowPopup(true); // Display the popup
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      await handleSignIn(email, password);
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <>
      {showPopup && (
        <Popup message={errMsg} onClose={() => setShowPopup(false)} />
      )}
      <div className="error-container-login">
        {/* error message */}
        <p className="errmsg" aria-live="assertive">
          {errMsg}
        </p>
      </div>
      <div className="signIn-container">
        {/* image */}
        <div className="side-img-container">
          <img src={loginImg} alt="side-img" />
        </div>
        {/* header */}
        <div className="header-text-container">
          <div className="sign-in-container">
            <h2>SIGN IN</h2>
          </div>
          <div className="sign-up-container">
            <h2>SIGN UP</h2>
          </div>
          <div className="underline"></div>
        </div>

        {/* inputs */}
        <div className="inputs-container">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                placeholder="USERNAME"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="PASSWORD"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="sign-up-nav">
              <p>
                Don&#39;t have an account?
                <Link className="sign-up-link" to={"/signup"}>
                  Sign up.
                </Link>
              </p>
            </div>
            <div className="submit-container">
              <button className="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
