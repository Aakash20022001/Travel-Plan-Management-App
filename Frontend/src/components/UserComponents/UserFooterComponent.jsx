import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../../styles/styles.css';

const FooterComponent = () => {
  return (
    <footer className="footer bg-dark text-light " style={{ paddingLeft: 0, paddingRight: 0 }}>
      
        <div className="row" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="col-lg-4">
            {/* Social Icons */}
            <ul className="list-inline icons">
              <li className="list-inline-item" >
                <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="icon-white" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} className="icon-white"/>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} className="icon-white"/>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 text-center">
            {/* Copyright Information */}
            <p>&copy; 2023 Aakash Sikarwar CSPL. All rights reserved.</p>
          </div>
          <div className="col-lg-4 text-right">
            {/* Additional Links */}
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/privacy-policy" className="icon-white">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="/terms-of-service" className="icon-white">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
  
    </footer>
  );
};

export default FooterComponent;
