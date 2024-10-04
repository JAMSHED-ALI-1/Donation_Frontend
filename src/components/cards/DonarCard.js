import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'
function DonarCard() {
  // State to hold the donor data
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Function to get donation data
  const GetDonationData = async () => {
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjVhYmRmNDkyZTQzZDZjODIzZjYxNiIsImlhdCI6MTcyNzc3NzIxMywiZXhwIjoxNzMwMzY5MjEzfQ.QprtUltZKq1-RyCFHPYoq6uKeFW-BewjA-w9_InhH70' // Update with your actual token
    try {
      const res = await axios.get('http://localhost:5000/api/donations/', {
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization token
          'Content-Type': 'application/json',
        }
      });
     console.log(res?.data)
      setDonors(res?.data); // Expecting an array of donors
    } catch (err) {
      console.error(err);
      setError('Failed to fetch donor data');
    }
  };

  // Fetch donor data when the component mounts
  useEffect(() => {
    GetDonationData();
  }, []);

  // Render loading or error message if needed
  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  // Render a loading message while the data is being fetched
  if (donors.length === 0) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {donors.map((donor) => (
        <div key={donor._id} style={styles.card}>
          <h2 style={styles.cardTitle}>Donor Information</h2>
          <p style={styles.cardText}><strong>Name:</strong> {donor.firstName} {donor.lastName}</p>
          <p style={styles.cardText}><strong>Total Donations:</strong> {donor.donation.length}</p>
          <p style={styles.cardText}><strong>Address:</strong> {donor.address1}{donor.address2}</p>
          <p style={styles.cardText}>{donor.city}{donor.state}({donor.zip})</p>
          <p style={styles.cardText}><strong>Phone:</strong> {donor.phone}</p>
          <p style={styles.cardText}><strong>Email:</strong> {donor.email}</p>
          <p style={styles.cardText}><strong>Donation Amount:</strong> 
            {donor.donation.map((donation) => (
              <span key={donation._id} style={styles.amount}>${donation.amount} </span>
            ))}
          </p>
   
          <button style={styles.button}  onClick={() => navigate("/DonarCard")}>Donate Again</button>
       
        </div>
      ))}
    </div>
  );
}

export default DonarCard;

const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap', // Allows wrapping of items
      justifyContent: 'space-around', // Space between items
      backgroundColor: '#f4f4f4', // Light background
      padding: '20px',
      marginTop: '60px',
    },
    card: {
      backgroundColor: '#fff', // White background for the card
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow
      padding: '20px',
      maxWidth: '30%', // Set to 30% to allow 3 columns with margins
      margin: '10px', // Margin for spacing between cards
      textAlign: 'center',
      flex: '1 1 30%', // Flex-grow, flex-shrink, and basis for responsiveness
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    cardText: {
      fontSize: '18px',
      margin: '10px 0',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      margin: '10px 5px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%', // Makes the button full-width
    },
    loading: {
      fontSize: '18px',
      textAlign: 'center',
      marginTop: '20px',
    },
    error: {
      color: 'red',
      fontSize: '18px',
      textAlign: 'center',
      marginTop: '20px',
    },
  };
