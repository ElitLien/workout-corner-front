import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./style.css";
import { useContext } from "react";
import { ModalContext } from "../../App";
import AccountModal from "../../components/AccountModal";
import Modal from "../../components/Modal";

const Contact = () => {
  const [result, setResult] = useState<string>("");
  const [contactModal, setContactModal] = useState<boolean>(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    const webFormKey = process.env.REACT_APP_WEB_FORMS_ACCESS_KEY;

    webFormKey && formData.append("access_key", webFormKey);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      console.log("Message result: ", result);
    } else {
      console.log("Error", data);
      setResult(data.message);
    }

    setContactModal(true);
  };

  const context = useContext(ModalContext);
  const { modal } = context;

  return (
    <>
      <div className="contact">
        <Navbar />
        <div className="contact-main">
          <div className="contact-main-left">
            <h1 className="contact-main-left-title">Contact Us</h1>
            <p className="contact-main-left-text">
              Let people know what to reach out about and what to expect after
              contacting you. Don't forget to choose a storage option for
              submissions
            </p>
            <a
              href="https://www.google.com/"
              className="contact-main-left-email"
            >
              email@example.com
            </a>
            <p className="contact-main-left-number">{`(555) 555-5555`}</p>
            <form onSubmit={onSubmit} className="contact-main-left-form">
              <label htmlFor="">
                Name <span>{`(required)`}</span>
              </label>
              <div className="contact-main-left-form-name">
                <div className="contact-main-left-form-block">
                  <label htmlFor="">First Name</label>
                  <input type="text" name="name" />
                </div>
                <div className="contact-main-left-form-block">
                  <label htmlFor="">Last Name</label>
                  <input type="text" name="name" />
                </div>
              </div>
              <label htmlFor="">
                Email <span>{`(required)`}</span>
              </label>
              <input type="email" name="email" />
              <label htmlFor="">
                Message <span>{`(required)`}</span>
              </label>
              <textarea name="message"></textarea>
              <button type="submit" className="contact-main-left-form-button">
                SEND
              </button>
            </form>
          </div>
          <div className="contact-main-right"></div>
        </div>
        <Footer />
      </div>
      {contactModal && (
        <Modal contactModal={contactModal} setContactModal={setContactModal} />
      )}
      {modal && <AccountModal />}
    </>
  );
};

export default Contact;
