//initial page user is met with where they can sign up or log in

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.js';
import SignUpForm from '../components/SignUpForm.js';


const Homepage = () => {
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and signup

  //basic login or sign up form page
  return (
    <div style={{textAlign: "center"}} >
      <h1  >Welcome to Finance Tracker</h1>
      {showLogin ? (
        <LoginForm />
      ) : (
        <SignUpForm />
      )}
      
      <button style={{
        backgroundColor: "#6a1b9a", 
        color: "white", 
        padding: "0.8rem 1.5rem", 
        fontSize: "1rem", 
        fontWeight: "bold", 
        border: "none",
        borderRadius: "5px", 
        cursor: "pointer", 
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    }} onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Go to Signup' : 'Go to Login'}
      </button>
    </div>
  );
};

export default Homepage;
