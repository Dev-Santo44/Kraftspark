import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../assets/styles/pages/AdminPage.css'
const AdminPage = () => {
  const [productData, setProductData] = useState({
    post_title: '',
    price: '',
    imageUrl: '',
  });

  // Fetch all orders
   const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Handle product form change
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products/add', productData);
      alert('Product added successfully!');
      setProductData({ post_title: '', price: '', imageUrl: '' });
    } catch (error) {
      alert('Failed to add product');
      console.error(error);
    }
  };

  return (
    <div className="admin-container">
  <h1 className="admin-title">Admin Panel</h1>
    <section>
    <h2 className="section-title">Add New Product</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="post_title"
          placeholder="Product Title"
          value={productData.post_title}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={productData.imageUrl}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <button type="submit" className="form-button">Add Product</button>
    </form>
  </section>

  <div className="orders-container">
      <h2 className="orders-title">All Orders</h2>
      {orders.length === 0 ? (
        <p className="orders-empty">No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Items</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.post_title} - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  
</div>
  );
};

export default AdminPage;
