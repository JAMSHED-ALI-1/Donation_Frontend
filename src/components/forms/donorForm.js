import React, { useState } from 'react';
import axios from 'axios';

const DonationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    amount: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const { firstName, lastName, address1, city, state, zip, email, phone, amount } = formData;
    if (!firstName || !lastName || !address1 || !city || !state || !zip || !email || !phone || !amount) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjVhYmRmNDkyZTQzZDZjODIzZjYxNiIsImlhdCI6MTcyNzc3NzIxMywiZXhwIjoxNzMwMzY5MjEzfQ.QprtUltZKq1-RyCFHPYoq6uKeFW-BewjA-w9_InhH70'
try {
  const res = await axios.post(
    'http://localhost:5000/api/donations/AddDonation',
    formData, // Data to be sent in the request body
    {
      headers: {
        'Authorization': `Bearer ${token}`, // Authorization token
        'Content-Type': 'application/json', // If formData is JSON
      }
    }
  );
  console.log('Donation added successfully:', res.data);
} catch (error) {
  console.error('Error adding donation:', error.response?.data || error.message);
}

  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Donation Page</h1>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div className="donation-form-container" style={styles.formContainer}>
          <h2 style={styles.heading}>Make a Donation</h2>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Personal Information */}
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Address Information */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Address Line 1</label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Contact Information */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Donation Amount */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Donation Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.button}>Donate</button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        {/* <p style={styles.footerText}>© 2024 Donation Platform. All rights reserved.</p> */}
      </footer>
    </div>
  );
};

// Styles for the entire page
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#007bff',
    padding: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '2em',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f4f4f9',
  },
  formContainer: {
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#007bff',
    padding: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  footerText: {
    margin: 0,
  },
};

export default DonationPage;
