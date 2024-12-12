import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './styles/App.css';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import AuthForm from './pages/AuthForm';
import Details from './pages/Details'; // Import the Details component
import Listings from './pages/Listings'; // Import Listings component
import Bookings from './pages/Bookings'; // Import your Bookings component


function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Improved error handling
        }
        const userData = await response.json();
        setUser(userData);  // Store the entire user object
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
        localStorage.setItem('isLoggedIn', !!userData); // Store login status

      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., display an error message, redirect)
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);
    }


  }, []);

  useEffect(() => {
    document.title = user ? `Welcome, ${user.email}` : "SANCHARAM TRAVELS";
  }, [user]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/listings" element={<Listings />} /> {/* Route for Listings page */}
          <Route path="/details/:title" element={<Details />} />
          <Route
            path="/AuthForm"
            element={!user ? <AuthForm setUser={setUser} /> : <Navigate to="/" />} // Redirect if logged in
          />
             <Route path="*" element={<Navigate to="/" />} />
             <Route path="/bookings/:title" element={<Bookings />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
