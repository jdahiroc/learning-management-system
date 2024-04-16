import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

// CSS
import "./signIn.css";

// img
import loginImg from "../assets/signinImage.png";
// import SignUp from "../pages/SignUp";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      await signIn(email, password);
      navigate("/homepage");
    } catch (e) {
      console.log(e.message);
      return setErrMsg(e.message);
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
        <div className="side-img">
          <img src={loginImg} alt="side-img" />
        </div>
        <div className="header">
          <div className="text">
            SIGN IN
            <div className="text">SIGN UP</div>
          </div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                placeholder="Username"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="sign-up-nav">
              <p>
                Don&#39;t have an account?{" "}
                <Link className="sign-up-link" to={"/signup"}>
                  Sign up.
                </Link>
              </p>
            </div>
            <div className="submit-container">
              <button className="submit">SIGN IN</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
