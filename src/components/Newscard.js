import React, { useEffect, useState } from 'react';
import NewscardComponet from './NewscardScreen'; // Ensure this is the correct path
import axios from 'axios';

function Newscard() {
  const [newsData, setNewsData] = useState([]); // State to hold news data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  const getAllNewsApiData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/news/getAllNews/:1/:100');
      setNewsData(res.data.data);
      console.log(res.data.data) // Adjust according to your API response structure
      setLoading(false); // Set loading to false after fetching data
    } catch (err) {
      console.error("Error fetching news data:", err);
      setError(err.message); // Set error message
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    getAllNewsApiData();
  }, []);

  if (loading) return <div>Loading...</div>; // Display loading message
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div>
      <h1>News Feed</h1>
      <NewscardComponet newsData={newsData} />
    </div>
  );
}

export default Newscard;
