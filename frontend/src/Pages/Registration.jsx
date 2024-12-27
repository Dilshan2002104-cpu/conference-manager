import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Registration.css';

const Registration = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        
        const response = await axios.post('http://localhost:5000/api/register/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        console.log('Sign Up Response:', response.data);
        alert('Registration successful!');
        navigate('/'); // Redirect to home page after successful registration

      } else {
        // Sign in logic
        const response = await axios.post('http://localhost:5000/api/login/login', {
          email: formData.email,
          password: formData.password
        });
        
        console.log('Sign In Response:', response.data);
        alert('Sign in successful!');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', formData.email);
        navigate('/'); // Redirect to home page after successful login
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="sign-form">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="username ">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <button type="submit" className="submit-btn">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        
        <p className="toggle-form">
          {isSignUp 
            ? 'Already have an account? ' 
            : 'Don\'t have an account? '}
          <span onClick={toggleForm}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Registration;