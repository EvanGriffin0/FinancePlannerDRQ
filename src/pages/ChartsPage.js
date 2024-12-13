//import necessary charts
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPage = () => {
  const [expenditures, setExpenditures] = useState({
    transport: 0,
    housing: 0,
    bills: 0,
    recreation: 0,
    other: 0,
  });

  useEffect(() => {
    // Fetch expenditure data from the backend
    const fetchExpenditures = async () => {
      const username = localStorage.getItem('username'); // Get the username from localStorage
      try {
        //use username to get data from mongodb
        const response = await fetch(`http://localhost:4000/api/auth/userdata?username=${username}`);
        const data = await response.json();
        if (response.ok) {
          setExpenditures(data.expenditures || {
            transport: 0,
            housing: 0,
            bills: 0,
            recreation: 0,
            other: 0,
          });
        } else {
          console.error('Error fetching expenditure data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExpenditures();
  }, []);

  // set labels and colors
  const data = {
    labels: ['Transport', 'Housing', 'Bills', 'Recreation', 'Other'], // Categories
    datasets: [
      {
        data: Object.values(expenditures), // Values from state
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Colors
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Hover 
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',  
      },
    },
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
      <h2>Expenditure Breakdown</h2>
      <Link >
        <button style={{backgroundColor: '#4CAF50',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '10px', 
                    }} to='/update'>Edit Expenditure</button>
      </Link>
      

      <Pie style={{padding: "30px"}} data={data} options={options} />
    </div>
  );
};

export default ChartPage;
