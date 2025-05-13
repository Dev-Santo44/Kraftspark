import React, { useEffect, useState } from 'react';
import { deleteDoc } from "firebase/firestore";
import { db } from "./../services/firebase/firebase";
import { doc, getDoc } from 'firebase/firestore';
import './../assets/styles/pages/Profile.css';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import axios from 'axios';

function Orders() {
    const [transactionHistory, setTransactionHistory] = useState([]);
    
    useEffect(() => {
      const fetchUserOrders = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) return;
    
        try {
          const db = getFirestore();
          const userDocRef = doc(db, "userOrders", user.uid);
          const userDocSnap = await getDoc(userDocRef);
    
          if (userDocSnap.exists()) {
            const orders = userDocSnap.data().orders || [];
    
            // Flatten and map orders
            const formatted = orders.flatMap((order) =>
              order.items.map((item) => ({
                order: item.name,
                price: item.price.toFixed(2),
              }))
            );
    
            setTransactionHistory(formatted);
          } else {
            setTransactionHistory([]);
          }
        } catch (error) {
          console.error("Error fetching Firestore orders:", error);
        }
      };
    
      fetchUserOrders();
    }, []);

    const removeOrder = async (orderId) => {
  try {
    // Firestore deletion
    await deleteDoc(doc(db, "userOrders", orderId));

    // MongoDB deletion (via backend API)
    await axios.delete(`http://localhost:5000/api/orders/${orderId}`);

    alert("Order removed successfully");
  } catch (error) {
    console.error("Error removing order:", error);
    alert("Failed to remove order");
  }
};

    return (
        <div>
            <h1>Orders Here:</h1>
            <div className="history-section">
  <h2 className="history-title">Transaction History</h2>
  <table className="history-table">
    <thead>
      <tr>
        <th>Sr. No</th>
        <th>Order</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {transactionHistory.length > 0 ? (
        transactionHistory.map((tx, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{tx.order}</td>
            <td>{tx.price}</td>
            <td>
              <button 
                onClick={() => removeOrder(tx.id)} 
                className="remove-order-btn"
              >
                Remove
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" style={{ textAlign: 'center' }}>
            No orders yet
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
        </div>
    )
}

export default Orders
