import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cart');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCartItems(data.cart);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
        // No automatic redirection here
      } else {
        console.error('Failed to add item to cart:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Update the local state with the new quantity
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="cartItem">
          {cartItems.map((item) => (
            <li key={item.id}>
              <span className="item-name">{item.menuItem.name}</span> - Quantity:{' '}
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="cart-buttons">
            <button className="checkout-button">Checkout</button>
            <Link to="/">
              <button className="return-button">Return to Menu</button>
            </Link>
      </div>
    </div>
  );
};

export default Cart;