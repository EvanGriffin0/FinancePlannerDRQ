//comparison page of the users finance data
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SavingsPage= () => {
  const [income, setIncome] = useState([0, 0, 0]); //hold income for the last 3 months

  useEffect(() => {
    // Fetch income data from the backend
    const fetchIncome = async () => {
      const username = localStorage.getItem('username'); // Get the username from localStorage
      try {
        const response = await fetch(`http://localhost:4000/api/auth/userdata?username=${username}`);
        const data = await response.json();
        if (response.ok) {
          setIncome(data.income || [0, 0, 0]); // Set income state or fallback to [0, 0, 0]
        } else {
          console.error('Error fetching income data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchIncome();
  }, []);

  // Prepare data for the Bar chart
  const data = {
    labels: ['Month 1', 'Month 2', 'Month 3'], // Labels for each month
    datasets: [
      {
        label: 'Income (Euro)', // Label for the dataset
        data: income, // Income values from state
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for each bar
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Hover colors for each bar
        borderRadius: 5, // Rounded corners for bars
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Legend position
      },
      title: {
        display: true,
        text: 'Income Comparison Over Last 3 Months', // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure the y-axis starts at 0
        ticks: {
          callback: (value) => `$${value}`, // Format y-axis ticks as currency
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h2>Income Comparison</h2>
      <Bar style={{padding: "30px"}}  data={data} options={options} />
    </div>
  );
};

export default SavingsPage;
