import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('user');
  
  const inputRefs = useRef([]);
  
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpValues(digits);
      
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = async () => {
    const otp = otpValues.join('');
    if (otp.length !== 6) return;
    
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
        
        <OtpContainer onPaste={handlePaste}>
          {otpValues.map((digit, index) => (
            <OtpInput
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={el => inputRefs.current[index] = el}
              autoFocus={index === 0}
            />
          ))}
        </OtpContainer>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {message && <SuccessMessage>{message}</SuccessMessage>}
        
        <VerifyDiv>
          <Button 
            onClick={handleVerify} 
            disabled={loading || otpValues.join('').length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
          <ResendLink onClick={handleResendOtp} disabled={loading}>
            Resend OTP
          </ResendLink>
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
  width: 100%;
  max-width: 400px;
`;

const OtpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 24px 0 16px;
`;

const OtpInput = styled.input`
  width: 45px;
  height: 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  
  &:focus {
    border-color: #16a34a;
    outline: none;
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
  }
  
  /* Hide spinner for number inputs */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
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
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #15803d;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const VerifyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ResendLink = styled.button`
  border: none;
  background: none;
  color: #16a34a;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.9rem;
  margin: 8px 0;
`;

const SuccessMessage = styled.p`
  color: #16a34a;
  font-size: 0.9rem;
  margin: 8px 0;
`;