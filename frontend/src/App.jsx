import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import AuthForm from './pages/AuthForm'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<Home loggedIn={loggedIn} email={email} />} 
          />
          <Route 
            path="/AuthForm" 
            element={<AuthForm setLoggedIn={setLoggedIn} setEmail={setEmail} />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
