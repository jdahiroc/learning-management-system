import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

//image link
import registerImg from "../assets/signupImage.png";

//css link
import "../styles/signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [gender, setGender] = useState(false);
  const [userType, setUserType] = useState("Student");
  const [errMsg, setErrMsg] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  // Function for gender selection
  const handleGender = (e) => {
    setGender(e.target.value === "Male");
  };

  // Function for user type selection
  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    const newUser = {
      fName,
      lName,
      email,
      password,
      confirmPassword,
      contactNum,
      gender: gender ? "Male" : "Female",
      userType,
      createdOn: serverTimestamp(),
    };

    // Add a new document with a generated id.
    try {
      const authUserCredential = await createUser(email, password);
      const { user } = authUserCredential;

      // Set displayName in user object
      user.displayName = fName;

      // Save the document with the Same UID
      await setDoc(doc(db, "users", user.uid), newUser);

      // Redirect based on user type
      if (userType === "Student") {
        navigate("/home");
      } else if (userType === "Teacher") {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Firebase Authentication Error:", error.message);
      setErrMsg("Failed to sign up. Please try again.");
    }
  };

  return (
    <>
      <div className="error-container-login">
        {/* error message */}
        <p className={errMsg ? "errmsg" : ""} aria-live="assertive">
          {errMsg}
        </p>
      </div>
      <div className="signUp-container">
        {/* image */}
        <div className="signUp-side-img-container">
          <img src={registerImg} alt="IMAGE" />
        </div>
        {/* header */}
        <div className="headerText-container">
          <div className="sign-In-container">
            <h2>SIGN IN</h2>
          </div>
          <div className="sign-Up-container">
            <h2>SIGN UP</h2>
          </div>
          {/* underline */}
          <div className="underline"></div>
        </div>
        {/* inputs */}
        <div className="inputss-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              className="fname"
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              className="lname"
              onChange={(e) => setLname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              className="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpass"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Contact Number"
              id="contactnum"
              name="contactnum"
              className="contactnum"
              onChange={(e) => setContactNum(e.target.value)}
            />

            {/* gender */}
            <select
              name="Gender"
              className="gender"
              value={gender ? "Male" : "Female"}
              onChange={handleGender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* usertype */}
            <select
              name="usertype"
              className="usertype"
              value={userType}
              onChange={handleUserType}
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            {/* sign-in */}
            <div className="signIn-nav">
              <p>
                Already have an account?{" "}
                <Link className="signIn-Link" to={"/"}>
                  Sign in.
                </Link>
              </p>
            </div>
            {/* sign up button */}
            <div className="submitContainer">
              <button>SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
