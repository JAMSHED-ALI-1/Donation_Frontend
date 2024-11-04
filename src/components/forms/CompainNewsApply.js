import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/Apiurl';

const CampaignForm = () => {
    const [formData, setFormData] = useState({
        author: '',
        title: '',
        content: '',
        url: '',
        category: '',
        fundRaisingStartDate: '',
        fundRaisingEndDate: '',
        donationGoal: '',
    });
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]);
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${BASE_URL}category/getAllCat`);
            setCategories(res.data.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Failed to fetch categories. Please try again.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        if (file) {
            formDataToSend.append('imageUrl', file);
        }

        try {
            const response = await axios.post(
                'https://donation-backend-app.vercel.app/api/campaigns/create',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setSuccessMessage('Campaign created successfully!');
            setErrorMessage('');
            setFormData({
                author: '',
                title: '',
                content: '',
                url: '',
                category: '',
                fundRaisingStartDate: '',
                fundRaisingEndDate: '',
                donationGoal: '',
            });
            setFile(null);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred while creating the campaign.');
            setSuccessMessage('');
            console.error('Error:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Create Campaign</h1>
            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.twoColumnWrapper}>
                    <div style={styles.formGroup}>
                        <label htmlFor="author" style={styles.label}>Author</label>
                        <input type="text" name="author" value={formData.author} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="title" style={styles.label}>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={styles.input} />
                    </div>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="content" style={styles.label}>Content</label>
                    <textarea name="content" value={formData.content} onChange={handleInputChange} style={{ ...styles.input, resize: 'vertical' }} />
                </div>
                <div style={styles.twoColumnWrapper}>
                    <div style={styles.formGroup}>
                        <label htmlFor="url" style={styles.label}>URL</label>
                        <input type="url" name="url" value={formData.url} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="category" style={styles.label}>Category</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} style={styles.input} required>
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.category_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={styles.twoColumnWrapper}>
                    <div style={styles.formGroup}>
                        <label htmlFor="fundRaisingStartDate" style={styles.label}>Fund Raising Start Date</label>
                        <input type="date" name="fundRaisingStartDate" value={formData.fundRaisingStartDate} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="fundRaisingEndDate" style={styles.label}>Fund Raising End Date</label>
                        <input type="date" name="fundRaisingEndDate" value={formData.fundRaisingEndDate} onChange={handleInputChange} style={styles.input} />
                    </div>
                </div>
                <div style={styles.twoColumnWrapper}>
                    <div style={styles.formGroup}>
                        <label htmlFor="donationGoal" style={styles.label}>Donation Goal</label>
                        <input type="number" name="donationGoal" value={formData.donationGoal} onChange={handleInputChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="file" style={styles.label}>Upload Image</label>
                        <input type="file" name="file" onChange={handleFileChange} style={styles.fileInput} />
                        {file && <div style={styles.fileName}>Selected file: {file.name}</div>}
                    </div>
                </div>
                <button type="submit" style={styles.submitButton}>Create Campaign</button>
            </form>
        </div>
    );
};

// Updated styles for two-column layout
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
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    twoColumnWrapper: {
        display: 'flex',
        gap: '10px',
    },
    formGroup: {
        flex: '1',
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
