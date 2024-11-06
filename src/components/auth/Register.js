import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


import './auth.css';

const Register = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      toast.success('User Register successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
       setTimeout(() => {
        navigate('/home'); 
      }, 3000);  
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
        className='formInput'

          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
        className='formInput'

          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
        className='loginButton' 
        type="submit">Register</button>
      </form>
      <ToastContainer />

    </div>
  );
};

export default Register;
