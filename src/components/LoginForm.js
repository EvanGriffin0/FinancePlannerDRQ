//Login in form
//added nav import to direct to dashboard upon successful login
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  //initialise navigation
  const navigate = useNavigate();

  //function to check the users entered credentials with that stored on the database
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('username', username); // Store username in localStorage
        console.log(username);
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };
  

  //take in user input to be check with database data
  return (
    <div style={{textAlign: "center"}} >
      <h2 >Login</h2>

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
        margin: "10px", 
        transition: "background-color 0.3s ease, box-shadow 0.3s ease", }} onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
