import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

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
      .post("http://localhost:8080/api/v1/auth/register", userObj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("User created:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response || error.message);
      });
  };

  return (
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
  );
};

export default SignUp;
