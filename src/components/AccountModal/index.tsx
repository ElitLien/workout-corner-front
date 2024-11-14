import React, { useContext, useEffect } from "react";
import "./style.css";
import { ModalContext } from "../../App";

const AccountModal = () => {
  const context = useContext(ModalContext);
  const { modal, switchHandler } = context;

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    }
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [modal]);

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
            type="email"
            placeholder="Email"
          />
          <input
            className="account-modal-content-input"
            type="text"
            placeholder="Password"
          />
        </div>
        <button className="account-modal-content-button">Sign in</button>
        <div className="account-modal-content-footer">
          <div className="account-modal-content-footer-element">
            Forgot Password?
          </div>
          <div className="account-modal-content-footer-element">
            Create account
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
