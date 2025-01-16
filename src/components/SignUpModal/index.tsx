import { useContext, useEffect } from "react";
import "./style.css";
import { ModalContext } from "../../App";

const SignUpModal = () => {
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
    <div className="signup-modal">
      <div className="signup-modal-overlay" onClick={switchHandler}></div>
      <div className="signup-modal-content">
        <p className="signup-modal-content-title">
          Registration was successful
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
