import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import LandingPage from './LandingPage'
import Navbar from '../components/Navbar'


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

  const onButtonClick = () => {
    navigate('/AuthForm')
  }

  return (
    <>
    <div className="mainContainer">
      <Navbar/>
      <div className="titleContainer">
        <h1>Welcome to SANCHARAM Travels</h1>
      </div>
      
      <div className="contentContainer">
        <h2>Your Journey Begins Here</h2>
        <p>Discover amazing destinations and create unforgettable memories</p>
      </div>

  <LandingPage/>

      <div className="featuresContainer">
        <div className="feature">
          <h3>Best Deals</h3>
          <p>Find the most competitive prices</p>
        </div>
        <div className="feature">
          <h3>24/7 Support</h3>
          <p>We're always here to help</p>
        </div>
        <div className="feature">
          <h3>Safe Travel</h3>
          <p>Your safety is our priority</p>
        </div>
      </div>

      {/* <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn && <div>Logged in as: {email}</div>}
      </div> */}
</div>
    </>
    
  )
}

export default Home
