import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = () => {
    const [formData, setFormData] = useState({
        author: '',
        title: '',
        content: '',
        category: '',
        fundRaisingStartDate: '',
        fundRaisingEndDate: '',
        url: '',
        donationGoal: ''
    });
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState({});

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input changes
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Validate form fields
    const validateForm = () => {
        const errors = {};
        if (!formData.author) errors.author = 'Author is required';
        if (!formData.title) errors.title = 'Title is required';
        if (!formData.content) errors.content = 'Content is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.fundRaisingStartDate) errors.fundRaisingStartDate = 'Start date is required';
        if (!formData.fundRaisingEndDate) errors.fundRaisingEndDate = 'End date is required';
        if (!formData.url) errors.url = 'URL is required';
        if (!formData.donationGoal) errors.donationGoal = 'Donation goal is required';
        else if (isNaN(formData.donationGoal) || formData.donationGoal <= 0) {
            errors.donationGoal = 'Donation goal must be a positive number';
        }
        return errors;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Validate form
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
          setErrorMessage(errors);
          return;
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
      });
  
      try {
          const response = await axios.post('http://localhost:3000/api/campaigns/create', formDataToSend);
          setSuccessMessage(response.data.message);
          setErrorMessage({});
          // Reset form fields
          setFormData({
              author: '',
              title: '',
              content: '',
              category: '',
              fundRaisingStartDate: '',
              fundRaisingEndDate: '',
              url: '',
              donationGoal: ''
          });
          setFile(null);
      } catch (error) {
          console.error('API Error:', error); // Detailed logging
          setErrorMessage({ api: error.response?.data?.message || 'Something went wrong' });
          setSuccessMessage('');
      }
  };
  

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Create Campaign</h1>
            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
            {errorMessage.api && <div style={styles.errorMessage}>{errorMessage.api}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
                {/** Each input field is wrapped in a div with class 'form-group' for consistent styling */}
                <div style={styles.formGroup}>
                    <label htmlFor="author" style={styles.label}>Author</label>
                    <input 
                        type="text" 
                        name="author" 
                        value={formData.author} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errorMessage.author && <div style={styles.errorMessage}>{errorMessage.author}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="title" style={styles.label}>Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errorMessage.title && <div style={styles.errorMessage}>{errorMessage.title}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="content" style={styles.label}>Content</label>
                    <textarea 
                        name="content" 
                        value={formData.content} 
                        onChange={handleChange} 
                        style={{ ...styles.input, resize: 'vertical' }} 
                    />
                    {errorMessage.content && <div style={styles.errorMessage}>{errorMessage.content}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="category" style={styles.label}>Category</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errorMessage.category && <div style={styles.errorMessage}>{errorMessage.category}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="fundRaisingStartDate" style={styles.label}>Fund Raising Start Date</label>
                    <input 
                        type="date" 
                        name="fundRaisingStartDate" 
                        value={formData.fundRaisingStartDate} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errorMessage.fundRaisingStartDate && <div style={styles.errorMessage}>{errorMessage.fundRaisingStartDate}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="fundRaisingEndDate" style={styles.label}>Fund Raising End Date</label>
                    <input 
                        type="date" 
                        name="fundRaisingEndDate" 
                        value={formData.fundRaisingEndDate} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errorMessage.fundRaisingEndDate && <div style={styles.errorMessage}>{errorMessage.fundRaisingEndDate}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="url" style={styles.label}>URL</label>
                    <input 
                        type="url" 
                        name="url" 
                        value={formData.url} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errorMessage.url && <div style={styles.errorMessage}>{errorMessage.url}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="donationGoal" style={styles.label}>Donation Goal</label>
                    <input 
                        type="number" 
                        name="donationGoal" 
                        value={formData.donationGoal} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errorMessage.donationGoal && <div style={styles.errorMessage}>{errorMessage.donationGoal}</div>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="file" style={styles.label}>Upload Image</label>
                    <input 
                        type="file" 
                        name="file" 
                        onChange={handleFileChange} 
                        style={styles.fileInput} 
                    />
                    {file && <div style={styles.fileName}>Selected file: {file.name}</div>}
                </div>
                <button type="submit" style={styles.submitButton}>Create Campaign</button>
            </form>
        </div>
    );
};

// Inline styles for the component
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    successMessage: {
        color: 'green',
        marginBottom: '10px',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        fontSize: '14px',
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    fileName: {
        marginTop: '5px',
        color: '#666',
    },
    submitButton: {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#5cb85c',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default CampaignForm;
