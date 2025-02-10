import "./style.css";
import Navbar from "../../components/Navbar";
import Sections from "../../components/Sections";
import Footer from "../../components/Footer";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../App";
import AccountModal from "../../components/AccountModal";
import thumbsUp from "../../images/thumbs-up.png";
import basketball from "../../images/basketball.png";
import exercise from "../../images/exercise.png";
import hero_img2 from "../../images/hero_img2.png";
import hero_img3 from "../../images/hero_img3.svg";

const Homepage = () => {
  const hero_img =
    "https://workout-corner.s3.eu-north-1.amazonaws.com/homepage/hero_img.png";
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
      <div className="homepage">
        <Navbar />
        <div className="homepage-hero">
          <h1 className="homepage-hero-title">
            <div>Welcome</div> <div>to</div> <div>the</div>{" "}
            <div>WorkoutCorner</div>
          </h1>
          <img src={hero_img2} alt="" />
        </div>
        <div className="homepage-about">
          <h1 className="homepage-about-title">About us</h1>
          <div className="homepage-about-sections">
            <div className="homepage-about-section">
              <div className="homepage-about-section-image-block">
                <svg
                  width="273"
                  height="244"
                  viewBox="0 0 273 244"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="136.312"
                    cy="122"
                    rx="136.312"
                    ry="122"
                    fill="#e6a495"
                  />
                </svg>
                <img
                  className="homepage-about-section-image"
                  src={exercise}
                  alt=""
                />
              </div>
              <h2>History</h2>
              <p>
                WorkoutCorner was born as a result of our passion for sports and
                a healthy lifestyle. We have always believed that physical
                activity is the key to physical and mental well-being. That's
                why we created a platform where everyone can find everything
                they need for training — from high-quality sportswear to
                personalized training programs.
              </p>
            </div>
            <div className="homepage-about-section">
              <div className="homepage-about-section-image-block">
                <svg
                  width="273"
                  height="244"
                  viewBox="0 0 273 244"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="136.312"
                    cy="122"
                    rx="136.312"
                    ry="122"
                    fill="#03fc84"
                  />
                </svg>
                <img
                  className="homepage-about-section-image"
                  src={thumbsUp}
                  alt=""
                />
              </div>
              <h2>Advantages</h2>
              <p>
                We are proud to offer more than just products, but a
                comprehensive approach to your health. All our products are
                designed with the needs of professional athletes and beginners
                in mind. In addition, our individual training programs and
                professional consultations will help you achieve your goals
                faster and more efficiently.
              </p>
            </div>
            <div className="homepage-about-section">
              <div className="homepage-about-section-image-block">
                <svg
                  width="273"
                  height="244"
                  viewBox="0 0 273 244"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="136.312"
                    cy="122"
                    rx="136.312"
                    ry="122"
                    fill="#fcd303"
                  />
                </svg>
                <img
                  className="homepage-about-section-image"
                  src={basketball}
                  alt=""
                />
              </div>
              <h2>Values</h2>
              <p>
                We strive to provide quality, innovation, and support for a
                healthy lifestyle. Our team is passionate about their work and
                always aims to offer customers the highest level of products and
                services.
              </p>
            </div>
          </div>
        </div>
        <div className="homepage-services">
          <h1 className="homepage-services-title">Services</h1>
          <Sections />
        </div>
        <Footer />
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

export default Homepage;
