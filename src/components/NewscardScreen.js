import React from 'react';

const NewsItem = ({ item }) => {
  return (
    <div
      className="news-item"
      style={{
        border: '1px solid #ddd',
        borderRadius: '5px',
        maxWidth: '300px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {item.urlToImage && (
        <img
          className="news-item-image"
          src={item.urlToImage}
          alt={item.title || 'News Image'}
          style={{
            height: '150px',
            width: '100%',
            objectFit: 'cover',
          }} // Adjust image size and fit
        />
      )}
      <div className="news-item-content" style={{ padding: '10px 15px' }}>
        <div
          style={{
            backgroundColor: item.category && item.category.category_name ? '#007bff' : '#ccc', // Set color based on category presence
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '3px',
            marginBottom: '10px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {item.category && item.category.category_name
            ? item.category.category_name
            : 'Uncategorized'}
        </div>

        <h3 style={{ fontSize: '1.2em', margin: '0 0 10px 0' }}>
          {item.title || item.content.slice(0, 50)}
        </h3>

        <p style={{ fontSize: '0.9em', color: '#555', marginBottom: '15px' }}>
          {item.content.slice(0, 100)}...
        </p>

        <a
          href={item.url}
          className="news-item-link"
          style={{
            color: '#007bff', // Link color
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.9em',
          }}
        >
          Read more
        </a>
      </div>
    </div>
  );
};


const NewscardComponent = ({ newsData }) => {
  return (
    <div
      className="news-list"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '20px',
        backgroundColor: '#e6f7ff', // Light blue background for entire layout
      }}
    >
      {newsData.map((item) => (
        <div key={item._id} style={{ margin: '10px' }}> {/* Use item.id if it's a unique identifier */}
          <NewsItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default NewscardComponent;
