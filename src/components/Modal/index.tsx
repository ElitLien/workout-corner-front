import React, { useEffect } from "react";
import "./style.css";
import { IBuyModal } from "../../interface/buyModal.interface";
import { useLocation } from "react-router-dom";

const Modal: React.FC<IBuyModal> = ({
  buyModal,
  setBuyModal,
  contactModal,
  setContactModal,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (buyModal) {
      document.body.classList.add("active-modal");
    }
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [buyModal]);

  useEffect(() => {
    if (contactModal) {
      document.body.classList.add("active-modal");
    }
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [contactModal]);

  return (
    <div className="buy-modal">
      <div
        className="buy-modal-overlay"
        onClick={() => {
          setBuyModal && setBuyModal(false);
          setContactModal && setContactModal(false);
        }}
      ></div>
      <div className="buy-modal-content">
        {location.pathname.split("/")[1] === "cart" && (
          <h3 className="buy-modal-content-title">
            The purchase was successful
          </h3>
        )}
        {location.pathname.split("/")[1] === "contact" && (
          <h3 className="buy-modal-content-title">
            The message was sent successfully
          </h3>
        )}
      </div>
    </div>
  );
};

export default Modal;
