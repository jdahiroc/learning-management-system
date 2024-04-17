import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

// CSS
import "../styles/signIn.css";

// img
import loginImg from "../assets/signinImage.png";

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
        <p className={errMsg ? "errmsg" : ""} aria-live="assertive">
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
