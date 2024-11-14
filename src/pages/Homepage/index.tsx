import "./style.css";
import Navbar from '../../components/Navbar';
import Sections from '../../components/Sections';
import Footer from '../../components/Footer';
import { useContext } from "react";
import { ModalContext } from "../../App";
import AccountModal from "../../components/AccountModal";

const Homepage = () => {
  const hero_img = "https://workout-corner.s3.eu-north-1.amazonaws.com/homepage/hero_img.png";
  const context = useContext(ModalContext);
  const {modal} = context

  return (
    <>
      <div className='homepage'>
        <Navbar/>
        <div className='homepage-hero'>
          <h1 className='homepage-hero-title'>Welcome to the WorkoutCorner</h1>
          <img src={hero_img} alt="" />
        </div>
        <div className='homepage-about'>
          <h1 className='homepage-about-title'>About us</h1>
          <div className='homepage-about-sections'>
            <div className='homepage-about-section'>
              <svg width="273" height="244" viewBox="0 0 273 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="136.312" cy="122" rx="136.312" ry="122" fill="#D9D9D9" />
              </svg>
              <h2>History</h2>
              <p>WorkoutCorner was born as a result of our passion for sports and a healthy lifestyle. We have always believed that physical activity is the key to physical and mental well-being. That's why we created a platform where everyone can find everything they need for training — from high-quality sportswear to personalized training programs.</p>
            </div>
            <div className='homepage-about-section'>
              <svg width="273" height="244" viewBox="0 0 273 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="136.312" cy="122" rx="136.312" ry="122" fill="#D9D9D9" />
              </svg>
              <h2>Advantages</h2>
              <p>We are proud to offer more than just products, but a comprehensive approach to your health. All our products are designed with the needs of professional athletes and beginners in mind. In addition, our individual training programs and professional consultations will help you achieve your goals faster and more efficiently.</p>
            </div>
            <div className='homepage-about-section'>
              <svg width="273" height="244" viewBox="0 0 273 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="136.312" cy="122" rx="136.312" ry="122" fill="#D9D9D9" />
              </svg>
              <h2>Values</h2>
              <p>We strive to provide quality, innovation, and support for a healthy lifestyle. Our team is passionate about their work and always aims to offer customers the highest level of products and services.</p>
            </div>
          </div>
        </div>
        <div className='homepage-services'>
          <h1 className='homepage-services-title'>Services</h1>
          <Sections />
        </div>
        <Footer />
      </div>
      {modal && <AccountModal/>}
    </>
  )
}

export default Homepage;
