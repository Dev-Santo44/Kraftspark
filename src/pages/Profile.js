import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../services/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import defaultAvatar from '../assets/images/avatar-default.png';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import SettingsIcon from '@mui/icons-material/Settings';
import './../assets/styles/pages/Profile.css';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const navigate = useNavigate();
  const authe = getAuth();

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


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.photoURL) {
          setAvatar(currentUser.photoURL);
        }
        if (currentUser.phoneNumber) {
          setPhoneNumber(currentUser.phoneNumber);
        }

        // Fetch additional user data from Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
          if (data.transactions) setTransactionHistory(data.transactions);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(authe);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setAvatar(reader.result);

        // Save avatar base64 string locally to Firestore
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { avatarBase64: reader.result }, { merge: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="title">Your Profile</h1>
      <div className="profile-card">
        <div className="avatar-section">
          <img src={avatar} alt="avatar" className="avatar-img" />
          <label htmlFor="avatar-upload" className="avatar-edit-btn">
            <SettingsIcon /> Edit Avatar
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="info-section">
          <p><strong>Name:</strong> {user?.displayName || 'Not provided'}</p>
          <p><strong>Email:</strong> {user?.email || 'Not provided'}</p>
          <p><strong>Contact:</strong> {phoneNumber || 'Not provided'}</p>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Log Out
        </button>
      </div>

      <div className="history-section">
        <h2 className="history-title">Transaction History</h2>
        <table className="history-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Order</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.length > 0 ? (
              transactionHistory.map((tx, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tx.order}</td>
                  <td>{tx.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>No orders yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
