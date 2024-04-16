import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

//image link
import registerImg from "../assets/signUpImage.png";

//css link
import "../styles/signUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  //---------------
  // Handle Submit
  //---------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      await createUser(email, password);
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
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                id="lname"
                name="lname"
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
                required
              />
              <input
                type="text"
                placeholder="Contact Number"
                id="contactnum"
                name="contactnum"
              />

              <select name="Gender" id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select name="Student" id="usertype">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
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
