import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cart');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      setCartItems(data.filter((item) => item.quantity > 0)); // Filter items with non-zero quantity
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await Promise.all(
        cartItems.map(async (item) => {
          await fetch(`http://localhost:8000/api/cart/${item.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: 0 }),
          });
        })
      );

      fetchCartItems();
    } catch (error) {
      console.error('Failed to clear the cart in the database:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleConfirmOrder = () => {
    handleClearCart();
    alert('Order placed successfully.');

    navigate('/');
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <ul className="checkoutItems">
        {cartItems.map((item) => (
          <li key={item.id}>
            <span className="item-name">{item.menuItem.name || 'Unknown Item'}</span> - Amount: {item.quantity}
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <button className="confirm-button" onClick={handleConfirmOrder}>
          Confirm
        </button>
      )}
    </div>
  );
};

export default Checkout;
