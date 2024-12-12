import React from 'react'
import '../styles/Home.css'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import LocationCard from '../components/cards/LocationCard'
import BasicRating from '../components/cards/BasicRating'
import PropTypes from 'prop-types';
import Footer from '../components/Footer'


/**
 * The main Home component that renders the landing page and features of the SANCHARAM Travels website.
 * 
 * @param {object} props - The props passed to the component.
 * @param {boolean} props.loggedIn - Indicates whether the user is logged in.
 * @param {string} props.email - The email of the logged-in user.
 * @returns {JSX.Element} - The rendered Home component.
 */
const Home = ({ loggedIn, email }) => {
  const navigate = useNavigate()

  // const onButtonClick = () => {
  //   navigate('/AuthForm')
  // }

  return (
    <>
    <div className="mainContainer">
      <Header/>
      <div className="titleContainer">
        <h1>Welcome to SANCHARAM Travels</h1>
      </div>
      
      <div className="contentContainer">
        <h2>Your Journey Begins Here</h2>
        <p>Discover amazing destinations and create unforgettable memories</p>
      </div>

  {/* location cards */}
  <div>
      <div className="locations-grid">
        <LocationCard 
          image="/images/960px-Kumarkom.jpg"
          title="Kerala Backwaters"
          description="Experience the serene backwaters of Kerala"
          price={299}
        />
        <LocationCard 
          image="/images/960px-Kumarkom.jpg"
          title="Kerala Backwaters"
          description="Experience the serene backwaters of Kerala"
          price={299}
        />
        <LocationCard 
          image="/images/960px-Kumarkom.jpg"
          title="Kerala Backwaters"
          description="Experience the serene backwaters of Kerala"
          price={299}
        />
        <LocationCard 
          image="public/images/960px-Kumarkom.jpg"
          title="Kerala Backwaters"
          description="Experience the serene backwaters of Kerala"
          price={299}
        />
      </div> {/* Close the locations-grid div */}
      <BasicRating />
    </div>
    <Footer/>
</div>
    </>
    
  )
}

export default Home
