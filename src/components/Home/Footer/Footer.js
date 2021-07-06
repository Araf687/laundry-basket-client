import React from 'react';
import './Footer.css';
import {
    Link
  } from "react-router-dom";
  import {FaFacebook} from 'react-icons/fa';
  import {AiFillTwitterCircle} from 'react-icons/ai';
  import {IoLogoWhatsapp} from 'react-icons/io';
  import { FaLinkedin} from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="footer-distributed">

                <div className="footer-left">
                    <h2>Laundry Basket</h2>
                    <p className="footer-company-about">
                        Laundry Basket is help to wash your cloth. Just order your service and we will pick your cloths within 1 hour.                        
                    </p>
                    <p className="footer-location">134 street Badda, Dhaka, Bangladesh</p>
                    <p className="footer-location">+880-183-770-9650</p>
                    <p className="footer-location">laundrybasket@mail.com</p>
                    <div className="footer-icons">
                        <Link to="#"><AiFillTwitterCircle/></Link>
                        <Link to="#"><FaFacebook style={{fontSize:'20px'}}/></Link>
                        <Link to="#"><IoLogoWhatsapp/></Link>
                    </div>
                    
                </div>

                <div className="footer-center">
                    <p className="footer-links">
                        <Link to="#">Privacy {'&'} Policy</Link>                    
                        <Link to="#">Terms and Condition</Link>                    
                        <Link to="#">FAQ</Link>                        
                        <Link to="#">More About</Link>
                    </p>
                    
                </div>
                <div className="footer-right">
                    
                    <p className="footer-links">                  
                        <Link to="#">Blog</Link>                    
                        <Link to="#">Pricing</Link>                        
                        <Link to="#">Services</Link>                   
                        <Link to="#">Contact</Link>
                    </p>

                </div>

            </footer>
        </div>
    );
};

export default Footer;