'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export default function SignUp() {
  const validationSchema = Yup.object({
    name: Yup.string().required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    alert('Registration successful!')
  }

  return (
    <div className="h-screen bg-gradient-to-r from-[#fcf8ef] via-[#fbe6d3] to-[#fcf8ef] flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl border-2 border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#d76d77]">Join the Nail Revolution!</h2>
          <p className="text-gray-600 mt-2">Create an account to book your next nail appointment</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#6a5d5e]">Full Name</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d76d77]"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#6a5d5e]">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d76d77]"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#6a5d5e]">Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d76d77]"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#6a5d5e]">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d76d77]"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-[#6a5d5e]">
              <input type="checkbox" className="mr-2" /> I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#d76d77] text-white p-3 rounded-md hover:bg-[#b65a5b] focus:outline-none focus:ring-2 focus:ring-[#d76d77]"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-[#d76d77] hover:text-[#b65a5b]">Log in</a>
          </p>
        </form>
      </div>
    </div>
  )
}
