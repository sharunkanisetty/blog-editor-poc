import React, { useState } from 'react';
import { loginUser } from '../services/api';

export default function LoginPage({ onBack, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      setMessage('Login successful!');
      setTimeout(() => {
        setMessage('');
        onLoginSuccess(); // call parent handler after login
      }, 2000);
    } catch (err) {
      setMessage('Login failed. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.back} onClick={onBack}>← Back</button>
      <h2>Login</h2>
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
      <button style={styles.button} onClick={handleLogin}>Login</button>
      {message && <p style={message.startsWith('Login successful') ? styles.success : styles.error}>{message}</p>}
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
  success: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
  },
  error: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
};
