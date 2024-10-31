import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { BASE_URL } from '../../utils/Apiurl';

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

Modal.setAppElement('#root');

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const [donationInfo, setDonationInfo] = useState({
    fullName: '',
    email: '',
    userId: parsedUser ? parsedUser._id : '',
    donationAmount: '',
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${BASE_URL}campaigns/all`, {
          headers: { "Content-Type": "application/json" },
        });
        setCampaigns(response.data.data);
      } catch (err) {
        setError('Error fetching campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationInfo({ ...donationInfo, [name]: value });
  };

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDonationInfo({
      fullName: '',
      email: '',
      userId: parsedUser ? parsedUser._id : '',
      donationAmount: '',
    });
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, userId, donationAmount } = donationInfo;

    if (!fullName || !email || !userId || !donationAmount) {
      alert('Please fill all the fields');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/campaigns/${selectedCampaign._id}/donate`, {
        userId,
        fullName,
        email,
        amount: donationAmount,
      });
      alert('Donation successful!');
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Donation failed');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!campaigns.length) return <p>No campaigns available</p>;

  return (
    <div style={styles.gridContainer}>
      {campaigns.map((campaign) => {
        const progress = Math.round((campaign.donationReceived / campaign.donationGoal) * 100);
        const today = new Date();
        const endDate = new Date(campaign.fundRaisingEndDate);
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

        return (
          <div key={campaign._id} style={styles.card}>
            <div style={{ width: '100%', height: '150px' }}>
      <img
       src={campaign.image_url} alt={campaign.title} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
            {/* <img src={campaign.image_url} alt={campaign.title} style={styles.image} /> */}
            <div style={styles.cardContent}>
              <h3>{campaign.title}</h3>
              <p>{campaign.content}</p>
              <p>Author: {campaign.author}</p>
              <p>
                Raised: ₹{campaign.donationReceived.toLocaleString()} / ₹{campaign.donationGoal.toLocaleString()}
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

// Styles (add your CSS-in-JS or CSS classes here)
const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'stretch',
    
  },
  cardContent: {
    padding: '16px',
  },
  progressBar: {
    background: '#f3f3f3',
    borderRadius: '4px',
    height: '10px',
    margin: '8px 0',
  },
  progress: {
    background: '#4caf50',
    height: '100%',
    borderRadius: '4px',
  },
  donateLink: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '10px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  submitButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  },
  cancelButton: {
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  },
};

export default CampaignList;
