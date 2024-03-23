import { Link } from "react-router-dom";

//image link
import registerImg from "../assets/signUpImage.png";

//css link
import "../pages/signUp.css";

const SignUp = () => {
  return (
    <>
      <div className="container">
        <div className="box">
          <h1 id="sign_in">SIGN IN</h1>
          <h1 id="sign_up">SIGN UP</h1>

          <input type="text" placeholder="First Name" id="fname" name="fname" />
          <input type="text" placeholder="Last Name" id="lname" name="lname" />
          <input
            type="text"
            placeholder="Email Address"
            id="email"
            name="email"
          />
          <input
            type="text"
            placeholder="Password"
            id="password"
            name="password"
          />
          <input
            type="text"
            placeholder="Confirm Password"
            id="confirmpass"
            name="confirmpass"
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
              Already have an account? <Link className="signIn-Link" to={"/"}>Sign In.</Link>
            </p>
          </div>
          <button id="butt_signin">SIGN UP</button>

          <img src={registerImg} alt="IMAGE" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
