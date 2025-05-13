import React, { useState } from "react";
import "./../assets/styles/pages/Cart.css";
import ml1 from "./../assets/images/mlbb.png";
import { useCart } from "../hooks/useCart";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, arrayUnion } from "firebase/firestore";
import axios from "axios";

const TotalExpenseTable = ({ total }) => {
  return (
    <div className="expense-table shadow-lg p-4 bg-white rounded-xl mt-10 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">Total Summary</h3>
      <table className="w-full text-left border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Subtotal</td>
            <td className="py-2 px-4 border-b">${total.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Tax (5%)</td>
            <td className="py-2 px-4 border-b">${(total * 0.05).toFixed(2)}</td>
          </tr>
          <tr className="font-bold">
            <td className="py-2 px-4">Total</td>
            <td className="py-2 px-4">${(total * 1.05).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function Cart() {
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const { cart: cartItems, removeFromCart } = useCart();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Validated UserID:", userId, "Server:", serverId);
  };


const placeOrder = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return alert("Please log in to place an order.");
  if (cartItems.length === 0) return alert("Your cart is empty.");

  try {
    const cleanedCartItems = cartItems.map(item => ({
      name: item.name || "Unnamed Product",
      price: item.price ?? 0,
    }));

    // Save to backend DB
    await axios.post('http://localhost:5000/api/orders', {
      userId: user.uid,
      items: cleanedCartItems,
    });

    // Save to Firestore
    const db = getFirestore();
    await setDoc(
      doc(db, "userOrders", user.uid),
      {
        orders: arrayUnion({
          timestamp: Date.now(),
          items: cleanedCartItems,
        }),
      },
      { merge: true }
    );

    alert("Order placed successfully!");
  } catch (err) {
    console.error(err);
    alert("Error placing order.");
  }
};




  return (
    <div className="Cart-page bg-gradient-to-br from-purple-200 to-blue-100 min-h-screen p-6">
      <div className="validator bg-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <div className="steps flex items-center gap-6 mb-6">
          <img
            className="game-pfp w-20 h-20 rounded-full border-4 border-purple-400"
            src={ml1}
            alt="logo"
          />
          <div>
            <h3 className="text-lg font-bold text-purple-700 mb-2">
              EASY STEPS TO FOLLOW
            </h3>
            <ol className="list-decimal list-inside text-sm text-gray-600">
              <li>Enter and validate your userid & server.</li>
              <li>Select your desired topup package.</li>
              <li>Check your balance after successful payment.</li>
            </ol>
          </div>
        </div>

        <div className="game-credentioal bg-gray-50 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Validate Your Game ID
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="number"
                className="gameId w-full p-3 rounded-md border border-gray-300"
                placeholder="Enter Your ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="gameId w-full p-3 rounded-md border border-gray-300"
                placeholder="Enter Server"
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Validate"
                className="cursor-pointer bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition w-full"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="Cart-Items mt-12 max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold mb-6 text-purple-700">Your Cart</h3>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">No items in cart yet.</div>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-purple-700">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <TotalExpenseTable total={totalAmount} />

      <div className="checkout-button-wrapper flex justify-center mt-8">
        <button
          onClick={placeOrder}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
