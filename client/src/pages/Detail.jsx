import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItemAndReviews = async () => {
      try {
        // Fetch menu item details
        const menuItemResponse = await fetch(`http://localhost:8000/api/menuItems/${id}`);
        if (!menuItemResponse.ok) {
          const errorMessage = await menuItemResponse.text();
          throw new Error(`Failed to fetch menu item - ${menuItemResponse.statusText}. ${errorMessage}`);
        }
        const menuItemData = await menuItemResponse.json();
        setMenuItem(menuItemData);

        // Fetch reviews for the menu item
        const reviewsResponse = await fetch(`http://localhost:8000/api/menuItems/${id}/reviews`);
        if (!reviewsResponse.ok) {
          const errorMessage = await reviewsResponse.text();
          throw new Error(`Failed to fetch reviews - ${reviewsResponse.statusText}. ${errorMessage}`);
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Oops! Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItemAndReviews();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <p>Please try refreshing the page or come back later.</p>
      </div>
    );
  }

  if (!menuItem) {
    return <div>Menu item not found.</div>;
  }

  return (
    <div className='detail'>
      <div className='item'>
        <div className='item-img'>
          {menuItem.picture && <img src={menuItem.picture} alt={menuItem.name} />}
        </div>
        <div className='item-text'>
          <h2>{menuItem.name}</h2>
          <h3>{menuItem.price}</h3>
          <p>{menuItem.description}</p>

          {/* Display reviews */}
          <h4>Reviews:</h4>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>{review.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
