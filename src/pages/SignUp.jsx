import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

import {setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

//image link
import registerImg from "../assets/signUpImage.png";

//css link
import "../styles/signUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [gender, setGender] = useState(false);
  const [userType, setUserType] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();


   // Function for gender selection
   const handleGender = (e) => {
    setGender(e.target.value === 'Male');
  };

  // Function for user type selection
  const handleUserType = (e) => {
    setUserType(e.target.value === 'Student')
  }

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
      gender: gender ? 'Male' : 'Female',
      userType,
      createdOn: serverTimestamp(),
    };

    // Add a new document with a generated id.
    try {
      // Create user in Firebase Authentication
      const authUserCredential = await createUser(email, password);
      const { uid } = authUserCredential.user;

       // Save the document but using the UID on authenticated user
       await setDoc(doc(db, "users", uid), newUser);

      navigate("/homepage");
    } catch {
      setErrMsg(e.message);
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="error-container-login">
        {/* error message */}
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
      </div>
      <div className="container">
        <div className="box">
          <h1 id="sign_in">SIGN IN</h1>
          <h1 id="sign_up">SIGN UP</h1>
          <div className="inputs">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                id="fname"
                name="fname"
                onChange={(e) => setFname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                id="lname"
                name="lname"
                onChange={(e) => setLname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Email Address"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmpass"
                name="confirmpass"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Contact Number"
                id="contactnum"
                name="contactnum"
                onChange={(e) => setContactNum(e.target.value)}
              />

              <select name="Gender" id="gender" value={gender ? 'Male' : 'Female'} onChange={handleGender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <select name="Student" id="usertype" value={userType ? 'Student' : 'Teacher'} onChange={handleUserType}>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>

              <div className="sign-in-nav">
                <p>
                  Already have an account?{" "}
                  <Link className="signIn-Link" to={"/"}>
                    Sign in.
                  </Link>
                </p>
              </div>
              <button id="butt_signin">SIGN UP</button>
            </form>
          </div>
          <img src={registerImg} alt="IMAGE" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
