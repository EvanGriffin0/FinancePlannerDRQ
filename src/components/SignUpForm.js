//sign up form 

import React, { useState } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  //function to log the sign up data into the database
  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Signup successful!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  //sign up page for user to enter there new details
  return (
    <div style={{textAlign: "center"}}>
      <h2>Signup</h2>
      <div>
        <input
          style={{
            width: "50%",
            padding: "0.8rem",
            marginBottom: "1rem",
            fontSize: "1rem",
            border: "2px solid #ddd",
            borderRadius: "5px",
            boxSizing: "border-box",
            outline: "none",
            transition: "border-color 0.3s ease",
           }}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> 
      </div>
      <div>
      <input
          style={{
          width: "50%",
          padding: "0.8rem",
          marginBottom: "1rem",
          fontSize: "1rem",
          border: "2px solid #ddd",
          borderRadius: "5px",
          boxSizing: "border-box",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}      
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
     
      <button style={{
        backgroundColor: "#6a1b9a", 
        padding:"15px",
        color: "white", 
        padding: "0.8rem 1.5rem", 
        fontSize: "1rem",
        fontWeight: "bold", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer", 
        transition: "background-color 0.3s ease, box-shadow 0.3s ease", 
        margin: "10px",}} onClick={handleSignup}>Signup</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpForm;
