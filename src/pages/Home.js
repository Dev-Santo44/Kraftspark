import React from 'react';
import LoginButton from '../components/common/LoginButton';
import './../assets/styles/pages/home.css';
import bn1 from './../assets/images/bn1.jpg';
import mlbb from './../assets/images/mlbb.png';
import Footer from '../components/layout/Footer';

function Home() {
    return (
        <div className="home-page">
            <section className="hero-section">
                <img className="hero-banner" src={bn1} alt="Main Banner" />
                <div className="hero-overlay">
                    <img className="mlbb-logo" src={mlbb} alt="MLBB Logo" />
                    <div className="hero-text">
                        <p className="subtitle">Welcome to</p>
                        <h1 className="main-title">Kraft Spark</h1>
                        <p className="description">
                            Discover a new way to level up your gaming experience! At Kraft Spark, we provide a seamless and secure platform for purchasing in-game packs, including diamonds for Mobile Legends: Bang Bang (MLBB).
                        </p>
                        <LoginButton title="Buy Now" desti="/store" />
                    </div>
                </div>
            </section>

            <section className="features">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="features-container">
                    <div className="feature-item">
                        <h3>Instant Delivery</h3>
                        <p>Receive your purchases instantly with real-time updates.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Secure Payments</h3>
                        <p>We prioritize your security with advanced encryption for all transactions.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Exclusive Offers</h3>
                        <p>Enjoy discounts, rewards, and seasonal promotions tailored for gamers.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Global Support</h3>
                        <p>Accessible from anywhere in the world with 24/7 customer support.</p>
                    </div>
                </div>
                <p className="quote">"Elevate your gaming journey with unparalleled convenience and trust."</p>
            </section>

            <section className="cta-section">
                <div className="cta-content">
                    <p>
                        Join thousands of gamers who trust Kraft Spark for their in-game needs. Explore our store, top up your wallet, and take your gaming to the next level!
                    </p>
                    <div className="cta-buttons">
                        <LoginButton title="Get Started" desti="/login" />
                        <LoginButton title="Join Community" desti="/login" />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;