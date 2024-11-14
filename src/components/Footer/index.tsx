import React from 'react'
import "./style.css"

const Footer = () => {
  const footer_logo = "https://workout-corner.s3.eu-north-1.amazonaws.com/homepage/footer_logo.png"

  return (
    <div className='footer'>
      <div className='footer-left'>
        <img src={footer_logo} alt="Logo" />
      </div>
      <div className='footer-right'>
        <div className='footer-right-section'>
          <h1>Location</h1>
          <p>123 Demo Street <br /> New York, NY 12345</p>
        </div>
        <div className='footer-right-section'>
          <h1>Contact</h1>
          <p>email@example.com <br /> (555) 555-5555</p>
        </div>
      </div>
    </div>
  )
}

export default Footer