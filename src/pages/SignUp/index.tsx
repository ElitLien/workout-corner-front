import { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import SignUpModal from "../../components/SignUpModal";
import { ModalContext } from "../../App";

const SignUp = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const context = useContext(ModalContext);
  const { modal, switchHandler } = context;

  const nameHandler = (event: any) => {
    setUsername(event.target.value);
  };

  const emailHandler = (event: any) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const buttonHandler = () => {
    const userObj = {
      username: username,
      email: email,
      password: password,
      role: null,
    };
    axios
      .post("http://localhost:8080/api/auth/register", userObj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("User created:", response.data);
        switchHandler();
      })
      .catch((error) => {
        console.error("Error:", error.response || error.message);
      });
  };

  useEffect(() => {
    console.log("Modal: ", modal);
    return () => {
      switchHandler();
    };
  }, []);

  return (
    <>
      <div className="sign-up">
        <div className="sign-up-container">
          <div className="sign-up-container-title">SignUp</div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username..."
            onChange={nameHandler}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email..."
            onChange={emailHandler}
          />
          <label>Password</label>
          <input
            className="sign-up-container-input-password"
            type="password"
            placeholder="Enter your password..."
            onChange={passwordHandler}
          />
          <button onClick={buttonHandler}>Sign Up</button>
          <Link to="/">Return to homepage</Link>
        </div>
        <div className="sign-up-footer">WorkoutCorner 2024</div>
      </div>
      {modal && <SignUpModal />}
    </>
  );
};

export default SignUp;
