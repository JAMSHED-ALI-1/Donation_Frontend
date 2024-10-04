import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Modal styles
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
  },
};

Modal.setAppElement('#root');  // Set root for accessibility

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  // const parsedUser = JSON.parse(storedUser)
  // console.log('User stored in localStorage:', localStorage.getItem("user"));
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  if (parsedUser) {
    // console.log('User ID:', parsedUser._id);
    // console.log('Email:', parsedUser.email);
    // console.log('Avatar:', parsedUser.avatar);
    // console.log('Token:', parsedUser.token);
} else {
    console.log('No user data found in localStorage.');
}
  const [donationInfo, setDonationInfo] = useState({
    fullName: '',
    email: '',
    userId: parsedUser._id,
    donationAmount: '',
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns/');
        setCampaigns(response.data);
        console.log(response.data)
      } catch (err) {
        setError('Error fetching campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Handle input change for the donation modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationInfo({ ...donationInfo, [name]: value });
  };

  // Open the modal
  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDonationInfo({
      fullName: '',
      email: '',
      userId: '',
      donationAmount: '',
    });
  };

  // Handle donation submission
  const handleDonationSubmit = async (e) => {
  e.preventDefault();
  const { fullName, email, userId, donationAmount } = donationInfo;

  // Simple validation
  if (!fullName || !email || !userId || !donationAmount) {
    alert('Please fill all the fields');
    return;
  }

  try {
    await axios.post(`http://localhost:5000/api/campaigns/${selectedCampaign._id}/donate`, {
      userId,
      fullName,
      email,
      amount: donationAmount,
    });

    alert('Donation successful!');
    closeModal();

    // Refresh the page after successful donation
    window.location.reload();  
  } catch (err) {
    console.error(err);
    alert('Donation failed');
  }
};


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!campaigns.length) {
    return <p>No campaigns available</p>;
  }

  return (
    <div style={styles.gridContainer}>
      {campaigns.map((campaign) => {
        const progress = Math.round((campaign.donationReceived / campaign.donationGoal) * 100);

        const today = new Date();
        const endDate = new Date(campaign.fundRaisingEndDate);
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

        return (
          <div key={campaign._id} style={styles.card}>
            <img src={campaign.urlToImage} alt={campaign.title} style={styles.image} />
            <div style={styles.cardContent}>
              <h3>{campaign.title}</h3>
              <p>{campaign.content}</p>
              <p>Author: {campaign.author}</p>
              <p>
                Raised: {campaign.donationCurrency} {campaign.donationReceived.toLocaleString()} / {campaign.donationCurrency} {campaign.donationGoal.toLocaleString()}
              </p>
              <p>Progress: {progress}%</p>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progress, width: `${progress}%` }}></div>
              </div>
              <p>{daysLeft} Days Left</p>
              <button onClick={() => openModal(campaign)} style={styles.donateLink}>
                Donate Now
              </button>
            </div>
          </div>
        );
      })}

      {/* Modal for donation */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyles} contentLabel="Donate">
  <h2>Donate to {selectedCampaign?.title}</h2>
  <form onSubmit={handleDonationSubmit} style={styles.form}>
    <div style={styles.formGroup}>
      <label style={styles.label}>Full Name:</label>
      <input type="text" name="fullName" value={donationInfo.fullName} onChange={handleInputChange} required style={styles.input} />
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label}>Email:</label>
      <input type="email" name="email" value={donationInfo.email} onChange={handleInputChange} required style={styles.input} />
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label}>User ID:</label>
      <input type="text" name="userId" value={donationInfo.userId} onChange={handleInputChange} required style={styles.input} />
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label}>Donation Amount (₹):</label>
      <input type="number" name="donationAmount" value={donationInfo.donationAmount} onChange={handleInputChange} required style={styles.input} />
    </div>
    <button type="submit" style={styles.submitButton}>Submit Donation</button>
    <button type="button" onClick={closeModal} style={styles.cancelButton}>Cancel</button>
  </form>
</Modal>

    </div>
  );
};

// Styles
const styles = {
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-around',
    marginTop: '65px',
  },
  card: {
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: '#fff',
    transition: '0.3s',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '15px',
  },
  progressBar: {
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    margin: '10px 0',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: '5px',
  },
  donateLink: {
    display: 'inline-block',
    padding: '10px 15px',
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '15px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',  // Stack the label and input vertically
    marginBottom: '15px',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',  // Make sure input fields are full width
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',  // Full width button
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',  // Full width button
    marginTop: '10px',
  },
};

export default CampaignList;
