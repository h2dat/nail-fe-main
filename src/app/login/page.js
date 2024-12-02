'use client'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Steps } from 'primereact/steps'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailForReset, setEmailForReset] = useState('')

  const steps = [
    { label: 'Enter Email' },
    { label: 'Enter OTP' },
    { label: 'Enter New Password' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }
    setError('')
    alert('Logged in successfully!')
  }

  const handleForgotPasswordSubmit = () => {
    if (activeStep === 0 && emailForReset === '') {
      setError('Please enter your email address.')
    } else if (activeStep === 1 && otp === '') {
      setError('Please enter the OTP sent to your email.')
    } else if (activeStep === 2 && (newPassword === '' || confirmPassword === '')) {
      setError('Please enter and confirm your new password.')
    } else if (activeStep === 2 && newPassword !== confirmPassword) {
      setError('Passwords do not match. Please confirm correctly.')
    } else {
      setError('')
      if (activeStep === 2) {
        alert('Password reset successfully!')
        setShowForgotPasswordModal(false)
        setActiveStep(0)
      } else {
        setActiveStep(activeStep + 1)
      }
    }
  }

  return (
    <div className="h-screen bg-gradient-to-r from-pink-100 via-teal-100 to-purple-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border-2 border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-pink-600">Nail Your Look!</h2>
          <p className="text-gray-600 mt-2">Book your next manicure or pedicure appointment with ease</p>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <button
              type="button"
              className="text-sm text-pink-600 hover:text-pink-800"
              onClick={() => setShowForgotPasswordModal(true)}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-3 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Log In
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-pink-600 hover:text-pink-800">Sign up</a>
          </p>
        </form>

      </div>

      <Dialog
        visible={showForgotPasswordModal}
        onHide={() => setShowForgotPasswordModal(false)}
        header="Forgot Password"
        footer={
          <Button
            label={activeStep === 2 ? 'Submit' : 'Next'}
            icon="pi pi-check"
            onClick={handleForgotPasswordSubmit}
            autoFocus
            className="w-full"
          />
        }
        style={{ width: '90vw', maxWidth: '500px' }}
      >
        <div className="p-fluid">
          <Steps model={steps} activeIndex={activeStep} className="mb-4" />
          {activeStep === 0 && (
            <div className="mb-4">
              <label htmlFor="emailForReset" className="block text-sm font-semibold text-gray-700">Enter your email</label>
              <input
                type="email"
                id="emailForReset"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="you@example.com"
              />
            </div>
          )}
          {activeStep === 1 && (
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter OTP"
              />
            </div>
          )}
          {activeStep === 2 && (
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700">Enter New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="New password"
              />
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mt-4">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Confirm new password"
              />
            </div>
          )}
        </div>
      </Dialog>
    </div>
  )
}
