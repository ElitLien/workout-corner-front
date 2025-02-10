import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { ModalContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AccountModal = () => {
  const context = useContext(ModalContext);
  const { modal, switchHandler } = context;
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [token, setToken] = useState<any>();
  const tokenStorage = localStorage.getItem("decodeTokenData");
  const parseToken = tokenStorage && JSON.parse(tokenStorage);
  const [decodeToken, setDecodeToken] = useState<any>(parseToken);
  const navigate = useNavigate();

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
        localStorage.setItem("authToken", receivedToken);

        return axios.get("http://localhost:8080/api/profile", {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${receivedToken}`,
          },
        });
      })
      .then((response) => {
        localStorage.setItem("decodeTokenData", JSON.stringify(response.data));
        const localDecodeToken = localStorage.getItem("decodeTokenData");
        const resToken = localDecodeToken && JSON.parse(localDecodeToken);
        console.log("resToken: ", resToken);
        setDecodeToken(resToken);
        console.log("Decoded Token Data: ", response.data);
        navigate("/");
        switchHandler();
        window.location.reload();
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
        localStorage.removeItem("decodeTokenData");
      })
      .catch((error) => {
        console.error("Error:", error.response || error.message);
      });
  };

  useEffect(() => {
    const localToken = localStorage.getItem("decodeTokenData");
    localToken && setDecodeToken(JSON.parse(localToken));

    const handleKeyDown = (e: any) => {
      e.key === "Enter" && buttonHandler();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.addEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="account-modal">
      <div className="account-modal-overlay" onClick={switchHandler}></div>
      {!localStorage.getItem("authToken") ? (
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
          <div className="account-modal-content-footer">
            <div className="account-modal-content-footer-element">
              Forgot Password?
            </div>
            <div className="account-modal-content-footer-element">
              <Link to="/signup">Create account</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="account-modal-content">
          <h3 className="account-modal-content-title">
            Welcome to WorkoutCorner
          </h3>
          <div className="account-modal-content-name">
            {decodeToken.username}
          </div>
          <button
            className="account-modal-content-button"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountModal;
