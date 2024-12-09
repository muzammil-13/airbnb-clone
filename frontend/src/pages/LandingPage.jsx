import React from 'react'
import LocationCard from '../components/cards/LocationCard'
import BasicRating from '../components/cards/BasicRating'
// import LocationData from '../data/LocationData'

function LandingPage() {
  return (
    <div> {/* Added a wrapping div */}
      <div className="locations-grid">
        <LocationCard 
          image="public/images/960px-Kumarkom.jpg"
          title="Kerala Backwaters"
          description="Experience the serene backwaters of Kerala"
          price={2999}
        />
        <LocationCard 
          image="public/images/960px-Kumarkom.jpg"
          title="Kerala Backwaters"
          description="Experience the serene backwaters of Kerala"
          price={2999}
        />
        <LocationCard 
          image="public/images/960px-Kumarkom.jpg"
          title="Kerala Backwaters"
          description="Experience the serene backwaters of Kerala"
          price={2999}
        />
        <LocationCard 
          image="public/images/960px-Kumarkom.jpg"
          title="Kerala Backwaters"
          description="Experience the serene backwaters of Kerala"
          price={2999}
        />
      </div> {/* Close the locations-grid div */}
      <BasicRating />
    </div> 
  )
}

export default LandingPage
