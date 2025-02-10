import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ModalContext } from "../../App";
import AccountModal from "../../components/AccountModal";
import "./style.css";
import UsersCards from "../../components/UsersCards";

const Users = () => {
  const context = useContext(ModalContext);
  const { modal } = context;
  const [showArrow, setShowArrow] = useState<boolean>(false);

  const checkScrollHeight = () => {
    setShowArrow(window.scrollY > 150);
  };

  useEffect(() => {
    checkScrollHeight();

    window.addEventListener("scroll", checkScrollHeight);

    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, []);

  return (
    <>
      <div className="users">
        <Navbar />
        <div className="users-main">
          <h1 className="users-title">Users</h1>
          <div className="users-hint">
            <div className="users-hint-first-block">
              <div>№</div>
              <div>username</div>
            </div>
            <div className="users-hint-second-block">email</div>
            <div className="users-hint-third-block">role changer</div>
            <div className="users-hint-forth-block">role</div>
          </div>
          <div className="users-list">
            <UsersCards />
          </div>
        </div>
        {document.documentElement.scrollHeight >
        document.documentElement.clientHeight ? (
          <Footer />
        ) : (
          <footer style={{ marginTop: "auto" }}>
            <Footer />
          </footer>
        )}
        {showArrow && (
          <div className="arrow-container">
            <div
              className="arrow-up"
              onClick={() =>
                window.scroll({ top: 0, left: 0, behavior: "smooth" })
              }
            >
              ▲
            </div>
          </div>
        )}
      </div>
      {modal && <AccountModal />}
    </>
  );
};

export default Users;
