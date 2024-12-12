import React, { useState } from 'react';
import '../styles/AuthForm.css';

function AuthForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

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
    <div className="auth-form-container"> {/* Added container class */}
      <h2 className="auth-form-title">{isLoginMode ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit} className="auth-form"> {/* Added form class */}
        {!isLoginMode && (
          <div className="form-group"> {/* Added div class */}
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
        <div className="form-group"> {/* Added div class */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group"> {/* Added div class */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">{/* Added button class */}
          {isLoginMode ? 'Login' : 'Signup'}
        </button>
      </form>
      <p className="toggle-mode-text"> {/* Added paragraph class */}
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleMode} className="toggle-mode-button"> {/* Added button class */}
          {isLoginMode ? 'Signup' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
