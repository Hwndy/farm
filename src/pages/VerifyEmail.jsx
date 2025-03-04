import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('user');

  const handleVerify = async () => {  
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await axios.post('https://farmera-eyu3.onrender.com/api/v1/auth/verify-otp', { 
        email, 
        otp 
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('https://farmera-eyu3.onrender.com/api/v1/auth/resend-otp', { email });
      setMessage('OTP resent successfully. Check your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <h1>Verify Your Email</h1>
        <p>Enter the 6-digit OTP sent to your email</p>
        <Input 
          type="text" 
          maxLength="6" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter OTP" 
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {message && <SuccessMessage>{message}</SuccessMessage>}
        <VerifyDiv>
          <Button onClick={handleVerify} disabled={loading || otp.length !== 6}>
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
          <ResendLink onClick={handleResendOtp} disabled={loading}>Resend OTP</ResendLink>
        </VerifyDiv>
      </Card>
    </Container>
  );
};

export default VerifyEmail;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  font-size: 1.2rem;
`;

const Button = styled.button`
  background-color: #16a34a;
  color: white;
  padding: 10px 20px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const VerifyDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

const ResendLink = styled.button`
  margin-top: 10px;
  border: none;
  background: none;
  color: #16a34a;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 0.9rem;
`;
