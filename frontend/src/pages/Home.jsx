import React from 'react'
import '../styles/Home.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import LocationCard from '../components/cards/LocationCard'
import BasicRating from '../components/cards/BasicRating'
// import PropTypes from 'prop-types';
import FilterListIcon from '@mui/icons-material/FilterList'; // Import the filter icon
import ChatIcon from '@mui/icons-material/Chat'; // Import the chat icon

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
    <div className='main'>
     <div className="mainContainer">

<Header />


<div className="titleContainer">


    <div className="filter-icon-container">  {/* Container for filter icon */}

        <FilterListIcon /> {/* The filter icon */}

    </div>

    <div className="chatbot-icon-container"> {/* Add the chatbot icon */}
                  <ChatIcon />
              </div>

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
          title="Munnar"
          description="A beautiful hill station in Kerala."
          price={299}
        />
        <LocationCard 
          image="/images/960px-Kumarkom.jpg"
          title="Alleppey"
          description="Known for its serene backwaters."
          price={299}
        />
        <LocationCard 
          image="/images/960px-Kumarkom.jpg"
          title="Wayanad"
          description="Famous for its lush greenery and waterfalls."
          price={299}
        />
      </div> {/* Close the locations-grid div */}
      <BasicRating />
    </div>
    <Footer/>
</div>
    </div>
    
  )
}

export default Home
