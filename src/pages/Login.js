import React, { useState } from 'react'
import '../assets/styles/pages/Login.css'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, googleProvider } from "../services/firebase/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // email login
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    // google login 
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="flex flex-col items-center mt-10">
            <div className="login-container">
                <h1 className="text-2xl mb-4">Sign In</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded p-2"
                    />
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign In</button>
                    <p>Register here if don't have account <button onClick={handleSignUp} type="submit" className="bg-green-500 text-white p-2 rounded">Sign Up</button></p>
                </form>

                <button
                    onClick={handleGoogleSignIn}
                    className="bg-red-500 text-white p-2 rounded mt-4"
                >
                    LogIn with Google

                </button>
                <p>Sign In with Google here...</p>

            </div>
        </div>
    )
}

export default Login
