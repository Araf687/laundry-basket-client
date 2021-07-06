import React from 'react';
import Header from '../../Header/Header/Header';
import Footer from '../Footer/Footer';
import Review from '../Review/Review';
import Feature from '../Feature/Feature';
import Services from '../Services/Services';


const Home = () => {
    return (
        <div>
            <Header></Header>
            <Services></Services>
            <Feature></Feature>
            <Review></Review>
            <Footer></Footer>
        </div>
    );
};

export default Home;