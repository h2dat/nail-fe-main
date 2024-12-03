'use client'
import ForgotPasswordDialog from '@/components/ForgotPasswordDialog';
import LoginForm from '@/components/LoginForm';
import { useState } from 'react';
import './index.css'

export default function Login() {
  const [error, setError] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [emailForReset, setEmailForReset] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLoginSubmit = (email, password) => {
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    alert('Logged in successfully!');
  };

  const handleForgotPasswordSubmit = () => {
    if (activeStep === 0 && emailForReset === '') {
      setError('Please enter your email address.');
    } else if (activeStep === 1 && otp === '') {
      setError('Please enter the OTP sent to your email.');
    } else if (activeStep === 2 && (newPassword === '' || confirmPassword === '')) {
      setError('Please enter and confirm your new password.');
    } else if (activeStep === 2 && newPassword !== confirmPassword) {
      setError('Passwords do not match. Please confirm correctly.');
    } else {
      setError('');
      if (activeStep === 2) {
        alert('Password reset successfully!');
        setShowForgotPasswordModal(false);
        setActiveStep(0);
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-[#fcf8ef] via-[#fbe6d3] to-[#fcf8ef] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border-2 border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#d76d77]">Nail Your Look!</h2>
          <p className="text-gray-600 mt-2">Book your next manicure or pedicure appointment with ease</p>
        </div>

        <LoginForm onSubmit={handleLoginSubmit} error={error} setShowForgotPasswordModal={setShowForgotPasswordModal}/>

      </div>

      <ForgotPasswordDialog
        visible={showForgotPasswordModal}
        onHide={() => setShowForgotPasswordModal(false)}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        error={error}
        emailForReset={emailForReset}
        setEmailForReset={setEmailForReset}
        otp={otp}
        setOtp={setOtp}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmit={handleForgotPasswordSubmit}
      />
    </div>
  );
}
