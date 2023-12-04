import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/menuItems');
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch menu items - ${response.statusText}. ${errorMessage}`);
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError('Oops! Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);
  
  const addToCart = async (menuItemId) => {
    try {
      const response = await fetch('http://localhost:8000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ menuItemId }),
      });
  
      if (response.ok) {
        console.log('Item added to cart successfully!');
      } else {
        console.error('Failed to add item to cart:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };  

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

  return (
    <div className='home'>
      <div className='details'>
        {menuItems.map((item) => (
          <div className='item' key={item.id}>
            <div className='item-img'>
              {item.picture && <img src={item.picture} alt={item.name} />}
            </div>
            <div className='item-text'>
              <h2>{item.name}</h2>
              <h3>{item.price}</h3>
              <button onClick={() => addToCart(item.id)}>Add to Cart</button>
              <Link to={`/detail/${item.id}`}>
                <button>Detail</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
