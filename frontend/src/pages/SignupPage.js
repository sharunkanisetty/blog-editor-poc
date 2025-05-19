import React, { useState } from 'react';
import { signupUser } from '../services/api';

export default function SignupPage({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
        setMessage('Please enter email and password');
        return;
      }
      
      try {
        await signupUser({ email, password });
        setMessage('Signup successful!');
        setTimeout(() => {
          setMessage('');
          onBack();
        }, 2000);
      } catch (err) {
        console.error('Signup error:', err);  
        // Try to get server error message if available
        const serverMessage = err.response?.data?.message || err.message || 'Signup failed. Try again.';
        setMessage(serverMessage);
      }
      };
  

  return (
    <div style={styles.container}>
      <button style={styles.back} onClick={onBack}>← Back</button>
      <h2>Signup</h2>
      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleSignup}>Signup</button>
      {message && <p style={{ ...styles.message, color: message.includes('failed') ? 'red' : '#28a745' }}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '40px auto',
    padding: 20,
    fontFamily: 'Arial',
    backgroundColor: '#fff',
    borderRadius: 6,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    width: '100%',
    marginBottom: 10,
    fontSize: '1rem',
  },
  back: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
    color: '#007bff',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};
