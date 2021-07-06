import React from 'react';
import Banner from '../Banner/Banner';
import Navbar from '../Navbar/Navbar';
import './header.css';

const Header = () => {
    return (
        <div className="header-container">
            <div style={{zIndex:'100'}}>
                <Navbar></Navbar>
                <Banner></Banner>
            </div>
        </div>
    );
};

export default Header;