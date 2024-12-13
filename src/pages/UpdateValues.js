import React, { useState, useEffect } from 'react';

// Component to update user income and expenditure values
const UpdateValues = () => {
  // State to store user income
  const [income, setIncome] = useState(['', '', '']);
  
  // State to store user expenditure data (transport, housing, etc.)
  const [expenditures, setExpenditures] = useState({
    transport: '',
    housing: '',
    bills: '',
    recreation: '',
    other: '',
  });

  // Fetch user data from the backend 
  useEffect(() => {
    const fetchUserData = async () => {
      const username = localStorage.getItem('username'); // Get username from localStorage
      console.log('Fetching data for username:', username);
  
      try {
        const response = await fetch(`http://localhost:4000/api/auth/userdata?username=${username}`, {
          method: 'GET',
        });
  
        const data = await response.json();
        if (response.ok) {
          // Set state with fetched income and expenditures
          setIncome(data.income || ['', '', '']);
          setExpenditures(data.expenditures || {
            transport: '',
            housing: '',
            bills: '',
            recreation: '',
            other: '',
          });
        } else {
          console.error('Fetch error:', data.message);
          alert(data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchUserData();
  }, []); 

  // Function to handle updates to user data
  const handleUpdate = async () => {
    // validate data fir income and expenditure data before sending to backend
    const sanitizedIncome = income.map(value => Number(value)); // Convert income to numbers
    const sanitizedExpenditures = {
      transport: Number(expenditures.transport),
      housing: Number(expenditures.housing),
      bills: Number(expenditures.bills),
      recreation: Number(expenditures.recreation),
      other: Number(expenditures.other),
    };
  
    const username = localStorage.getItem('username'); // Get username from localStorage
    console.log('Sending update request:', { username, income: sanitizedIncome, expenditures: sanitizedExpenditures });
  
    try {
      // API call to update user data
      const response = await fetch('http://localhost:4000/api/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, income: sanitizedIncome, expenditures: sanitizedExpenditures }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Values updated successfully!');
      } else {
        console.error('Update error:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating values:', error);
    }
  };

  // Inline styles for the form and its elements
  const containerStyle = {
    maxWidth: "600px", 
    margin: "0 auto", 
    padding: "20px",
    backgroundColor: "#f9f9f9", 
    borderRadius: "10px", 
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "140px", 
  };
  
  const headerStyle = {
    textAlign: "center", 
    marginBottom: "20px",
    color: "#333",
  };
  
  const groupStyle = {
    marginBottom: "20px",
  };
  
  const inputStyle = {
    width: "100%", 
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    border: "1px solid #ddd", 
    borderRadius: "5px", 
    boxSizing: "border-box",
  };
  
  const labelStyle = {
    display: "block", 
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  };
  
  const buttonStyle = {
    width: "100%", 
    padding: "12px",
    backgroundColor: "#6a1b9a",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease", 
  };
  
  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#8e24aa", 
  };
  
  //load page
  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Update Your Values</h2>
  
      {/* Income Section */}
      <div style={groupStyle}>
        <h3 style={headerStyle}>Income</h3>
        {income.map((value, index) => (
          <div key={index}>
            <label style={labelStyle}>Month {index + 1} Income</label>
            <input
              style={inputStyle}
              type="number"
              value={value}
              placeholder={`Enter income for month ${index + 1}`}
              onChange={(e) => {
                const newIncome = [...income];
                newIncome[index] = e.target.value;
                setIncome(newIncome);
              }}
            />
          </div>
        ))}
      </div>
  
      {/* Expenditures Section */}
      <div style={groupStyle}>
        <h3 style={headerStyle}>Expenditures</h3>
        {Object.keys(expenditures).map((key) => (
          <div key={key}>
            <label style={labelStyle}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              style={inputStyle}
              type="number"
              value={expenditures[key]}
              placeholder={`Enter ${key} expenditure`}
              onChange={(e) =>
                setExpenditures({ ...expenditures, [key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>
  
      {/* Update Button */}
      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#8e24aa")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#6a1b9a")}
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateValues;
