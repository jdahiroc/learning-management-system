import { Link } from "react-router-dom";
// CSS
import "./signIn.css";

// img
import loginImg from "../assets/signinImage.png";

const SignIn = () => {
  return (
    <>
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
          <div className="input">
            <input type="text" placeholder="USERNAME" />
          </div>
          <div className="input">
            <input type="text" placeholder="PASSWORD" />
          </div>
        </div>
        <div className="submit-container">
          <Link className="submit" to={"/signUp"}>SIGN IN</Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
