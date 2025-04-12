/* 
 
// React Frontend (Login.js or Login.jsx)
import React, { useState } from 'react';

const Login = () => {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      const loginMessage = `User signatured @ ${new Date().toISOString()}`;

      const signedMessage = await window.ethereum.request({
        method: 'personal_sign',
        params: [loginMessage, userAddress]
      });

      setAddress(userAddress);
      setMessage(loginMessage);
      setSignature(signedMessage);

      const response = await fetch("http://localhost:5000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address: userAddress, message: loginMessage, signature: signedMessage })
      });

      const data = await response.json();
      if (data.success) {
        setStatus("✅ Logged in successfully");
      } else {
        setStatus("❌ Login failed: Invalid signature");
      }

    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST"
      });
      setAddress("");
      setMessage("");
      setSignature("");
      setStatus("👋 Logged out");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error during logout");
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Login with MetaMask</button>
      {address && (
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded ml-2">Logout</button>
      )}
      <div className="mt-4">
        <p><strong>Status:</strong> {status}</p>
        {address && <p><strong>Address:</strong> {address}</p>}
        {message && <p><strong>Message:</strong> {message}</p>}
        {signature && <p><strong>Signature:</strong> {signature}</p>}
      </div>
    </div>
  );
};

export default Login;
 */
 
 

 
// React Frontend (Login.js or Login.jsx)
import React, { useState } from 'react';

const Login = () => {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      const loginMessage = `User signatured @ ${new Date().toISOString()}`;

      const signedMessage = await window.ethereum.request({
        method: 'personal_sign',
        params: [loginMessage, userAddress]
      });

      setAddress(userAddress);
      setMessage(loginMessage);
      setSignature(signedMessage);

      const response = await fetch("https://login-api-1092941157994.us-central1.run.app/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address: userAddress, message: loginMessage, signature: signedMessage })
      });

      const data = await response.json();
      if (data.success) {
        setStatus("✅ Logged in successfully");
      } else {
        setStatus("❌ Login failed: Invalid signature");
      }

    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("https://login-api-1092941157994.us-central1.run.app/api/logout", {
        method: "POST"
      });
      setAddress("");
      setMessage("");
      setSignature("");
      setStatus("👋 Logged out");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error during logout");
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Login with MetaMask</button>
      {address && (
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded ml-2">Logout</button>
      )}
      <div className="mt-4">
        <p><strong>Status:</strong> {status}</p>
        {address && <p><strong>Address:</strong> {address}</p>}
        {message && <p><strong>Message:</strong> {message}</p>}
        {signature && <p><strong>Signature:</strong> {signature}</p>}
      </div>
    </div>
  );
};

export default Login;
