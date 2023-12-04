import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart');

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

  return (
    <div>
      <h1>Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.menuItem.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

