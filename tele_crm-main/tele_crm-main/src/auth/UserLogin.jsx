import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// import './UserAuth.css';
import './UserLogin.css';
import api from '../api';
import Navbar from '../components/Navbar';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    employee_id: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
  //   localStorage.removeItem('adminToken');
  //   try {
  //     const response = await api.post('/user/login', formData);
  //     console.log('login user data :', response.data);
  //     localStorage.removeItem('adminToken');
  //     localStorage.removeItem('userToken');
  //     console.log('login user data :',response.data);
      
  //     localStorage.setItem('userToken', response.data.access);
  //     alert('user login success');
  //     navigate('/user/home');
  //   } catch (err) {
  //     console.error(err);
      
  //     setError(err.response?.data?.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await api.post('/user/login', formData);

    console.log('login user data :', response.data);

    // ✅ Store token
    localStorage.setItem('userToken', response.data.access);

    // ✅ Store employee id (VERY IMPORTANT)
    localStorage.setItem('employeeId', formData.employee_id);

    alert('user login success');
    navigate('/user/home');

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    // <>
    // <Navbar />
    // <div className="user-auth-container">
    //   <div className="user-auth-card">
    //     <h2 className="user-auth-title">User Login</h2>
        
    //     {error && <div className="user-auth-error">{error}</div>}
        
    //     <form onSubmit={handleSubmit} className="user-auth-form">
    //       <div className="user-form-group">
    //         <label>User ID</label>
    //         <input
    //           type="text"
    //           name="employee_id"
    //           value={formData.employee_id}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>
          
    //       <div className="user-form-group">
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>
          
    //       <button type="submit" className="user-auth-btn" disabled={loading}>
    //         Login
    //       </button>
          
    //       <div className="user-auth-links">
    //         <Link to="/user/register">New User? Register</Link>
    //         <Link to="/user/forgot-password">Forgot Password?</Link>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    // </>
  <>
  <Navbar />

  <div className="login-page">

    {/* LEFT SIDE */}
    <div className="login-left">

      <img
        src="/Login-amico.png"
        alt="login"
        className="login-image"
      />

      <div className="login-info">
        <h2>Welcome to TeleCRM</h2>
        <p>Manage leads, employees and follow-ups with ease.</p>
      </div>

    </div>


    {/* RIGHT SIDE */}
    <div className="login-right">

      <div className="login-card">

        <h2 className="login-title">Sign in</h2>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
            />
            <label>User ID</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="login-links">
            <Link to="/user/register">Register</Link>
            <Link to="/user/forgot-password">Forgot password?</Link>
          </div>

        </form>

      </div>

    </div>

  </div>
</>
  );
};

export default UserLogin;