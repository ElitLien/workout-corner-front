import { useContext, useEffect, useState } from "react";
import "./style.css";
import { ModalContext } from "../../App";
import axios from "axios";

interface IWarningModal {
  setActiveWarning: React.Dispatch<React.SetStateAction<boolean>>;
  selectProduct: string | undefined;
  selectProductId: number | undefined;
}

const WarningModal: React.FC<IWarningModal> = ({
  setActiveWarning,
  selectProduct,
  selectProductId,
}) => {
  const context = useContext(ModalContext);
  const { modal } = context;
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>();

  const deleteProduct = () => {
    try {
      setLoading(true);
      axios.post(
        `http://localhost:8080/api/products/delete/${selectProductId}`,
        {},
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.alert("Delete product was complete!!!");
      setLoading(false);
    } catch {
      console.log("Product wasn't delete!!!!");
    }
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    }
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [modal]);

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    localToken && setToken(localToken);
  }, []);

  return (
    <div className="account-modal">
      <div
        className="account-modal-overlay"
        onClick={() => setActiveWarning((prev) => !prev)}
      ></div>
      {!loading && (
        <div className="warning-modal-content">
          <h3 className="account-modal-content-title">
            Are you sure you want to delete {selectProduct}?
          </h3>
          <div className="account-modal-content-footer">
            <div
              className="warning-modal-content-footer-element-yes"
              onClick={() => deleteProduct()}
            >
              Yes
            </div>
            <div
              className="warning-modal-content-footer-element-no"
              onClick={() => setActiveWarning((prev) => !prev)}
            >
              No
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarningModal;
