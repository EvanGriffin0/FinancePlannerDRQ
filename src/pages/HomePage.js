//initial page user is met with where they can sign up or log in

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.js';
import SignUpForm from '../components/SignUpForm.js';


const Homepage = () => {
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and signup

  //basic login or sign up form page
  return (
    <div>
      <h1>Welcome to Finance Tracker</h1>
      {showLogin ? (
        <LoginForm />
      ) : (
        <SignUpForm />
      )}
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Go to Signup' : 'Go to Login'}
      </button>
    </div>
  );
};

export default Homepage;
