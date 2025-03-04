import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  padding: 50px 0;
`;

const Card = styled.div`
  width: 100%;
  max-width: 430px;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
  padding: 40px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 25px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${props => props.error ? 'red' : '#e5e5e5'};
  border-radius: 5px;
  padding: 0 15px;
  margin-bottom: 10px;
  outline: none;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: ${props => props.disabled ? '#cccccc' : '#16a34a'};
  color: ${props => props.disabled ? '#666666' : 'white'};
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  font-size: 14px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

// 1. Forgot Password Page
export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        "https://farmera-eyu3.onrender.com/api/v1/auth/forgotPassword",
        { email }
      );

      localStorage.setItem('resetEmail', email);
      
      navigate("/verify-reset-otp");
    } catch (error) {
      setError(error.response?.data?.error || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <h2>Reset Password</h2>
        <p style={{ textAlign: 'center', color: '#969696', marginBottom: '20px' }}>
          Enter your email to receive a password reset OTP
        </p>
        <Form onSubmit={handleSubmit}>
          <Input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button 
            type="submit" 
            disabled={!email || loading}
          >
            {loading ? 'Sending...' : 'Send Reset OTP'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

// 2. OTP Verification Page
export const VerifyResetOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail');

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        "https://farmera-eyu3.onrender.com/api/v1/auth/verify-reset-otp", 
        { email, otp }
      );

      navigate("/reset-password");
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post(
        "https://farmera-eyu3.onrender.com/api/v1/auth/forgotPassword",
        { email }
      );
      alert("New OTP sent to your email");
    } catch (error) {
      setError("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <h2>Verify OTP</h2>
        <p style={{ textAlign: 'center', color: '#969696', marginBottom: '20px' }}>
          Enter the 6-digit OTP sent to {email}
        </p>
        <Form onSubmit={handleVerify}>
          <Input 
            type="text" 
            placeholder="Enter 6-digit OTP"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            error={!!error}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button 
            type="submit" 
            disabled={otp.length !== 6 || loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </Form>
        <p 
          onClick={handleResendOTP} 
          style={{ 
            textAlign: 'center', 
            color: '#16a34a', 
            cursor: 'pointer', 
            marginTop: '15px' 
          }}
        >
          Resend OTP
        </p>
      </Card>
    </Container>
  );
};

// 3. Reset Password Page
export const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/resetPassword", 
        {
          email,
          otp: localStorage.getItem('resetOTP'),
          newPassword: passwords.newPassword,
          confirmNewPassword: passwords.confirmPassword
        }
      );

      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetOTP');

      alert("Password reset successful");
      navigate("/signin");
    } catch (error) {
      setError(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <h2>Reset Password</h2>
        <p style={{ textAlign: 'center', color: '#969696', marginBottom: '20px' }}>
          Create a new password for your account
        </p>
        <Form onSubmit={handleSubmit}>
          <Input 
            type="password" 
            name="newPassword"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={handleChange}
            error={!!error}
          />
          <Input 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            error={!!error}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button 
            type="submit" 
            disabled={
              !passwords.newPassword || 
              !passwords.confirmPassword || 
              loading
            }
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};