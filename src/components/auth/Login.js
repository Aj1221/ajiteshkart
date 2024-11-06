import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


import './auth.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
       toast.success('Login successfully!', {
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
    <div className="login-container">

      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
        className='formInput'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
        className='formInput'

          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='loginButton' type="submit">Login</button>
      </form>
      <div
      className='newLink'
      >
      <Link
      to={'/register'}
        onClick={() => navigate('/register')} 
      >
        New user ? Register now
      </Link>
      </div>

    </div>
  );
};

export default Login;
