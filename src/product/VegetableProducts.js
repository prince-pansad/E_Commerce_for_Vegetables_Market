import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../pages/login'; // Import the AuthContext for authentication
import './VegetableProducts.css';

function VegetableProducts() {
  const [vegetableProducts, setVegetableProducts] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const addToCart = (productId) => {
    try {
      if (!authContext.token) {
        setShowLoginModal(true); // Show the login modal
        return;
      }

      fetch('http://localhost:3001/api/cart/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authContext.token}`, // Send the authentication token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1, // Adjust quantity as needed
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`Failed to add item to cart. Status: ${response.status}`);
            return response.text(); // Return the error message as text
          }
          return response.json(); // Parse the response as JSON
        })
        .then((data) => {
          if (data.error) {
            setError(data.error); // Set the error message from the response
          } else {
            setMessage('Item added to cart successfully'); // Set a success message if applicable
          }
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
          setError('Failed to add the item to the cart. Please try again.');
        });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add the item to the cart. Please try again.');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products/fetch');

        if (!response.ok) {
          console.error(`Failed to fetch products. Status: ${response.status}`);
          setError('Failed to fetch products. Please try again.');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setVegetableProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="vegetable-products">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="product-list">
          {vegetableProducts.map((product) => (
            <div className="product-item" key={product._id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <p className="product-description">{product.description}</p>
                <button
                  onClick={() => addToCart(product._id)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {message && <p className="success-message">{message}</p>}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal">
          <h3>Login Required</h3>
          <p>Please log in to add items to your cart.</p>
          <button onClick={() => setShowLoginModal(false)}>Close Modal</button>
          {/* You can include your login form or link to the login page here */}
        </div>
      )}
    </div>
  );
}

export default VegetableProducts;
