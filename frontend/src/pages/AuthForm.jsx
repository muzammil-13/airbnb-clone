import React, { useState } from 'react';
import './AuthForm.css'

function AuthForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For signup


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginMode) {
      console.log("Login with:", email, password);
    } else {
      console.log("Signup with:", username, email, password);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };


  return (
    <div>
      <h2>{isLoginMode ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && ( // Username field only for signup
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLoginMode ? 'Login' : 'Signup'}</button>
      </form>
      <p>
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleMode}>
          {isLoginMode ? 'Signup' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;

