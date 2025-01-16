import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { ModalContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";

const AccountModal = () => {
  const context = useContext(ModalContext);
  const { modal, switchHandler } = context;
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [token, setToken] = useState<any>();
  const [decodeToken, setDecodeToken] = useState<any>();

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    }
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [modal]);

  const nameHandler = (event: any) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const buttonHandler = () => {
    const userObj = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/api/auth/authenticate", userObj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        window.alert("The user is logged in!");
        const receivedToken = response.data.token;
        setToken(receivedToken);
        localStorage.setItem("authToken", receivedToken);

        return axios.get("http://localhost:8080/api/profile", {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${receivedToken}`,
          },
        });
      })
      .then((response) => {
        setDecodeToken(response.data);
        console.log("Decoded Token Data: ", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response || error.message);
      });
  };

  const logoutHandler = () => {
    axios
      .post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        window.alert("See you later User!");
        setToken(null);
        setDecodeToken(null);
        localStorage.removeItem("authToken");
      })
      .catch((error) => {
        console.error("Error:", error.response || error.message);
      });
  };

  useEffect(() => {
    console.log("decode Token: ", decodeToken);
  }, []);

  return (
    <div className="account-modal">
      <div className="account-modal-overlay" onClick={switchHandler}></div>
      <div className="account-modal-content">
        <h3 className="account-modal-content-title">
          Welcome to WorkoutCorner
        </h3>
        <div className="account-modal-content-inputs">
          <input
            className="account-modal-content-input"
            type="text"
            placeholder="Username"
            onChange={nameHandler}
          />
          <input
            className="account-modal-content-input"
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
          />
        </div>
        <button
          className="account-modal-content-button"
          onClick={buttonHandler}
        >
          Sign in
        </button>
        <button
          className="account-modal-content-button"
          onClick={logoutHandler}
        >
          Logout
        </button>
        <div className="account-modal-content-footer">
          <div className="account-modal-content-footer-element">
            Forgot Password?
          </div>
          <div className="account-modal-content-footer-element">
            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
